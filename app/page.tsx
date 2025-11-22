'use client';

import { cars } from '@/lib/cars';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { DateTimePicker } from '@/components/DateTimePicker';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { addDays, format, setHours, setMinutes, differenceInDays } from 'date-fns';
import { usePageTracking } from '@/lib/use-mixpanel';
import { trackCarSelection, trackFormSubmission, trackBookingInquiry } from '@/lib/mixpanel';

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

export default function Home() {
  usePageTracking('Homepage');

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
  const [addressInput, setAddressInput] = useState(pickupLocations[0].address);
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
  const [isInReserveSection, setIsInReserveSection] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const suggestionsListId = 'pickup-location-suggestions';

  const resetStatusIfNeeded = () => {
    if (status === 'success') {
      setStatus('idle');
    }
  };

  const selectedCar =
    cars.find(car => car.id === selectedCarId) ?? cars[0];
  const rentalDays =
    startDate && endDate ? Math.max(1, differenceInDays(endDate, startDate)) : 1;
  const totalPrice = rentalDays * selectedCar.price;

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
    setHasInteracted(true);
    setLocation(value);
    setCustomCoordinates(null);
    // Autofill address input with the preset location's address
    const selectedPickupLocation = pickupLocations.find(loc => loc.value === value);
    if (selectedPickupLocation) {
      setAddressInput(selectedPickupLocation.address);
    }
    // Close suggestions and clear them to avoid showing autocomplete
    setIsSuggestionsOpen(false);
    setSuggestions([]);
    setActiveSuggestionIndex(-1);
    setSuggestionError(null);
    resetStatusIfNeeded();
  };

  const handleCustomLocationChange = (lat: number, lng: number) => {
    setHasInteracted(true);
    setCustomCoordinates({ lat, lng });
    setLocation('Custom Pin');
    resetStatusIfNeeded();
  };

  const closeSuggestions = () => {
    setIsSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);
  };

  const handleSuggestionSelect = async (suggestion: AutocompleteSuggestion) => {
    setHasInteracted(true);
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

    // Don't trigger autocomplete if the input matches a preset location address
    const isPresetAddress = pickupLocations.some(loc => loc.address === query);
    if (isPresetAddress) {
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

  useEffect(() => {
    const reserveSection = document.getElementById('reserve');
    const footerElement = footerRef.current;

    if (!reserveSection && !footerElement) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (reserveSection && entry.target === reserveSection) {
            setIsInReserveSection(entry.isIntersecting);
          }
          if (footerElement && entry.target === footerElement) {
            setIsFooterVisible(entry.isIntersecting);
          }
        });
      },
      {
        threshold: 0.7, // Trigger when 70% of the target is visible
      }
    );

    if (reserveSection) {
      observer.observe(reserveSection);
    }
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      setStatus('idle');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      carModel: selectedCar.model,
      carPricePerDay: selectedCar.price,
      rentalDays,
      totalPrice,
      location,
      address: addressInput,
      startDate: startDate?.toISOString() ?? null,
      endDate: endDate?.toISOString() ?? null,
      customCoordinates,
    };

    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || data?.success !== true) {
        throw new Error(data?.error ?? 'Notification request failed');
      }

      // Track successful form submission
      trackFormSubmission('homepage_inquiry');
      trackBookingInquiry({
        car_id: selectedCar.id,
        car_name: selectedCar.model,
        start_date: startDate?.toISOString() ?? '',
        end_date: endDate?.toISOString() ?? '',
        pickup_location: location,
        dropoff_location: location, // Same as pickup for now
        contact_info: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        }
      });

      setStatus('success');
    } catch (error) {
      console.error('Reservation submission error:', error);
      setStatus('idle');
    }
  };

  const formatDate = (date: Date | null) =>
    date ? format(date, 'MMM d, h:mm aa') : '--';

  const scrollToReserve = () => {
    const reserveSection = document.getElementById('reserve');
    reserveSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToStep1 = () => {
    const step1Section = document.getElementById('book-form');
    step1Section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg">
                Book a Tesla in Miami
              </h3>
              <p className="text-white/95 text-xl sm:text-2xl mb-7 max-w-2xl mx-auto drop-shadow-md">
                Safety is more important than ever
              </p>
              <div className="flex justify-center">
                <button
                  onClick={scrollToStep1}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-lg"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 1 – When */}
      <section id="book-form" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-red-600 tracking-widest uppercase mb-3">Step 1 of 4</p>
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
                      setHasInteracted(true);
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
                      setHasInteracted(true);
                    }}
                    minDate={startDate ?? new Date()}
                    className="w-full"
                  />
                  {errors.endDate && <p className="text-sm text-red-600 mt-1">{errors.endDate}</p>}
                </div>
              </div>
              {/* <p className="text-sm text-gray-500">
                Need to tweak the schedule later? Just text us—we&apos;ll take care of it before delivery.
              </p> */}
            </div>
          </div>
        </div>
      </section>

      {/* Step 2 Models */}
      <section id="models" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-red-600 tracking-widest uppercase mb-3">Step 2 of 4</p>
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
                onClick={() => {
                  setSelectedCarId(car.id);
                  setHasInteracted(true);
                  trackCarSelection(car.id, car.model);
                }}
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
                <p className="text-sm text-gray-600 mb-1 min-h-[56px]">{car.description}</p>
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
            <p className="text-sm font-semibold tracking-widest uppercase text-red-600 mb-3">Step 3 of 4</p>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Where?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose a location.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
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
                        setHasInteracted(true);
                        resetStatusIfNeeded();
                      }}
                      onFocus={() => {
                        const query = addressInput.trim();
                        // Don't open suggestions if it's a preset location address
                        const isPresetAddress = pickupLocations.some(loc => loc.address === query);
                        if (query.length >= 3 && (suggestions.length || suggestionError) && !isPresetAddress) {
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
                {/* <p className="text-sm text-gray-500">
                  Need to tweak the drop-off later? Just let us know and we&apos;ll confirm before delivery.
                </p> */}
              </div>

              <div className="overflow-hidden">
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
        </div>
      </section>

      {/* Step 4 – Reserve */}
      <section id="reserve" className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-red-400 tracking-widest uppercase mb-3">Step 4 of 4</p>
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
                  <div className="text-right">
                    <div className="inline-flex flex-col items-end bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 px-5 py-3 rounded-2xl shadow-sm">
                      <div className="flex items-center gap-2 text-gray-900">
                        <span className="text-lg font-bold">${selectedCar.price}</span>
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-sm font-semibold text-gray-600">{rentalDays} {rentalDays === 1 ? 'day' : 'days'}</span>
                      </div>
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-2.5"></div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-0.5">Total</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                          ${totalPrice.toLocaleString()}
                  </span>
                      </div>
                    </div>
                  </div>
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
                {/* <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 text-sm text-gray-600">
                  We&apos;ll reach out to confirm the details and share arrival instructions.
                </div> */}
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
                  Thanks! We will reach out to confirm the details and share arrival instructions.
                </div>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Mobile sticky summary */}
      {!isInReserveSection && !isFooterVisible && hasInteracted && (
      <div
        className="fixed inset-x-0 bottom-0 z-50 px-2 sm:px-4 pb-2 sm:pb-4 md:hidden pointer-events-none"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.5rem)' }}
      >
        <div className="w-full">
          <div className="pointer-events-auto bg-gray-900 text-white rounded-2xl shadow-2xl border border-gray-800/50 px-4 sm:px-5 py-3 sm:py-4">
            <div className="flex items-start justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0 space-y-2">
                <p className="text-base sm:text-lg font-semibold truncate">{selectedCar.model}</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-300 truncate">
                  <svg className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">{formatDate(startDate)}</span>
                  <span className="text-gray-500">→</span>
                  <span className="truncate">{formatDate(endDate)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-300 truncate">
                  <svg className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate">
                    {location === 'Custom Pin'
                      ? addressInput || 'Pending'
                      : pickupLocations.find(loc => loc.value === location)?.address || addressInput || 'Pending'}
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0 flex flex-col items-end gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base font-bold text-white">${totalPrice.toLocaleString()}</span>
                  <span className="text-xs text-gray-400">total</span>
                </div>
                <button
                  type="button"
                  onClick={scrollToReserve}
                  className="bg-white text-gray-900 font-semibold px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl shadow-lg shadow-gray-900/20 text-sm sm:text-base whitespace-nowrap"
                  aria-label="Scroll to reservation form"
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      <Footer ref={footerRef} />
    </main>
  );
}
