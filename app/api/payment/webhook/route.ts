import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { getBooking, updateBooking } from '@/lib/bookings-storage';
import { trackWebhookReceived, trackPaymentCompleted, trackNotificationSent, trackApiError } from '@/lib/mixpanel-server';

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
    const body = await request.text();
    const sig = headers().get('stripe-signature');

    let event: Stripe.Event;

    if (!sig) {
      return NextResponse.json(
        { error: 'No Stripe signature found' },
        { status: 400 }
      );
    }

    // Initialize Stripe client
    const stripe = getStripeClient();

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Track webhook received
    trackWebhookReceived({
      eventType: event.type,
      sessionId: event.type === 'checkout.session.completed' ? (event.data.object as Stripe.Checkout.Session).id : undefined,
      bookingId: event.type === 'checkout.session.completed' ? (event.data.object as Stripe.Checkout.Session).metadata?.bookingId : undefined,
      amount: event.type === 'checkout.session.completed' ? ((event.data.object as Stripe.Checkout.Session).amount_total || 0) / 100 : undefined,
      paymentStatus: event.type === 'checkout.session.completed' ? (event.data.object as Stripe.Checkout.Session).payment_status : undefined,
    });

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.metadata?.bookingId) {
          await handleSuccessfulPayment(session.metadata.bookingId, session);
        }
        break;

      case 'payment_intent.payment_failed':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', paymentIntent.id);
        // Handle failed payment
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook processing error:', error);

    // Track webhook error
    trackApiError({
      endpoint: '/api/payment/webhook',
      error: error instanceof Error ? error.message : 'Unknown webhook error',
      statusCode: 500,
    });

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleSuccessfulPayment(bookingId: string, session: Stripe.Checkout.Session) {
  try {
    const booking = await getBooking(bookingId);

    if (!booking) {
      console.error(`Booking ${bookingId} not found`);
      return;
    }

    // Update booking status to confirmed
    const paymentAmount = session.amount_total ? session.amount_total / 100 : booking.depositAmount;
    await updateBooking(bookingId, {
      status: 'confirmed',
      paymentId: session.id,
      paymentAmount,
      confirmedAt: new Date().toISOString(),
    });

    // Track payment completion from webhook
    trackPaymentCompleted({
      bookingId: bookingId,
      sessionId: session.id,
      totalAmount: booking.totalPrice,
      paidAmount: paymentAmount,
      userEmail: booking.email,
      userName: booking.name,
    });

    // Send confirmation notification
    await sendConfirmationNotification(booking);

    console.log(`Booking ${bookingId} confirmed successfully`);

  } catch (error) {
    console.error('Error confirming booking:', error);
  }
}

async function sendConfirmationNotification(booking: any) {
  try {
    const message = [
      '🎉 BOOKING CONFIRMED!',
      '========================',
      `Booking ID: ${booking.bookingId}`,
      `Name: ${booking.name}`,
      `Phone: ${booking.phone}`,
      `Email: ${booking.email}`,
      `Vehicle: ${booking.carModel} ($${booking.carPricePerDay}/day)`,
      `Pickup: ${formatDate(booking.startDate)}`,
      `Return: ${formatDate(booking.endDate)}`,
      `Location: ${booking.location}`,
      `Address: ${booking.address}`,
      `Deposit Paid: $${booking.paymentAmount}`,
      `Total Rental: $${booking.totalPrice}`,
      '',
      'Customer has secured their booking with payment!',
    ].join('\n');

    const ntfyUrl = `https://ntfy.sh/trent-miami?auth=${encodeURIComponent(process.env.NTFY_ACCESS_TOKEN!)}`;

    await fetch(ntfyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: message,
    });

    // Track notification sent
    trackNotificationSent({
      type: 'booking_confirmation_webhook',
      bookingId: booking.bookingId,
      recipient: booking.email,
      subject: 'Booking Confirmed (Webhook)',
    });

  } catch (error) {
    console.error('Failed to send confirmation notification:', error);
  }
}

function formatDate(dateStr: string) {
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
