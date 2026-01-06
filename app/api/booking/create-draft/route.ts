import { NextResponse } from 'next/server';
import { createBooking } from '@/lib/bookings-storage';
import { trackBookingCreated, trackApiError } from '@/lib/mixpanel-server';

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
  let payload: BookingPayload | undefined;
  let userEmail: string | undefined;
  try {
    payload = await request.json();
    userEmail = payload.email;

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

    // Track booking creation
    trackBookingCreated({
      bookingId: booking.bookingId,
      carId: payload.carModel, // Using carModel as identifier
      carName: payload.carModel, // carModel contains the model name
      startDate: payload.startDate || '',
      endDate: payload.endDate || '',
      pickupLocation: payload.location,
      dropoffLocation: payload.location, // Assuming same location for now
      totalPrice: payload.totalPrice,
      depositAmount,
      userEmail: payload.email,
      userName: payload.name,
    });

    return NextResponse.json({
      success: true,
      bookingId: booking.bookingId,
      depositAmount,
    });

  } catch (error) {
    console.error('Booking creation error:', error);

    // Track API error
    trackApiError({
      endpoint: '/api/booking/create-draft',
      error: error instanceof Error ? error.message : 'Unknown error',
      statusCode: 500,
      userEmail,
    });

    return NextResponse.json(
      { error: 'Failed to create booking draft' },
      { status: 500 }
    );
  }
}
