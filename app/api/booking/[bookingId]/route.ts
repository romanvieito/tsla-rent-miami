import { NextResponse } from 'next/server';
import { getBooking } from '@/lib/bookings-storage';

export async function GET(
  request: Request,
  { params }: { params: { bookingId: string } }
) {
  try {
    const bookingId = params.bookingId;

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }

    const booking = await getBooking(bookingId);

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      booking,
    });

  } catch (error) {
    console.error('Booking retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve booking' },
      { status: 500 }
    );
  }
}
