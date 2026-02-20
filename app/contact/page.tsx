'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePageTracking } from '@/lib/use-mixpanel';
import { trackBookNowNavigation } from '@/lib/mixpanel';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Contact() {
  usePageTracking('Contact Page');
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
                Contact
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Intro */}
        <div>
          <p className="text-sm font-semibold text-red-600 tracking-widest uppercase mb-3">Get in Touch</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">We&apos;d love to hear from you</h3>
          <p className="text-lg leading-relaxed text-gray-700 max-w-2xl">
            Whether you have a question about a rental, need help planning your trip, or just want to say hello, reach out any time.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <a
            href="tel:+17868179906"
            className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-gray-400 transition-colors group"
          >
            <div className="w-10 h-10 bg-gray-900/5 rounded-xl flex items-center justify-center mb-4">
              <Phone className="w-5 h-5 text-gray-900" />
            </div>
            <h4 className="text-base font-bold text-gray-900 mb-1">Phone</h4>
            <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">+1 (786) 817-9906</p>
          </a>

          <a
            href="mailto:yai@tsla.miami"
            className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-gray-400 transition-colors group"
          >
            <div className="w-10 h-10 bg-gray-900/5 rounded-xl flex items-center justify-center mb-4">
              <Mail className="w-5 h-5 text-gray-900" />
            </div>
            <h4 className="text-base font-bold text-gray-900 mb-1">Email</h4>
            <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">yai@tsla.miami</p>
          </a>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="w-10 h-10 bg-gray-900/5 rounded-xl flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-gray-900" />
            </div>
            <h4 className="text-base font-bold text-gray-900 mb-1">Location</h4>
            <p className="text-sm text-gray-600">Miami, FL</p>
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.5!2d-80.1914!3d25.7907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b68b0b0b0b0b%3A0x0!2zMjAwMCBCaXNjYXluZSBCbHZkLCBNaWFtaSwgRkwgMzMxMzI!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            title="Miami, FL"
          ></iframe>
        </div>

        {/* Book CTA */}
        <div className="text-center">
          <Link
            href="/"
            onClick={() => trackBookNowNavigation('Contact Page', 'cta_section')}
            className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-lg"
          >
            Book Now
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

