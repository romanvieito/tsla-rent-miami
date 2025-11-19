'use client';

import { cars } from '@/lib/cars';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
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
                <p className="text-xs text-gray-500 hidden sm:block">Miami's Tesla Enthusiasts</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#fleet" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Fleet</a>
              <a href="#why-us" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Why Us</a>
              <a href="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">About</a>
              <a href="/contact" className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium">
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
              <a href="/contact" className="block text-center bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-lg font-medium">
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
            <a href="#fleet" className="group bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-semibold text-lg flex items-center space-x-2">
              <span>Explore Fleet</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="/contact" className="bg-white text-gray-900 px-8 py-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all font-semibold text-lg">
              Contact Us
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
              We're not just another rental company... we're Tesla enthusiasts who want you to experience the best.
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
              <p className="text-gray-300">Try Tesla's advanced FSD technology on every rental.</p>
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
          {cars.map((car) => (
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
                  <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold text-sm">
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="relative w-full h-[400px] md:h-[500px]">
          <Image
            src="/TeslaModels.jpg"
            alt="Tesla fleet lineup on Miami beach"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Ready?
          </h3>
          <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">
            Drive safe. Book your Tesla today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-lg">
              Reserve Now
            </a>
            <a href="tel:+17868179906" className="bg-gray-900 text-white px-10 py-4 rounded-xl hover:bg-gray-800 hover:shadow-xl transition-all font-bold text-lg">
              (786) 817-9906
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L4 6v12l8 4 8-4V6l-8-4zm0 2.2l6 3v9.6l-6 3-6-3V7.2l6-3z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
            <div>
                  <h3 className="text-2xl font-bold">TSLA Rent</h3>
                  <p className="text-red-400 text-sm">Miami's Tesla Enthusiasts</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Your premier family-owned Tesla rental experience in Miami. We're passionate about providing you with the cleanest vehicles, cutting-edge technology, and unbeatable service.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#fleet" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <svg className="w-4 h-4 mr-2 text-red-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Our Fleet
                  </a>
                </li>
                <li>
                  <a href="#why-us" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <svg className="w-4 h-4 mr-2 text-red-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Why Choose Us
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <svg className="w-4 h-4 mr-2 text-red-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <svg className="w-4 h-4 mr-2 text-red-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Get in Touch</h4>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-400">
                  <svg className="w-5 h-5 mr-3 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Miami, Florida</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="w-5 h-5 mr-3 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+17868179906" className="hover:text-white transition-colors">
                    (786) 817-9906
                  </a>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="w-5 h-5 mr-3 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:hi@tslarent.miami" className="hover:text-white transition-colors">
                    hi@tslarent.miami
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                &copy; 2025 TSLA Rent Miami.
              </p>
              {/* <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Insurance</a>
              </div> */}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

