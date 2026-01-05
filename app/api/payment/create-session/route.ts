import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getBooking } from '@/lib/bookings-storage';

type PaymentPayload = {
  bookingId: string;
  amount: number;
  customerEmail: string;
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
  try {
    // Check environment variables
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      console.error('NEXT_PUBLIC_BASE_URL is missing');
      return NextResponse.json(
        { error: 'Payment system configuration error' },
        { status: 500 }
      );
    }

    const payload: PaymentPayload = await request.json();

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
      stripe = getStripeClient();
    } catch (stripeError) {
      console.error('Stripe initialization error:', stripeError);
      return NextResponse.json(
        { error: 'Payment system configuration error' },
        { status: 500 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Tesla ${booking.carModel} - Security Deposit`,
              description: `${booking.rentalDays} day rental (${formatDate(booking.startDate)} - ${formatDate(booking.endDate)})`,
            },
            unit_amount: payload.amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      customer_email: payload.customerEmail,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/book/confirmation/${payload.bookingId}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/book/payment/${payload.bookingId}`,
      metadata: {
        bookingId: payload.bookingId,
      },
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
    });

  } catch (error) {
    console.error('Payment session creation error:', error);
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to create payment session' },
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
