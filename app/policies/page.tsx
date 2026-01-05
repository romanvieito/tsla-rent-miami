import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function PoliciesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="bg-black/20 backdrop-blur-sm">
        <Header />
      </div>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Booking & Rental Policies</h1>
            <p className="text-xl text-gray-600">
              Everything you need to know about booking your Tesla
            </p>
          </div>

          <div className="space-y-8">
            {/* Cancellation & Refund Policy */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cancellation & Refund Policy</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Booking Fee & Cancellation</h3>
                  <div className="bg-blue-50 rounded-xl p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-white">$</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">$50 Booking Fee</p>
                        <p className="text-sm text-gray-600">Required to secure your Tesla reservation</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-white">✅</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Free Cancellation</p>
                        <p className="text-sm text-gray-600">Within 24 hours after booking fee payment - full refund</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-800">
                      <strong>After 24 hours:</strong> Booking fee becomes non-refundable to ensure your vehicle availability.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Rescheduling</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Free rescheduling up to 48 hours before original pickup time</li>
                    <li>• Subject to vehicle availability</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Rental Terms */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Rental Requirements</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Driver Requirements</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Valid driver&apos;s license</li>
                    <li>• Minimum age: 21 years old</li>
                    <li>• Primary driver must be present at pickup</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Vehicle Usage</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Street legal use only</li>
                    <li>• No off-road or racing</li>
                    <li>• Respect local traffic laws</li>
                    <li>• No smoking or pets</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Insurance & Liability</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Personal insurance may apply</li>
                    <li>• Renter responsible for damages</li>
                    <li>• Theft protection included</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Charging & Care</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Return with similar battery level (Tesla Superchargers available)</li>
                    <li>• We love our Teslas, so we&apos;ll take care of them</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Terms</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Schedule</h3>
                  <div className="bg-blue-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium text-gray-900">Booking Fee</span>
                      <span className="font-bold text-blue-600">Due after booking fee payment</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      $50 booking fee to secure your Tesla rental reservation.
                    </p>

                    <div className="border-t border-blue-200 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">Full Rental Payment</span>
                        <span className="font-bold text-blue-600">Due after booking confirmation</span>
                      </div>
                      <p className="text-gray-600">
                        Full rental payment due after booking confirmation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Need Help?</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email Us</p>
                    <a href="mailto:yai@tsla.miami" className="text-blue-600 hover:text-blue-800">
                      yai@tsla.miami
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Call Us</p>
                    <p className="text-gray-600">+1 (786) 817-9906</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Start Booking
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
