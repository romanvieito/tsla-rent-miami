'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Image from 'next/image';
import { usePageTracking } from '@/lib/use-mixpanel';
import { trackBookNowNavigation } from '@/lib/mixpanel';

export default function About() {
  usePageTracking('About Page');
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
          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-16 drop-shadow-lg">
                About
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Intro Block */}
        <div>
          <p className="text-sm font-semibold text-red-600 tracking-widest uppercase mb-3">Meet the Host</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Hi, I&apos;m Yai</h3>
          <div className="space-y-5 text-lg leading-relaxed text-gray-700">
            <p>
              I&apos;m an engineer who fell in love with Teslas the first time I drove one. What started as personal enthusiasm quickly turned into a mission: give visitors the safest, most enjoyable way to explore Miami.
            </p>
            <p>
              Every vehicle in our fleet is personally maintained, detailed before each trip, and equipped with Full Self-Driving so you can sit back and take in the city. We deliver straight to your door, free of charge.
            </p>
            <p>
              Have questions or just want to say hi? Connect with me on{' '}
              <a href="https://linkedin.com/in/yaibolanos" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-gray-700 underline font-medium">LinkedIn</a>.
            </p>
          </div>
        </div>

        {/* Value Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="w-10 h-10 bg-gray-900/5 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="text-base font-bold text-gray-900 mb-1">Safety-First Mindset</h4>
            <p className="text-sm text-gray-600">Your well-being is the top priority on every trip we coordinate.</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="w-10 h-10 bg-gray-900/5 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-base font-bold text-gray-900 mb-1">Full Self-Driving Included</h4>
            <p className="text-sm text-gray-600">Every rental comes with Tesla&apos;s most advanced driver-assist technology.</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="w-10 h-10 bg-gray-900/5 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h4 className="text-base font-bold text-gray-900 mb-1">Free Delivery to Your Door</h4>
            <p className="text-sm text-gray-600">No pickup counters. We bring the car to wherever you are in Miami.</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="w-10 h-10 bg-gray-900/5 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h4 className="text-base font-bold text-gray-900 mb-1">Impeccably Clean Vehicles</h4>
            <p className="text-sm text-gray-600">Every car is detailed and sanitized before it reaches you.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to experience it yourself?</h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Book a Tesla and we&apos;ll deliver it to your door in Miami.
          </p>
          <a
            href="/"
            onClick={() => trackBookNowNavigation('About Page', 'cta_section')}
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

