'use client';

import { cars } from '@/lib/cars';
import Image from 'next/image';
import { useState } from 'react';
import { DateTimePicker } from '@/components/DateTimePicker';
import Footer from '@/components/Footer';
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
      <header className="bg-white/80 backdrop-blur-md z-50">
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
                  <DateTimePicker
                    date={startDate}
                    setDate={setStartDate}
                    minDate={new Date()}
                    className="w-full text-sm font-medium text-gray-900 bg-transparent border-none outline-none cursor-pointer"
                  />
                </div>

                {/* Until Date & Time */}
                <div className="col-span-1 md:col-span-1.5 p-4 hover:bg-gray-50 transition-colors group">
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                    To
                  </label>
                  <DateTimePicker
                    date={endDate}
                    setDate={setEndDate}
                    minDate={startDate || new Date()}
                    className="w-full text-sm font-medium text-gray-900 bg-transparent border-none outline-none cursor-pointer"
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
                      <option value="Other">Other</option>
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

      <Footer />
    </main>
  );
}

