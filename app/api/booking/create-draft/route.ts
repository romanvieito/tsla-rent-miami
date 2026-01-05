import { NextResponse } from 'next/server';
import { createBooking, bookings } from '@/lib/bookings-storage';

type BookingPayload = {
  name: string;
  email: string;
  phone: string;
  carModel: string;
  carPricePerDay: number;
  rentalDays: number;
  totalPrice: number;
  location: string;
  address: string;
  startDate: string | null;
  endDate: string | null;
  customCoordinates?: { lat: number; lng: number };
};

export async function POST(request: Request) {
  try {
    const payload: BookingPayload = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'carModel'];
    for (const field of requiredFields) {
      if (!payload[field as keyof BookingPayload]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Fixed deposit amount of $50
    const depositAmount = 50;

    // Create and store booking
    const booking = await createBooking({
      ...payload,
      depositAmount,
      status: 'draft',
    });

    return NextResponse.json({
      success: true,
      bookingId: booking.bookingId,
      depositAmount,
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking draft' },
      { status: 500 }
    );
  }
}
