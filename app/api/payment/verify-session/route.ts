import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getBooking, updateBooking } from '@/lib/bookings-storage';
import { trackPaymentVerified, trackPaymentCompleted, trackNotificationSent, trackApiError } from '@/lib/mixpanel-server';

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
  let sessionId: string | undefined;
  let bookingId: string | undefined;
  try {
    const body = await request.json();
    sessionId = body.sessionId;
    bookingId = body.bookingId;

    if (!sessionId || !bookingId) {
      return NextResponse.json(
        { error: 'Missing sessionId or bookingId' },
        { status: 400 }
      );
    }

    // Get the booking
    const booking = await getBooking(bookingId);
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // If already confirmed, return success
    if (booking.status === 'confirmed') {
      return NextResponse.json({
        success: true,
        booking,
      });
    }

    // Verify the payment session with Stripe
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    // Update booking to confirmed
    const paymentAmount = session.amount_total ? session.amount_total / 100 : booking.depositAmount;
    const updatedBooking = await updateBooking(bookingId, {
      status: 'confirmed',
      paymentId: session.id,
      paymentAmount,
      confirmedAt: new Date().toISOString(),
    });

    if (!updatedBooking) {
      return NextResponse.json(
        { error: 'Failed to update booking' },
        { status: 500 }
      );
    }

    // Send confirmation notification
    await sendConfirmationNotification(updatedBooking);

    // Track payment verification and completion
    trackPaymentVerified({
      bookingId: bookingId,
      sessionId: sessionId,
      totalAmount: booking.totalPrice,
      paidAmount: paymentAmount,
      paymentStatus: 'paid',
      userEmail: booking.email,
    });

    trackPaymentCompleted({
      bookingId: bookingId,
      sessionId: sessionId,
      totalAmount: booking.totalPrice,
      paidAmount: paymentAmount,
      userEmail: booking.email,
      userName: booking.name,
    });

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
    });

  } catch (error) {
    console.error('Payment verification error:', error);

    // Track API error
    trackApiError({
      endpoint: '/api/payment/verify-session',
      error: error instanceof Error ? error.message : 'Unknown error',
      statusCode: 500,
    });

    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
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
      type: 'booking_confirmation',
      bookingId: booking.bookingId,
      recipient: booking.email,
      subject: 'Booking Confirmed',
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

