import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getBooking } from '@/lib/bookings-storage';
import { trackPaymentSessionCreated, trackApiError } from '@/lib/mixpanel-server';

type PaymentPayload = {
  bookingId: string;
  amount: number;
  customerEmail: string;
  couponCode?: string;
};

// Lazy initialization of Stripe to avoid module-level errors
function getStripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  
  // Trim whitespace and remove quotes that might have been added
  let cleanKey = key.trim();
  
  // Remove surrounding quotes if present
  if ((cleanKey.startsWith('"') && cleanKey.endsWith('"')) || 
      (cleanKey.startsWith("'") && cleanKey.endsWith("'"))) {
    cleanKey = cleanKey.slice(1, -1);
  }
  
  if (!cleanKey.startsWith('sk_')) {
    throw new Error(`STRIPE_SECRET_KEY appears to be invalid (should start with sk_, got: ${cleanKey.substring(0, 10)}...)`);
  }
  
  return new Stripe(cleanKey, {
    apiVersion: '2025-12-15.clover',
  });
}

export async function POST(request: Request) {
  let customerEmail: string | undefined;

  try {
    // Check environment variables
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      console.error('NEXT_PUBLIC_BASE_URL is missing');
      return NextResponse.json(
        { error: 'Payment system configuration error' },
        { status: 500 }
      );
    }

    // Clean the BASE_URL (remove quotes, newlines, whitespace)
    let baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001').trim();

    // Remove surrounding quotes if present
    if ((baseUrl.startsWith('"') && baseUrl.endsWith('"')) ||
        (baseUrl.startsWith("'") && baseUrl.endsWith("'"))) {
      baseUrl = baseUrl.slice(1, -1);
    }

    console.log('Using BASE_URL for success/cancel URLs:', baseUrl);

    // Remove surrounding quotes if present
    if ((baseUrl.startsWith('"') && baseUrl.endsWith('"')) ||
        (baseUrl.startsWith("'") && baseUrl.endsWith("'"))) {
      baseUrl = baseUrl.slice(1, -1);
    }

    // Remove any newline characters
    baseUrl = baseUrl.replace(/[\r\n]+/g, '').trim();

    console.log('Using BASE_URL:', baseUrl);

    const payload: PaymentPayload = await request.json();
    customerEmail = payload.customerEmail;

    if (!payload.bookingId || !payload.amount || !payload.customerEmail) {
      return NextResponse.json(
        { error: 'Missing required payment details' },
        { status: 400 }
      );
    }

    // Verify booking exists and is in draft status
    const booking = await getBooking(payload.bookingId);
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    if (booking.status !== 'draft') {
      return NextResponse.json(
        { error: 'Booking is not eligible for payment' },
        { status: 400 }
      );
    }

    // Initialize Stripe client
    let stripe: Stripe;
    try {
      console.log('Initializing Stripe client...');
      stripe = getStripeClient();
      console.log('Stripe client initialized successfully');
    } catch (stripeError) {
      console.error('Stripe initialization error:', stripeError);
      console.error('Stripe init error message:', stripeError instanceof Error ? stripeError.message : 'Unknown');
      return NextResponse.json(
        {
          error: 'Payment system configuration error',
          details: stripeError instanceof Error ? stripeError.message : 'Unknown'
        },
        { status: 500 }
      );
    }

    // Validate coupon if provided
    let couponId = null;
    if (payload.couponCode) {
      try {
        const coupon = await stripe.coupons.retrieve(payload.couponCode);
        if (!coupon.valid) {
          return NextResponse.json(
            { error: 'Invalid or expired coupon code' },
            { status: 400 }
          );
        }
        couponId = coupon.id;
      } catch (error) {
        console.error('Coupon retrieval error:', error);
        return NextResponse.json(
          { error: 'Invalid coupon code' },
          { status: 400 }
        );
      }
    }

    // Create Stripe checkout session
    const sessionConfig: any = {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Tesla ${booking.carModel} - Security Deposit`,
              description: `${booking.rentalDays} day rental (${formatDate(booking.startDate)} - ${formatDate(booking.endDate)})${couponId ? ' - 100% OFF TEST COUPON APPLIED' : ''}`,
            },
            unit_amount: payload.amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      customer_email: payload.customerEmail,
      mode: 'payment',
      success_url: `${baseUrl}/book/confirmation/${payload.bookingId}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/book/payment/${payload.bookingId}`,
      metadata: {
        bookingId: payload.bookingId,
      },
    };

    // Apply coupon if provided
    if (couponId) {
      sessionConfig.discounts = [{
        coupon: couponId,
      }];
      // Add custom text to show discount
      sessionConfig.custom_text = {
        submit: {
          message: "🎉 FREE TEST - No payment required! Complete checkout to confirm your booking."
        }
      };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    // Track payment session creation
    await trackPaymentSessionCreated({
      bookingId: payload.bookingId,
      sessionId: session.id,
      totalAmount: booking.totalPrice,
      depositAmount: payload.amount,
      userEmail: payload.customerEmail,
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
    });

  } catch (error) {
    console.error('Payment session creation error:', error);
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');

    // Log more details about the error
    if (error && typeof error === 'object') {
      console.error('Error type:', (error as any).type);
      console.error('Error code:', (error as any).code);
      console.error('Error raw:', JSON.stringify((error as any).raw, null, 2));
    }

    // Track API error
    await trackApiError({
      endpoint: '/api/payment/create-session',
      error: error instanceof Error ? error.message : 'Unknown error',
      statusCode: 500,
      userEmail: customerEmail,
    });

    return NextResponse.json(
      {
        error: 'Failed to create payment session',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'TBD';
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  } catch {
    return dateStr;
  }
}
