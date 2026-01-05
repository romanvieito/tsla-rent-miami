// Shared booking storage using PostgreSQL database
// Production-ready database storage for bookings

import { randomBytes } from 'crypto';
import { prisma } from './prisma';

export interface Booking {
  bookingId: string;
  name: string;
  email: string;
  phone: string;
  carModel: string;
  carPricePerDay: number;
  rentalDays: number;
  totalPrice: number;
  depositAmount: number;
  location: string;
  address: string;
  startDate: string | null;
  endDate: string | null;
  customCoordinates?: { lat: number; lng: number };
  status: 'draft' | 'confirmed' | 'cancelled';
  createdAt: string;
  expiresAt: string;
  paymentId?: string;
  paymentAmount?: number;
  confirmedAt?: string;
}

// Convert database booking to our interface
function dbBookingToBooking(dbBooking: any): Booking {
  return {
    bookingId: dbBooking.bookingId,
    name: dbBooking.name,
    email: dbBooking.email,
    phone: dbBooking.phone,
    carModel: dbBooking.carModel,
    carPricePerDay: dbBooking.carPricePerDay,
    rentalDays: dbBooking.rentalDays,
    totalPrice: dbBooking.totalPrice,
    depositAmount: dbBooking.depositAmount,
    location: dbBooking.location,
    address: dbBooking.address,
    startDate: dbBooking.startDate?.toISOString() || null,
    endDate: dbBooking.endDate?.toISOString() || null,
    customCoordinates: dbBooking.customCoordinates as { lat: number; lng: number } | undefined,
    status: dbBooking.status,
    createdAt: dbBooking.createdAt.toISOString(),
    expiresAt: dbBooking.expiresAt.toISOString(),
    paymentId: dbBooking.paymentId || undefined,
    paymentAmount: dbBooking.paymentAmount || undefined,
    confirmedAt: dbBooking.confirmedAt?.toISOString() || undefined,
  };
}

// Convert our interface to database format
function bookingToDbBooking(booking: Omit<Booking, 'createdAt'>): any {
  return {
    bookingId: booking.bookingId,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    carModel: booking.carModel,
    carPricePerDay: booking.carPricePerDay,
    rentalDays: booking.rentalDays,
    totalPrice: booking.totalPrice,
    depositAmount: booking.depositAmount,
    location: booking.location,
    address: booking.address,
    startDate: booking.startDate ? new Date(booking.startDate) : null,
    endDate: booking.endDate ? new Date(booking.endDate) : null,
    customCoordinates: booking.customCoordinates,
    status: booking.status,
    expiresAt: new Date(booking.expiresAt),
    paymentId: booking.paymentId,
    paymentAmount: booking.paymentAmount,
    confirmedAt: booking.confirmedAt ? new Date(booking.confirmedAt) : null,
  };
}


// Helper functions for booking management
export async function createBooking(bookingData: Omit<Booking, 'bookingId' | 'createdAt' | 'expiresAt'>): Promise<Booking> {
  const bookingId = 'BK-' + randomBytes(8).toString('hex').toUpperCase();

  const dbBooking = await prisma.booking.create({
    data: {
      bookingId,
      ...bookingToDbBooking({
        ...bookingData,
        bookingId,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
      }),
    },
  });

  return dbBookingToBooking(dbBooking);
}

export async function getBooking(bookingId: string): Promise<Booking | undefined> {
  const dbBooking = await prisma.booking.findUnique({
    where: { bookingId },
  });

  if (!dbBooking) return undefined;

  const booking = dbBookingToBooking(dbBooking);

  // Check if booking has expired
  if (booking.status === 'draft' && new Date() > new Date(booking.expiresAt)) {
    await prisma.booking.delete({
      where: { bookingId },
    });
    return undefined;
  }

  return booking;
}

export async function updateBooking(bookingId: string, updates: Partial<Booking>): Promise<Booking | null> {
  try {
    // First check if booking exists and hasn't expired
    const existingBooking = await getBooking(bookingId);
    if (!existingBooking) return null;

    const updateData: any = {};
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.email !== undefined) updateData.email = updates.email;
    if (updates.phone !== undefined) updateData.phone = updates.phone;
    if (updates.carModel !== undefined) updateData.carModel = updates.carModel;
    if (updates.carPricePerDay !== undefined) updateData.carPricePerDay = updates.carPricePerDay;
    if (updates.rentalDays !== undefined) updateData.rentalDays = updates.rentalDays;
    if (updates.totalPrice !== undefined) updateData.totalPrice = updates.totalPrice;
    if (updates.depositAmount !== undefined) updateData.depositAmount = updates.depositAmount;
    if (updates.location !== undefined) updateData.location = updates.location;
    if (updates.address !== undefined) updateData.address = updates.address;
    if (updates.startDate !== undefined) updateData.startDate = updates.startDate ? new Date(updates.startDate) : null;
    if (updates.endDate !== undefined) updateData.endDate = updates.endDate ? new Date(updates.endDate) : null;
    if (updates.customCoordinates !== undefined) updateData.customCoordinates = updates.customCoordinates;
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.expiresAt !== undefined) updateData.expiresAt = new Date(updates.expiresAt);
    if (updates.paymentId !== undefined) updateData.paymentId = updates.paymentId;
    if (updates.paymentAmount !== undefined) updateData.paymentAmount = updates.paymentAmount;
    if (updates.confirmedAt !== undefined) updateData.confirmedAt = updates.confirmedAt ? new Date(updates.confirmedAt) : null;

    const dbBooking = await prisma.booking.update({
      where: { bookingId },
      data: updateData,
    });

    return dbBookingToBooking(dbBooking);
  } catch (error) {
    console.error('Error updating booking:', error);
    return null;
  }
}

export async function deleteBooking(bookingId: string): Promise<boolean> {
  try {
    await prisma.booking.delete({
      where: { bookingId },
    });
    return true;
  } catch (error) {
    console.error('Error deleting booking:', error);
    return false;
  }
}

// Clean up expired draft bookings periodically
setInterval(async () => {
  try {
    const now = new Date();
    const result = await prisma.booking.deleteMany({
      where: {
        status: 'draft',
        expiresAt: {
          lt: now,
        },
      },
    });

    if (result.count > 0) {
      console.log(`Cleaned up ${result.count} expired draft bookings`);
    }
  } catch (error) {
    console.error('Error during booking cleanup:', error);
  }
}, 5 * 60 * 1000); // Clean up every 5 minutes
