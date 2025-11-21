'use client';

import { cars } from '@/lib/cars';
import Image from 'next/image';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, setHours, setMinutes } from 'date-fns';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(setHours(setMinutes(addDays(new Date(), 1), 0), 10));
  const [endDate, setEndDate] = useState<Date | null>(setHours(setMinutes(addDays(new Date(), 4), 0), 10));
  const [location, setLocation] = useState('Miami Airport (MIA)');
  const [selectedCarId, setSelectedCarId] = useState(cars[0].id);

  const selectedCar = cars.find(car => car.id === selectedCarId) || cars[0];

  const scrollLeft = () => {
    const container = document.getElementById('cars-carousel');
    if (container) {
      container.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('cars-carousel');
    if (container) {
      container.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0.5">
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
              <a href="#fleet" className="block py-2 text-gray-600 hover:text-gray-900 font-medium">Our Fleet</a>
              <a href="#why-us" className="block py-2 text-gray-600 hover:text-gray-900 font-medium">Why Us</a>
              <a href="/about" className="block py-2 text-gray-600 hover:text-gray-900 font-medium">About</a>
             
            </nav>
          )}

          {/* Booking Form */}
          <div className="mt-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-visible">
              <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                
                {/* From Date & Time */}
                <div className="col-span-1 md:col-span-1.5 p-4 hover:bg-gray-50 transition-colors group">
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                    From
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    timeIntervals={30}
                    minDate={new Date()}
                    dateFormat="MMM d, h:mm aa"
                    className="w-full text-sm font-medium text-gray-900 bg-transparent border-none outline-none cursor-pointer"
                    calendarClassName="custom-calendar"
                    wrapperClassName="w-full"
                  />
                </div>

                {/* Until Date & Time */}
                <div className="col-span-1 md:col-span-1.5 p-4 hover:bg-gray-50 transition-colors group">
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                    To
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    showTimeSelect
                    timeIntervals={30}
                    minDate={startDate || new Date()}
                    dateFormat="MMM d, h:mm aa"
                    className="w-full text-sm font-medium text-gray-900 bg-transparent border-none outline-none cursor-pointer"
                    calendarClassName="custom-calendar"
                    wrapperClassName="w-full"
                  />
                </div>

                {/* Location */}
                <div className="col-span-1 md:col-span-2 p-4 hover:bg-gray-50 transition-colors group">
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                    Where
                  </label>
                  <div className="relative">
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full text-base font-medium text-gray-900 bg-transparent border-none outline-none appearance-none pr-6 cursor-pointer"
                    >
                      <option value="Miami Airport (MIA)">Miami Airport (MIA)</option>
                      <option value="Fort Lauderdale Airport (FLL)">Fort Lauderdale Airport (FLL)</option>
                      <option value="Miami Beach">Miami Beach</option>
                      <option value="Downtown Miami">Downtown Miami</option>
                      <option value="Brickell">Brickell</option>
                    </select>
                    <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Fleet Section - Hero + Carousel */}
      <section id="fleet" className="bg-white">
        {/* Title */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <div className="text-center mb-2">
            <h2 className="text-xl md:text-2xl font-bold text-gray-700">
              Select a Model
            </h2>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gray-900">
          <Image
            key={selectedCarId}
            src={selectedCar.image}
            alt={selectedCar.model}
            fill
            className="object-cover transition-all duration-500 ease-in-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-white/40 transition-all duration-500"></div>
        </div>

        {/* Carousel Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Cars Carousel */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={scrollLeft}
              className="flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 w-8 h-8 md:w-12 md:h-12 bg-white/80 md:bg-white rounded-full md:shadow-lg hover:bg-white md:hover:shadow-xl hover:scale-105 md:hover:scale-110 transition-all items-center justify-center z-10 border-0 md:border border-gray-200"
              aria-label="Scroll left"
            >
              <svg className="w-4 h-4 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={scrollRight}
              className="flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 w-8 h-8 md:w-12 md:h-12 bg-white/80 md:bg-white rounded-full md:shadow-lg hover:bg-white md:hover:shadow-xl hover:scale-105 md:hover:scale-110 transition-all items-center justify-center z-10 border-0 md:border border-gray-200"
              aria-label="Scroll right"
            >
              <svg className="w-4 h-4 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Scrollable Cards */}
            <div
              id="cars-carousel"
              className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth py-2 pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {cars.map((car) => (
                <div
                  key={car.id}
                  className="flex-none w-[calc(55.55%-0.75rem)] md:w-[calc(33.333%-1rem)] snap-start"
                >
                  <div 
                    onMouseEnter={() => setSelectedCarId(car.id)}
                    onClick={() => setSelectedCarId(car.id)}
                    className={`rounded-lg border overflow-hidden transition-all duration-300 h-full cursor-pointer ${
                      selectedCarId === car.id 
                        ? 'bg-gray-50/50 border-gray-400 shadow-lg scale-[1.01]' 
                        : 'bg-white border-gray-200 hover:shadow-xl hover:border-gray-300 hover:scale-[1.01]'
                    }`}
                  >
                    {/* Card Content */}
                    <div className="p-4">
                      {/* Model Name */}
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {car.model}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-1 leading-relaxed min-h-[60px]">
                        {car.description}
                      </p>

                      {/* Seats and Range */}
                      <div className="hidden md:flex gap-1 md:gap-2 mb-1 md:mb-2">
                        <div className={`flex items-center gap-1 md:gap-1.5 px-1.5 py-0.5 md:px-3 md:py-1.5 rounded md:rounded-lg border transition-all ${
                          selectedCarId === car.id 
                            ? 'bg-gray-100 border-gray-300' 
                            : 'bg-gray-50 border-gray-200'
                        }`}>
                          <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-xs md:text-sm text-gray-700 font-medium">{car.seats}</span>
                        </div>
                        <div className={`flex items-center gap-1 md:gap-1.5 px-1.5 py-0.5 md:px-3 md:py-1.5 rounded md:rounded-lg border transition-all ${
                          selectedCarId === car.id 
                            ? 'bg-gray-100 border-gray-300' 
                            : 'bg-gray-50 border-gray-200'
                        }`}>
                          <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <rect x="2" y="7" width="16" height="10" rx="1" />
                            <rect x="18" y="10" width="2" height="4" rx="0.5" />
                            <path d="M10.5 9L8 12h4l-2.5 3" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
                          </svg>
                          <span className="text-xs md:text-sm text-gray-700 font-medium">{car.range}mi</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-2">
                        <div className="flex items-baseline">
                          <span className="text-xl font-bold text-gray-900">
                            ${car.price}
                          </span>
                          <span className="text-gray-600 ml-1">/day</span>
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="space-y-3">
                        <button className="w-full px-6 py-3 rounded-md font-medium transition-colors bg-gray-900 text-white hover:bg-gray-800">
                          Reserve
                        </button>
                       
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="relative w-full h-[600px] md:h-[700px]">
          <Image
            src="/TeslaModels.jpg"
            alt="Tesla fleet lineup on Miami beach"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                Safety is more important than ever
              </h2>
              <p className="text-xl text-white/90 max-w-2xl drop-shadow-md">
                Enjoy the view with Full Self-Driving
              </p>
            </div>
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
                  <h3 className="text-2xl font-bold">TRent</h3>
                  <p className="text-red-400 text-sm">Miami&apos;s Family-Owned Business</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Your premier family-owned Tesla rental experience in Miami. We&apos;re passionate about providing you with the cleanest vehicles, cutting-edge technology, and unbeatable service.
              </p>
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
                  <a href="/about" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <svg className="w-4 h-4 mr-2 text-red-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    About
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
                    +1 (786) 817-9906
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
                <li className="flex items-start text-gray-400">
                  <svg className="w-5 h-5 mr-3 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <a href="https://linkedin.com/in/yaibolanos" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                &copy; 2025 TRent Miami.
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

