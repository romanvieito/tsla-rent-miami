'use client';

import { reviews } from '@/lib/reviews';
import Image from 'next/image';
import { useState } from 'react';

// Star rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  TRent.
                </h1>
            </div>

            {/* Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Menu */}
          {mobileMenuOpen && (
            <nav className="mt-4 pb-4 space-y-3 animate-in slide-in-from-top">
              <a href="/" className="block py-2 text-gray-600 hover:text-gray-900 font-medium">Home</a>
              <a href="/reviews" className="block py-2 text-gray-600 hover:text-gray-900 font-medium">Reviews</a>
              <a href="/about" className="block py-2 text-gray-600 hover:text-gray-900 font-medium">About</a>
            </nav>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/TeslaModels.jpg"
            alt="Tesla lineup in Miami"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/30" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-gray-900">
            What our clients say
          </h2>
          <p className="text-lg sm:text-xl text-gray-900 max-w-2xl mx-auto">
            Recent experiences from real people who chose us to enjoy a Tesla in Miami.
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {reviews.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <div key={review.id} className="space-y-4">
                  {/* Star rating */}
                  <div className="flex items-center gap-1">
                    <StarRating rating={review.rating} />
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg text-gray-700 leading-relaxed">
                    "{review.text}"
                  </blockquote>

                  {/* Author info */}
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {review.photo ? (
                        <Image
                          src={review.photo}
                          alt={review.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <cite className="font-semibold text-gray-900 not-italic">{review.name}</cite>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(review.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We're just getting started! Reviews from our amazing customers will appear here soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Create your own story...</h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join our growing community of satisfied customers and experience the future of driving in Miami.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          >
            Book Your Tesla Today
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L4 6v12l8 4 8-4V6l-8-4zm0 2.2l6 3v9.6l-6 3-6-3V7.2l6-3z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Miami&apos;s Tesla Family</p>
                  <p className="text-2xl font-semibold">TSLA Rent</p>
                </div>
              </div>
              <p className="text-gray-400">
                Premium Tesla rentals with Full Self-Driving and real humans on the other end of the phone.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Visit</h4>
              <p className="text-gray-400">Brickell &amp; Miami Beach delivery zones</p>
              <p className="text-gray-400 mt-2">Miami, Florida</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <a href="tel:+17868179906" className="block hover:text-white">
                  +1 (786) 817-9906
                </a>
                <a href="mailto:hi@tslarent.miami" className="block hover:text-white">
                  hi@tslarent.miami
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between gap-4">
            <p>&copy; {new Date().getFullYear()} TSLA Rent Miami. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="/about" className="hover:text-white">
                About
              </a>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

