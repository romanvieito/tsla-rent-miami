'use client';

import { reviews } from '@/lib/reviews';
import Image from 'next/image';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePageTracking } from '@/lib/use-mixpanel';

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
  usePageTracking('Reviews Page');

  const [visibleCount, setVisibleCount] = useState(9);

  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = reviews.length > visibleCount;

  const handleSeeMore = () => {
    setVisibleCount(reviews.length);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900">
      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        {/* Header */}
        <Header />
        <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
          <Image
            src="/TeslaModels.jpg"
            alt="Tesla lineup in Miami"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          {/* Text content at bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-16 md:pb-8 lg:pb-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg">
                What our guests say
              </h2>
              <p className="text-white/95 text-xl sm:text-2xl max-w-2xl mx-auto drop-shadow-md">
                Recent reviews from real people
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Turo Link */}
      <div className="py-8 text-center">
        <a 
          href="https://turo.com/us/en/host/16664600" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors border-b border-gray-300 hover:border-gray-900 pb-1"
        >
          <span>View on Turo</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Reviews Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {reviews.length > 0 ? (
            <>
              <div className="grid gap-8 grid-cols-1">
                {visibleReviews.map((review) => (
                  <div key={review.id} className="space-y-4 text-center mb-14">
                    {/* Star rating */}
                    <div className="flex items-center justify-center gap-1">
                      <StarRating rating={review.rating} />
                    </div>

                    {/* Quote - only show if text exists */}
                    {review.text.trim() && (
                      <blockquote className="text-lg text-gray-700 leading-relaxed">
                        &ldquo;{review.text}&rdquo;
                      </blockquote>
                    )}

                    {/* Author info */}
                    <div className="flex items-center justify-center gap-4">
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
              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    onClick={handleSeeMore}
                    className="inline-flex items-center px-8 py-3 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-medium rounded-xl transition-colors"
                  >
                    See More Reviews
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We&apos;re just getting started! Reviews from our amazing customers will appear here soon.
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
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-lg inline-block"
          >
            Book Now
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

