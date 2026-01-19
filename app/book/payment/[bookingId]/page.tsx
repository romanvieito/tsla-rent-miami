'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import Link from 'next/link';
import { cars } from '@/lib/cars';
import { pickupLocations } from '@/lib/locations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { trackPaymentInitiated, trackPaymentCompleted, trackEvent } from '@/lib/mixpanel';

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
  customCoordinates?: { lat: number; lng: number };
  status: 'draft' | 'confirmed' | 'cancelled';
};

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.bookingId as string;

  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [paymentStarted, setPaymentStarted] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) return;

    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/booking/${bookingId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch booking');
        }

        setBooking(data.booking);
        trackPaymentInitiated(data.booking.totalPrice, data.booking.depositAmount);

        // Track payment page view
        trackEvent('Payment Page Viewed', {
          booking_id: data.booking.bookingId,
          car_model: data.booking.carModel,
          total_amount: data.booking.totalPrice,
          deposit_amount: data.booking.depositAmount,
          currency: 'USD'
        });

        // Track payment flow step reached
        trackEvent('Payment Flow Step', {
          step: 'payment_page_loaded',
          booking_id: data.booking.bookingId,
          car_model: data.booking.carModel,
          total_amount: data.booking.totalPrice,
          deposit_amount: data.booking.depositAmount
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load booking');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  // Track payment abandonment when user leaves page
  useEffect(() => {
    if (!booking || loading) return;

    const handleBeforeUnload = () => {
      if (!paymentStarted) {
        trackEvent('Payment Abandoned', {
          booking_id: booking.bookingId,
          car_model: booking.carModel,
          total_amount: booking.totalPrice,
          deposit_amount: booking.depositAmount,
          page: 'payment',
          abandonment_stage: 'payment_page'
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [booking, loading, paymentStarted]);

  const handlePayment = async () => {
    if (!booking) return;

    setPaymentStarted(true);
    setProcessing(true);

    // Track payment button click
    trackEvent('Payment Button Clicked', {
      booking_id: booking.bookingId,
      car_model: booking.carModel,
      total_amount: booking.totalPrice,
      deposit_amount: booking.depositAmount,
      currency: 'USD'
    });

    try {
      const response = await fetch('/api/payment/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: booking.bookingId,
          amount: booking.depositAmount,
          customerEmail: booking.email,
          couponCode: couponCode.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment session');
      }

      trackEvent('Stripe Checkout Redirected', {
        booking_id: booking.bookingId,
        car_model: booking.carModel,
        total_amount: booking.totalPrice,
        deposit_amount: booking.depositAmount,
        currency: 'USD'
      });

      // Redirect to Stripe Checkout
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
      setProcessing(false);
    }
  };

  const handleBack = () => {
    if (booking) {
      trackEvent('Payment Back Clicked', {
        booking_id: booking.bookingId,
        car_model: booking.carModel,
        total_amount: booking.totalPrice,
        deposit_amount: booking.depositAmount,
        currency: 'USD'
      });
    }

    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
      return;
    }

    router.push('/#book-form');
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* <div className="bg-black/20 backdrop-blur-sm">
          <Header />
        </div> */}
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your booking...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !booking) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="bg-black/20 backdrop-blur-sm">
          <Header />
        </div>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Not Found</h2>
            <p className="text-gray-600 mb-6">{error || 'Unable to load your booking details.'}</p>
            <button
              onClick={() => router.push('/')}
              className="bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              Start Over
            </button>
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
      {/* <div className="bg-black/20 backdrop-blur-sm">
        <Header />
      </div> */}

      {/* Progress Indicator */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleBack}
              aria-label="Back to details"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-2 text-sm font-medium text-emerald-700">Details</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <span className="ml-2 text-sm font-medium text-blue-700">Payment</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-500">Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Secure Your Booking</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pay a ${booking.depositAmount} booking fee to secure your Tesla rental reservation.
              <span className="block text-sm text-gray-500 mt-2">
                Flexible cancellation
              </span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Booking Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h3>

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

              {/* Customer Details */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Customer Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name</span>
                    <span className="font-medium text-gray-900">{booking.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email</span>
                    <span className="font-medium text-gray-900">{booking.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone</span>
                    <span className="font-medium text-gray-900">{booking.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h3>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-semibold text-gray-900">Booking Fee</span>
                    <span className="text-2xl font-bold text-blue-600">${booking.depositAmount}</span>
                  </div>
                  <p className="text-sm text-gray-600">Secures your reservation with flexible cancellation.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Flexible Cancellation</p>
                      <p className="text-sm text-gray-600">Free cancellation within 24 hours after booking fee payment</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Powered by Stripe</p>
                      <p className="text-sm text-gray-600">Secure checkout</p>
                    </div>
                  </div>
                </div>

                {/* Coupon Code Input */}
                <div className="mt-6">
                  <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                    Coupon Code (Optional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value.toUpperCase());
                        setCouponError(null);
                      }}
                      placeholder="Enter coupon code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={processing}
                    />
                  </div>
                  {couponError && (
                    <p className="text-red-600 text-sm mt-1">{couponError}</p>
                  )}
                  {couponCode && !couponError && (
                    <p className="text-green-600 text-sm mt-1">Coupon code will be applied at checkout</p>
                  )}
                </div>

                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {processing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    `Pay $${booking.depositAmount} Booking Fee`
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-2">
                  By proceeding, you agree to our{' '}
                  <Link
                    href="/policies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                    onClick={() => {
                      trackEvent('Cancellation Policy Viewed', {
                        booking_id: booking.bookingId,
                        car_model: booking.carModel,
                        from_page: 'payment'
                      });
                    }}
                  >
                    cancellation policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
