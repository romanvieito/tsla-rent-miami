'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import { usePageTracking } from '@/lib/use-mixpanel';

type Car = {
  id: number;
  model: string;
  year: number;
  price: number;
  description: string;
  image: string;
  seats: number;
  range: number;
};
import { trackBookNowNavigation } from '@/lib/mixpanel';

export default function Home() {
  usePageTracking('FSD Page');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoadingCars, setIsLoadingCars] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/cars');
        if (response.ok) {
          const carsData = await response.json();
          setCars(carsData);
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setIsLoadingCars(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4 6v12l8 4 8-4V6l-8-4zm0 2.2l6 3v9.6l-6 3-6-3V7.2l6-3z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
            <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  TSLA Rent
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">Miami&apos;s Tesla Enthusiasts</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#fleet" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Fleet</a>
              <a href="#why-us" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Why Us</a>
              <a href="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">About</a>
              <a
                href="/"
                onClick={() => trackBookNowNavigation('FSD Page', 'desktop_nav')}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium"
              >
                Book Now
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
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

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-3 animate-in slide-in-from-top">
              <a href="#fleet" className="block py-2 text-gray-600 hover:text-gray-900 font-medium">Our Fleet</a>
              <a href="#why-us" className="block py-2 text-gray-600 hover:text-gray-900 font-medium">Why Us</a>
              <a href="/about" className="block py-2 text-gray-600 hover:text-gray-900 font-medium">About</a>
              <a
                href="/contact"
                onClick={() => trackBookNowNavigation('FSD Page', 'mobile_nav')}
                className="block text-center bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-lg font-medium"
              >
                Book Now
              </a>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
        </div>

        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-100 rounded-full px-4 py-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-sm font-medium text-red-900">Try Full Self-Driving</span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Feel the <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Future</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Safety first. Family-owned.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/" className="group bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-semibold text-lg flex items-center space-x-2">
              <span>Learn More</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-2">25+</div>
            <div className="text-gray-600 font-medium">Vehicles</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-2">100%</div>
            <div className="text-gray-600 font-medium">Electric</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-2">FSD</div>
            <div className="text-gray-600 font-medium">Equipped</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-2">24/7</div>
            <div className="text-gray-600 font-medium">Support</div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Why us?</h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              We&apos;re not just another rental company... we&apos;re Tesla enthusiasts who want you to experience the best.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">Flexible Rentals</h4>
              <p className="text-gray-300">Our vehicles come to you, perfectly fitting your busy schedule</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">Full Self-Driving</h4>
              <p className="text-gray-300">Try Tesla&apos;s advanced FSD technology on every rental.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">Impeccably Clean</h4>
              <p className="text-gray-300">Every vehicle is detailed and sanitized before your rental.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">Family Business</h4>
              <p className="text-gray-300">Personal service from people who genuinely care about your experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="fleet" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Our Fleet</h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our selection of pristine Tesla vehicles, all equipped with the latest technology.
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoadingCars ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))
          ) : (
            cars.map((car) => (
            <div
              key={car.id}
              className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-200 hover:-translate-y-1"
            >
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <Image
                  src={car.image}
                  alt={`${car.model} ${car.year}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Year Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-gray-900 shadow-lg">
                  {car.year}
                </div>

                {/* FSD Badge */}
                <div className="absolute top-3 left-3 bg-red-500/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg flex items-center space-x-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>FSD</span>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                    {car.model}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">{car.description}</p>
                </div>
                
                {/* Seats and Range */}
                <div className="flex gap-2 mb-4">
                  <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm text-gray-700 font-medium">{car.seats}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <rect x="2" y="7" width="16" height="10" rx="1" />
                      <rect x="18" y="10" width="2" height="4" rx="0.5" />
                      <path d="M10.5 9L8 12h4l-2.5 3" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
                    </svg>
                    <span className="text-sm text-gray-700 font-medium">{car.range}mi</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        ${car.price}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">/day</span>
                    </div>
                  </div>
                  <a href="/" className="bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold text-sm inline-block text-center">
                    Book
                  </a>
                </div>
              </div>
            </div>
            ))
          )}
        </div>
      </section>

      {/* Image Section with CTA */}
      <section className="relative bg-white overflow-hidden">
        <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
          <Image
            src="/TeslaModels.jpg"
            alt="Tesla fleet lineup on Miami beach"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          {/* Text content at bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg">
                Ready?
              </h3>
              <p className="text-white/95 text-xl sm:text-2xl mb-10 max-w-2xl mx-auto drop-shadow-md">
                Drive safe. Book your Tesla today.
              </p>
              <div className="flex justify-center">
                <a href="/" className="bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-lg">
                  Reserve Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

