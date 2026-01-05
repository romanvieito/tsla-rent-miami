// Shared booking storage for demo purposes
// In production, you'd use a proper database like PostgreSQL, MongoDB, etc.

import { randomBytes } from 'crypto';

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

// In-memory storage for demo purposes
// In production, you'd use a database

// Use global object to ensure shared state across API routes in Next.js
declare global {
  var __bookingsStorage: Map<string, Booking> | undefined;
}

if (!global.__bookingsStorage) {
  global.__bookingsStorage = new Map<string, Booking>();
}

export const bookings = global.__bookingsStorage;


// Helper functions for booking management
export function createBooking(bookingData: Omit<Booking, 'bookingId' | 'createdAt' | 'expiresAt'>): Booking {
  const bookingId = 'BK-' + randomBytes(8).toString('hex').toUpperCase();

  const booking: Booking = {
    ...bookingData,
    bookingId,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
  };

  bookings.set(bookingId, booking);
  return booking;
}

export function getBooking(bookingId: string): Booking | undefined {
  const booking = bookings.get(bookingId);

  // Check if booking has expired
  if (booking && booking.status === 'draft' && new Date() > new Date(booking.expiresAt)) {
    bookings.delete(bookingId);
    return undefined;
  }

  return booking;
}

export function updateBooking(bookingId: string, updates: Partial<Booking>): Booking | null {
  const booking = bookings.get(bookingId);
  if (!booking) return null;

  const updatedBooking = { ...booking, ...updates };
  bookings.set(bookingId, updatedBooking);
  return updatedBooking;
}

export function deleteBooking(bookingId: string): boolean {
  return bookings.delete(bookingId);
}

// Clean up expired draft bookings periodically
setInterval(() => {
  const now = new Date();
  for (const [bookingId, booking] of bookings.entries()) {
    if (booking.status === 'draft' && now > new Date(booking.expiresAt)) {
      bookings.delete(bookingId);
    }
  }
}, 5 * 60 * 1000); // Clean up every 5 minutes
