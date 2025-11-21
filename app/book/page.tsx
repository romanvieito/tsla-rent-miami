'use client';

import { cars } from '@/lib/cars';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { DateTimePicker } from '@/components/DateTimePicker';
import Header from '@/components/Header';
import { addDays, format, setHours, setMinutes } from 'date-fns';

// Dynamically import LocationMap to avoid SSR issues with Leaflet
const LocationMap = dynamic(() => import('@/components/LocationMap'), {
  ssr: false,
});

type FormState = {
  name: string;
  email: string;
  phone: string;
};

type FormStatus = 'idle' | 'success';

type AutocompleteSuggestion = {
  description: string;
  placeId: string;
  primaryText: string;
  secondaryText: string;
};

export default function BookPage() {
  const [selectedCarId, setSelectedCarId] = useState(cars[0].id);
  const [startDate, setStartDate] = useState<Date | null>(
    setHours(setMinutes(addDays(new Date(), 1), 0), 10)
  );
  const [endDate, setEndDate] = useState<Date | null>(
    setHours(setMinutes(addDays(new Date(), 4), 0), 10)
  );
  const pickupLocations = [
    {
      value: 'Miami International Airport (MIA)',
      address: 'NW 21st St, Miami, FL 33126',
      latitude: 25.7959,
      longitude: -80.2870,
    },
    {
      value: 'Edgewater',
      address: '2000 Biscayne Blvd, Miami, FL 33132',
      latitude: 25.7987,
      longitude: -80.1900,
    },
    {
      value: 'Coconut Grove',
      address: '2930 Coconut Ave, Miami, FL 33133',
      latitude: 25.7280,
      longitude: -80.2410,
    },
  ];
  const [location, setLocation] = useState(pickupLocations[0].value);
  const [addressInput, setAddressInput] = useState('');
  const [customCoordinates, setCustomCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const [isFetchingPlaceDetails, setIsFetchingPlaceDetails] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [suggestionError, setSuggestionError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const suggestionsListId = 'pickup-location-suggestions';

  const resetStatusIfNeeded = () => {
    if (status === 'success') {
      setStatus('idle');
    }
  };

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
    resetStatusIfNeeded();
  };

  const clearDateError = (field: 'startDate' | 'endDate') => {
    if (errors[field]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
    resetStatusIfNeeded();
  };

  const handlePresetLocationChange = (value: string) => {
    setLocation(value);
    setCustomCoordinates(null);
    resetStatusIfNeeded();
  };

  const handleCustomLocationChange = (lat: number, lng: number) => {
    setCustomCoordinates({ lat, lng });
    setLocation('Custom Pin');
    resetStatusIfNeeded();
  };

  const closeSuggestions = () => {
    setIsSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);
  };

  const handleSuggestionSelect = async (suggestion: AutocompleteSuggestion) => {
    setAddressInput(suggestion.description);
    resetStatusIfNeeded();
    setSuggestions([]);
    closeSuggestions();
    setSuggestionError(null);
    setIsFetchingPlaceDetails(true);

    try {
      const response = await fetch('/api/places/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ placeId: suggestion.placeId }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch place details');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.address) {
        setAddressInput(data.address);
      }

      if (
        typeof data.coordinates?.lat === 'number' &&
        typeof data.coordinates?.lng === 'number'
      ) {
        handleCustomLocationChange(data.coordinates.lat, data.coordinates.lng);
      }
    } catch (error) {
      console.error('Place selection error:', error);
      setSuggestionError('Unable to load that spot. Try again or drop a pin on the map.');
    } finally {
      setIsFetchingPlaceDetails(false);
    }
  };

  const handleAddressKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      if (!suggestions.length) {
        return;
      }
      event.preventDefault();
      setIsSuggestionsOpen(true);
      setActiveSuggestionIndex(prev => {
        if (prev === -1 || prev === suggestions.length - 1) {
          return 0;
        }
        return prev + 1;
      });
      return;
    }

    if (event.key === 'ArrowUp') {
      if (!suggestions.length) {
        return;
      }
      event.preventDefault();
      setIsSuggestionsOpen(true);
      setActiveSuggestionIndex(prev => {
        if (prev <= 0) {
          return suggestions.length - 1;
        }
        return prev - 1;
      });
      return;
    }

    if (event.key === 'Enter') {
      if (isSuggestionsOpen && activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
        event.preventDefault();
        handleSuggestionSelect(suggestions[activeSuggestionIndex]);
      }
      return;
    }

    if (event.key === 'Escape') {
      closeSuggestions();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(target) &&
        inputRef.current &&
        !inputRef.current.contains(target)
      ) {
        setIsSuggestionsOpen(false);
        setActiveSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const query = addressInput.trim();
    if (query.length < 3) {
      setSuggestions([]);
      setIsSuggestionsOpen(false);
      setSuggestionError(null);
      setIsFetchingSuggestions(false);
      setActiveSuggestionIndex(-1);
      return;
    }

    setIsFetchingSuggestions(true);
    setIsSuggestionsOpen(true);
    setSuggestionError(null);

    const controller = new AbortController();
    let isCancelled = false;
    let hasStartedRequest = false;
    
    const timeoutId = setTimeout(async () => {
      hasStartedRequest = true;
      try {
        const response = await fetch('/api/places/autocomplete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
          signal: controller.signal,
        });

        if (isCancelled) return;

        if (!response.ok) {
          throw new Error('Autocomplete request failed');
        }

        const data = await response.json();

        if (isCancelled) return;

        if (data.error) {
          setSuggestionError('Unable to fetch suggestions right now.');
          setSuggestions([]);
          setActiveSuggestionIndex(-1);
          return;
        }

        const nextPredictions: AutocompleteSuggestion[] = data.predictions ?? [];
        setSuggestions(nextPredictions);
        setActiveSuggestionIndex(-1);
        setSuggestionError(
          nextPredictions.length ? null : 'No nearby matches yet. Try another block or drop a pin.'
        );
      } catch (error) {
        if (isCancelled) return;
        
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        setSuggestionError('Unable to fetch suggestions right now.');
        setSuggestions([]);
        setActiveSuggestionIndex(-1);
      } finally {
        if (!isCancelled) {
          setIsFetchingSuggestions(false);
        }
      }
    }, 250);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
      try {
        if (hasStartedRequest && !controller.signal.aborted) {
          controller.abort();
        }
      } catch (error) {
        // Silently handle any abort errors
      }
    };
  }, [addressInput]);

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
      <Header />

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
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">When?</h3>
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
                  <DateTimePicker
                    date={startDate}
                    setDate={date => {
                      setStartDate(date);
                      clearDateError('startDate');
                    }}
                    minDate={new Date()}
                    className="w-full"
                  />
                  {errors.startDate && <p className="text-sm text-red-600 mt-1">{errors.startDate}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 tracking-widest uppercase mb-2">
                    Return
                  </label>
                  <DateTimePicker
                    date={endDate}
                    setDate={date => {
                      setEndDate(date);
                      clearDateError('endDate');
                    }}
                    minDate={startDate ?? new Date()}
                    className="w-full"
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
      <section id="where" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase text-red-600 mb-3">Step 3</p>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Where?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose a location.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white text-gray-900 rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 tracking-widest uppercase mb-2">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      ref={inputRef}
                      value={addressInput}
                      onChange={event => {
                        setAddressInput(event.target.value);
                        resetStatusIfNeeded();
                      }}
                      onFocus={() => {
                        if (addressInput.trim().length >= 3 && (suggestions.length || suggestionError)) {
                          setIsSuggestionsOpen(true);
                        }
                      }}
                      onKeyDown={handleAddressKeyDown}
                      className="w-full bg-gray-100 border-0 rounded-xl pl-12 pr-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                      placeholder="Enter Address"
                      role="combobox"
                      aria-expanded={isSuggestionsOpen}
                      aria-controls={isSuggestionsOpen ? suggestionsListId : undefined}
                      aria-activedescendant={
                        isSuggestionsOpen && activeSuggestionIndex >= 0
                          ? `${suggestionsListId}-option-${activeSuggestionIndex}`
                          : undefined
                      }
                      aria-autocomplete="list"
                      autoComplete="off"
                    />
                    {isSuggestionsOpen && (
                      <div
                        ref={suggestionsRef}
                        className="absolute left-0 right-0 mt-2 rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-900/5 z-20 overflow-hidden"
                        role="listbox"
                        id={suggestionsListId}
                      >
                        {isFetchingSuggestions && (
                          <p className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
                            Searching near Miami…
                          </p>
                        )}
                        {!isFetchingSuggestions && suggestionError && (
                          <p className="px-4 py-3 text-xs text-gray-500">{suggestionError}</p>
                        )}
                        {suggestions.map((suggestion, index) => {
                          const isActive = index === activeSuggestionIndex;
                          return (
                            <button
                              key={suggestion.placeId}
                              type="button"
                              id={`${suggestionsListId}-option-${index}`}
                              className={`flex flex-col w-full text-left px-4 py-3 text-sm transition ${
                                isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
                              }`}
                              onMouseDown={event => event.preventDefault()}
                              onClick={() => handleSuggestionSelect(suggestion)}
                              role="option"
                              aria-selected={isActive}
                            >
                              <span className="font-semibold text-gray-900">{suggestion.primaryText}</span>
                              {suggestion.secondaryText && (
                                <span className="text-xs text-gray-500">{suggestion.secondaryText}</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    {isFetchingPlaceDetails && (
                      <p className="text-xs text-gray-500 mt-2">Dropping a pin at that spot…</p>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex flex-col gap-3">
                    {pickupLocations.map(pickupLocation => {
                      const isActive = location === pickupLocation.value && location !== 'Custom Pin';
                      return (
                        <button
                          key={pickupLocation.value}
                          type="button"
                          onClick={() => handlePresetLocationChange(pickupLocation.value)}
                          className={`rounded-2xl border p-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20 ${
                            isActive
                              ? 'border-gray-900 bg-gray-900/5 shadow-lg shadow-gray-200/60'
                              : 'border-gray-200 hover:border-gray-400'
                          }`}
                          aria-pressed={isActive}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-gray-900">{pickupLocation.value}</p>
                            {isActive && (
                              <span className="w-2 h-2 bg-gray-900 rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{pickupLocation.address}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Need to tweak the drop-off later? Just let us know and we&apos;ll confirm before delivery.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <LocationMap
                locations={pickupLocations}
                selectedLocation={location}
                customCoordinates={customCoordinates}
                onSelect={handlePresetLocationChange}
                onCustomSelect={handleCustomLocationChange}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Step 4 – Reserve */}
      <section id="reserve" className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-red-400 tracking-widest uppercase mb-3">Step 4</p>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">Reserve</h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              Confirm your driver details so we can coordinate the handoff for your {selectedCar.model.split(' ').slice(0, 2).join(' ')}.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-10 space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400">Selected Model</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedCar.model}</p>
                  </div>
                  <span className="text-sm font-semibold bg-gray-100 text-gray-900 border border-gray-200 px-3 py-1 rounded-full">
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
                  <div>
                    <p className="font-semibold text-gray-500 text-xs uppercase mb-1">Location</p>
                    <p>{location}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500 text-xs uppercase mb-1">Address</p>
                    <p>
                      {location === 'Custom Pin'
                        ? addressInput || 'Pending'
                        : pickupLocations.find(loc => loc.value === location)?.address || addressInput || 'Pending'}
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 text-sm text-gray-600">
                  We&apos;ll reach out to confirm the details and share arrival instructions.
                </div>
              </div>

              <div className="space-y-5">
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
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors"
              >
                Reserve
              </button>
              {status === 'success' && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                  Thanks! We&apos;ll text you in a few minutes to confirm the schedule and delivery
                  details. This demo doesn&apos;t send an email yet, but your info is saved locally.
                </div>
              )}
            </div>
          </form>
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
                  <p className="text-2xl font-semibold">TRent.</p>
                </div>
              </div>
              <p className="text-gray-400">
                Premium Tesla rentals with Full Self-Driving in Miami.
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

