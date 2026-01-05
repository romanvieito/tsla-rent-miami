import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { getBooking, updateBooking } from '@/lib/bookings-storage';

// Lazy initialization of Stripe to avoid module-level errors
function getStripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  
  // Trim any whitespace that might cause issues
  const cleanKey = key.trim();
  
  if (!cleanKey.startsWith('sk_')) {
    throw new Error('STRIPE_SECRET_KEY appears to be invalid (should start with sk_)');
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
