'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import Link from 'next/link';
import { cars } from '@/lib/cars';
import { pickupLocations } from '@/lib/locations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { trackPaymentCompleted } from '@/lib/mixpanel';

type BookingDetails = {
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
  startDate: string;
  endDate: string;
  status: 'confirmed';
  paymentAmount: number;
  confirmedAt: string;
};

export default function ConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = params.bookingId as string;
  const sessionId = searchParams.get('session_id');

  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId || !sessionId) {
      setError('Invalid confirmation link');
      setLoading(false);
      return;
    }

    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/booking/${bookingId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch booking');
        }

        if (data.booking.status !== 'confirmed') {
          throw new Error('Booking is not confirmed');
        }

        setBooking(data.booking);
        trackPaymentCompleted(data.booking.totalPrice, data.booking.paymentAmount);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load booking confirmation');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, sessionId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Confirming your booking...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !booking) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirmation Failed</h2>
            <p className="text-gray-600 mb-6">{error || 'Unable to confirm your booking.'}</p>
            <Link
              href="/"
              className="bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors inline-block"
            >
              Return Home
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const selectedCar = cars.find(car => car.model === booking.carModel) || cars[0];
  const formatDate = (dateStr: string) => format(new Date(dateStr), 'MMM d, h:mm aa');

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />

      {/* Progress Indicator */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-2 text-sm font-medium text-emerald-700">Details</span>
              </div>
              <div className="w-8 h-px bg-emerald-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <span className="ml-2 text-sm font-medium text-emerald-700">Payment</span>
              </div>
              <div className="w-8 h-px bg-emerald-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-2 text-sm font-medium text-emerald-700">Confirmed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto animate-[scaleIn_0.3s_ease-out]">
                <svg
                  className="w-12 h-12 text-emerald-600 animate-[checkmark_0.4s_ease-out_0.2s_both]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                    className="[stroke-dasharray:24] [stroke-dashoffset:24] animate-[dash_0.4s_ease-out_0.3s_forwards]"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 w-24 h-24 rounded-full bg-emerald-400/20 animate-ping" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-2">
              Tesla details coming to you...we'll contact you as soon as possible.
            </p>
            <p className="text-gray-500">Booking ID: <span className="font-mono font-semibold">{booking.bookingId}</span></p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Booking Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Details</h3>

                {/* Car Details */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={selectedCar.image}
                      alt={selectedCar.model}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{selectedCar.model}</h4>
                    <p className="text-sm text-gray-600 mt-1">{selectedCar.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {selectedCar.seats} seats
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <rect x="2" y="7" width="16" height="10" rx="1" />
                          <rect x="18" y="10" width="2" height="4" rx="0.5" />
                          <path d="M10.5 9L8 12h4l-2.5 3" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
                        </svg>
                        {selectedCar.range}mi range
                      </span>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Rental Period</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(booking.startDate)} → {formatDate(booking.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium text-gray-900">{booking.rentalDays} days</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Pickup Location</span>
                    <span className="font-medium text-gray-900 text-right max-w-[200px] truncate">
                      {booking.location === 'Custom Pin'
                        ? booking.address || 'Custom location'
                        : pickupLocations.find(loc => loc.value === booking.location)?.value || booking.location}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Daily Rate</span>
                    <span className="font-medium text-gray-900">${booking.carPricePerDay}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Total Rental Cost</span>
                    <span className="font-bold text-lg text-gray-900">${booking.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Booking Fee Paid</span>
                    <span className="font-semibold text-emerald-600">${booking.paymentAmount}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-gray-100">
                    <span className="text-gray-600">Rental Amount</span>
                    <span className="font-semibold text-gray-900">${booking.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">🎉 You're All Set!</h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">📧</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      <strong>Check your email</strong> or phone for pickup details and next steps
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">🚗</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      <strong>Bring ID</strong> at pickup
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">⚡</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      <strong>Enjoy your Tesla!</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Need Help?</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email Support</p>
                      <a href="mailto:yai@tsla.miami" className="text-blue-600 hover:text-blue-800 text-sm">
                        yai@tsla.miami
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                      <div>
                        <p className="font-medium text-gray-900">Call Us</p>
                        <a
                          href="tel:+17868179906"
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          +1 (786) 817-9906
                        </a>
                      </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    <strong>Cancellation Policy:</strong> Free cancellation up to 24 hours before pickup.
                    Booking fee is non-refundable after 24 hours.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/"
                  className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors text-center"
                >
                  Book Another Tesla
                </Link>
                <button
                  onClick={() => window.print()}
                  className="px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Print Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
