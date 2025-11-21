'use client';

import { cars } from '@/lib/cars';
import Image from 'next/image';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, format, setHours, setMinutes } from 'date-fns';

type FormState = {
  name: string;
  email: string;
  phone: string;
};

type FormStatus = 'idle' | 'success';

export default function BookPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(cars[0].id);
  const [startDate, setStartDate] = useState<Date | null>(
    setHours(setMinutes(addDays(new Date(), 1), 0), 10)
  );
  const [endDate, setEndDate] = useState<Date | null>(
    setHours(setMinutes(addDays(new Date(), 4), 0), 10)
  );
  const pickupLocations = [
    {
      value: 'Miami Airport (MIA)',
      description: 'Front-door delivery at arrivals or Signature Aviation.',
    },
    {
      value: 'Fort Lauderdale Airport (FLL)',
      description: 'Coordinated handoffs across all terminals with buffer time.',
    },
    {
      value: 'Miami Beach',
      description: 'Hotel, resort, and short-term rental deliveries between South Pointe and Mid-Beach.',
    },
    {
      value: 'Downtown Miami',
      description: 'Office towers, museums, and event loading zones with valet coordination.',
    },
    {
      value: 'Brickell',
      description: 'Residential towers and Brickell City Centre meetups with garage access.',
    },
  ];
  const [location, setLocation] = useState(pickupLocations[0].value);
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const selectedCar =
    cars.find(car => car.id === selectedCarId) ?? cars[0];

  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
    if (status === 'success') {
      setStatus('idle');
    }
  };

  const clearDateError = (field: 'startDate' | 'endDate') => {
    if (errors[field]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
    if (status === 'success') {
      setStatus('idle');
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!startDate) {
      newErrors.startDate = 'Pickup date is required';
    }

    if (!endDate) {
      newErrors.endDate = 'Return date is required';
    } else if (startDate && endDate < startDate) {
      newErrors.endDate = 'Return must be after pickup';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      setStatus('idle');
      return;
    }

    setStatus('success');
  };

  const formatDate = (date: Date | null) =>
    date ? format(date, 'MMM d, h:mm aa') : '--';

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md z-50">
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
              <a href="/reviews" className="block py-2 text-gray-600 hover:text-gray-900 font-medium">What our clients say</a>
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <h2 className="text-2xl sm:text-2xl lg:text-3xl xl:text-3xl font-bold leading-tight mb-2 text-gray-900">
            Book a Tesla in Miami
          </h2>
          <div className="flex flex-col md:flex-row items-stretch gap-6 max-w-4xl mx-auto mt-8">
            {/* Experience Full Self-Driving (Supervised) */}
            <div className="flex flex-row md:flex-col items-center text-center flex-1 gap-4 md:gap-0">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center md:mb-4">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  {/* Outer rim */}
                  <circle cx="12" cy="12" r="8" />
                  {/* Center hub */}
                  <circle cx="12" cy="12" r="2.5" />
                  {/* Horizontal spoke */}
                  <line x1="4" y1="12" x2="9.5" y2="12" />
                  <line x1="14.5" y1="12" x2="20" y2="12" />
                  {/* Vertical spoke */}
                  <line x1="12" y1="4" x2="12" y2="9.5" />
                  <line x1="12" y1="14.5" x2="12" y2="20" />
                  {/* Diagonal spokes */}
                  <line x1="6.34" y1="6.34" x2="9.66" y2="9.66" />
                  <line x1="14.34" y1="14.34" x2="17.66" y2="17.66" />
                  <line x1="17.66" y1="6.34" x2="14.34" y2="9.66" />
                  <line x1="9.66" y1="14.34" x2="6.34" y2="17.66" />
                </svg>
              </div>
              <h3 className="text-lg text-gray-900 md:mb-2">
                Experience Full Self-Driving
              </h3>
              <p className="hidden md:block text-sm text-gray-700 leading-relaxed">
                Let your vehicle drive you almost anywhere with your active supervision. Includes Auto Lane Changes, Actually Smart Summon, Autopark, and more.
              </p>
            </div>

            {/* Ownership Experience in App */}
            <div className="flex flex-row md:flex-col items-center text-center flex-1 gap-4 md:gap-0">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center md:mb-4">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <rect x="6" y="2" width="12" height="20" rx="2" />
                  <path d="M11 1 h2" strokeLinecap="round" />
                  <circle cx="12" cy="18" r="1" />
                </svg>
              </div>
              <h3 className="text-lg text-gray-900 md:mb-2">
                Ownership Experience in App
              </h3>
              <p className="hidden md:block text-sm text-gray-700 leading-relaxed">
                Download the Tesla App to experience keyless driving, locating your vehicle, pre-cooling and heating, locking and unlocking, Sentry, and more.
              </p>
            </div>

            {/* Quick and Easy Check-in */}
            <div className="flex flex-row md:flex-col items-center text-center flex-1 gap-4 md:gap-0">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center md:mb-4">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg text-gray-900 md:mb-2">
                Quick and Easy Check-in
              </h3>
              <p className="hidden md:block text-sm text-gray-700 leading-relaxed">
                Starting your drive is simple and low hassle, whether you&apos;re on a self-serve drive or visiting our advisors in store.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step 1 – When */}
      <section id="book-form" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-red-600 tracking-widest uppercase mb-3">Step 1</p>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">When do you want to drive?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lock in your pickup and return window.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 tracking-widest uppercase mb-2">
                    Pickup
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={date => {
                      setStartDate(date);
                      clearDateError('startDate');
                    }}
                    showTimeSelect
                    timeIntervals={30}
                    minDate={new Date()}
                    dateFormat="MMM d, h:mm aa"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                    calendarClassName="custom-calendar"
                    wrapperClassName="w-full"
                  />
                  {errors.startDate && <p className="text-sm text-red-600 mt-1">{errors.startDate}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 tracking-widest uppercase mb-2">
                    Return
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={date => {
                      setEndDate(date);
                      clearDateError('endDate');
                    }}
                    showTimeSelect
                    timeIntervals={30}
                    minDate={startDate ?? new Date()}
                    dateFormat="MMM d, h:mm aa"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                    calendarClassName="custom-calendar"
                    wrapperClassName="w-full"
                  />
                  {errors.endDate && <p className="text-sm text-red-600 mt-1">{errors.endDate}</p>}
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Need to tweak the schedule later? Just text us—we&apos;ll take care of it before delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Models */}
      <section id="models" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-red-600 tracking-widest uppercase mb-3">Step 2</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Select a Model</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every vehicle includes Full Self-Driving, premium connectivity, and concierge delivery.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map(car => {
            const isActive = selectedCarId === car.id;
            return (
              <button
                key={car.id}
                type="button"
                onClick={() => setSelectedCarId(car.id)}
                className={`text-left rounded-2xl border p-5 transition-all ${
                  isActive
                    ? 'border-gray-900 shadow-2xl shadow-gray-200 bg-white'
                    : 'border-gray-200 bg-white hover:border-gray-400 hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400">{car.year}</p>
                    <h4 className="text-xl font-bold">{car.model}</h4>
                  </div>
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      isActive ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    ${car.price}/day
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4 min-h-[56px]">{car.description}</p>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    {car.seats} seats
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="7" width="16" height="10" rx="1" />
                      <rect x="18" y="10" width="2" height="4" rx="0.5" />
                      <path d="M10.5 9L8 12h4l-2.5 3" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
                    </svg>
                    {car.range}mi range
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 3 – Where */}
      <section id="where" className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <p className="text-sm font-semibold tracking-widest uppercase text-red-400 mb-3">Step 3</p>
              <h3 className="text-3xl font-bold">Where?</h3>
              <p className="text-white/80">
                Choose a location and tell us who to contact on delivery day.
              </p>
              <div className="bg-white text-gray-900 rounded-2xl p-6 shadow-xl border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400">Selected Model</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedCar.model}</p>
                  </div>
                  <span className="text-sm font-semibold bg-white border border-gray-200 px-3 py-1 rounded-full">
                    ${selectedCar.price}/day
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p className="font-semibold text-gray-500 text-xs uppercase mb-1">Pickup</p>
                    <p>{formatDate(startDate)}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500 text-xs uppercase mb-1">Return</p>
                    <p>{formatDate(endDate)}</p>
                  </div>
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="bg-white text-gray-900 rounded-3xl shadow-xl border border-white/10 p-6 sm:p-8 space-y-6"
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-500 tracking-widest uppercase mb-2">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <select
                      value={location}
                      onChange={event => {
                        setLocation(event.target.value);
                        if (status === 'success') {
                          setStatus('idle');
                        }
                      }}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 appearance-none"
                    >
                      {pickupLocations.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.value}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 tracking-widest uppercase mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={event => handleInputChange('name', event.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                      placeholder="Jane Doe"
                    />
                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 tracking-widest uppercase mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={event => handleInputChange('phone', event.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                      placeholder="(305) 555-0101"
                    />
                    {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 tracking-widest uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={event => handleInputChange('email', event.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                    placeholder="you@email.com"
                  />
                  {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors"
                  >
                    Send Request
                  </button>
                  {status === 'success' && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                      Thanks! We&apos;ll text you in a few minutes to confirm the schedule and delivery
                      details. This demo doesn&apos;t send an email yet, but your info is saved locally.
                    </div>
                  )}
                </div>
              </form>
              <p className="text-white/60 text-sm">
                Need something special (villa, marina, production site)? Text or call us after you submit the
                form and we&apos;ll confirm the logistics within minutes.
              </p>
            </div>
            <div className="grid gap-4">
              {pickupLocations.map(option => (
                <div key={option.value} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-white">{option.value}</p>
                    <span className="text-xs uppercase tracking-wide text-emerald-300">Preferred</span>
                  </div>
                  <p className="text-white/70 text-sm">{option.description}</p>
                </div>
              ))}
            </div>
          </div>
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

