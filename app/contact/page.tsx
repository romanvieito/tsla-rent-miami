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
          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-16 md:pb-8 lg:pb-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 drop-shadow-lg">
                Contact
              </h2>
              <p className="text-white/95 text-xl sm:text-2xl max-w-2xl mx-auto drop-shadow-md mb-12">
                Ready to experience the future of driving? Get in touch with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 mr-3 mt-0.5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p>2000 Biscayne Blvd</p>
                      <p>Miami, FL</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 mr-3 mt-0.5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <a href="mailto:yai@tsla.miami" className="hover:text-gray-900">yai@tsla.miami</a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 mr-3 mt-0.5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <a href="tel:7868179906" className="hover:text-gray-900">+1 (786) 817-9906</a>
                    </div>
                  </div>

                </div>
                <div className="mt-6">
                <Link
                  href="/"
                  onClick={() => trackBookNowNavigation('Contact Page', 'cta_section')}
                  className="inline-block bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold text-base"
                >
                  Book Now
                </Link>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="w-full h-96 rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.5!2d-80.1914!3d25.7907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b68b0b0b0b0b%3A0x0!2zMjAwMCBCaXNjYXluZSBCbHZkLCBNaWFtaSwgRkwgMzMxMzI!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="2000 Biscayne Blvd, Miami, FL"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

