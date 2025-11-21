'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { LoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet components for fallback
const LeafletMap = dynamic(() => import('./LeafletMapFallback'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-gray-100 animate-pulse" />
  ),
});

type Location = {
  value: string;
  description: string;
  latitude: number;
  longitude: number;
};

type LocationMapProps = {
  locations: Location[];
  selectedLocation: string;
  customCoordinates?: { lat: number; lng: number } | null;
  onSelect: (location: string) => void;
  onCustomSelect: (lat: number, lng: number) => void;
};

const DEFAULT_CENTER = { lat: 25.7617, lng: -80.1918 }; // Miami center
const DEFAULT_ZOOM = 11;
const MIAMI_BOUNDS = {
  north: 25.95,
  south: 25.6,
  east: -80.05,
  west: -80.35,
};

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

// Inner component that uses Google Maps (only renders after LoadScript loads)
function GoogleMapsMap({
  locations,
  selectedLocation,
  customCoordinates,
  onSelect,
  onCustomSelect,
  apiKey,
}: LocationMapProps & { apiKey: string }) {
  const [infoWindowOpen, setInfoWindowOpen] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  // Find selected location coordinates
  const selectedLoc = locations.find(loc => loc.value === selectedLocation);
  const isCustomSelected = selectedLocation === 'Custom Pin';

  // Determine map center
  const getMapCenter = (): { lat: number; lng: number } => {
    if (isCustomSelected && customCoordinates) {
      return { lat: customCoordinates.lat, lng: customCoordinates.lng };
    }
    if (selectedLoc) {
      return { lat: selectedLoc.latitude, lng: selectedLoc.longitude };
    }
    return DEFAULT_CENTER;
  };

  const center = getMapCenter();

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;

    // Restrict map bounds to Miami area
    const restriction: google.maps.MapRestriction = {
      latLngBounds: MIAMI_BOUNDS,
      strictBounds: true,
    };
    map.setOptions({
      restriction,
      minZoom: 10,
      maxZoom: 16,
    });

    // Center on selected location
    map.setCenter(center);
    map.setZoom(DEFAULT_ZOOM);
  }, [center]);

  // Effect to recenter map when selected location changes
  useEffect(() => {
    if (mapRef.current) {
      const newCenter = getMapCenter();
      mapRef.current.panTo(newCenter);
      // Optional: adjust zoom level for better visibility
      mapRef.current.setZoom(DEFAULT_ZOOM);
    }
  }, [selectedLocation, customCoordinates]);

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      onCustomSelect(e.latLng.lat(), e.latLng.lng());
    }
  }, [onCustomSelect]);

  // Create marker icon options
  const getMarkerIcon = (isSelected: boolean, isCustom: boolean = false) => {
    if (isCustom) {
      return {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: '#3b82f6',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 3,
      };
    }
    return {
      path: google.maps.SymbolPath.CIRCLE,
      scale: isSelected ? 14 : 10,
      fillColor: isSelected ? '#10b981' : '#ef4444',
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: isSelected ? 3 : 2,
    };
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={DEFAULT_ZOOM}
      onLoad={onMapLoad}
      onClick={handleMapClick}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
      }}
    >
      {/* Render predefined location markers */}
      {locations.map(location => {
        const isSelected = location.value === selectedLocation && !isCustomSelected;
        return (
          <Marker
            key={location.value}
            position={{ lat: location.latitude, lng: location.longitude }}
            icon={getMarkerIcon(isSelected)}
            animation={google.maps.Animation.DROP}
            onClick={() => {
              setInfoWindowOpen(location.value);
              onSelect(location.value);
            }}
          >
            {infoWindowOpen === location.value && (
              <InfoWindow
                onCloseClick={() => setInfoWindowOpen(null)}
                options={{
                  pixelOffset: new google.maps.Size(0, -10),
                }}
              >
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">{location.value}</p>
                  <p className="text-gray-600">{location.description}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}

      {/* Render custom location marker if exists */}
      {customCoordinates && (
        <Marker
          position={{ lat: customCoordinates.lat, lng: customCoordinates.lng }}
          icon={getMarkerIcon(false, true)}
          animation={google.maps.Animation.DROP}
          onClick={() => {
            setInfoWindowOpen('Custom Pin');
            onSelect('Custom Pin');
          }}
        >
          {infoWindowOpen === 'Custom Pin' && (
            <InfoWindow
              onCloseClick={() => setInfoWindowOpen(null)}
              options={{
                pixelOffset: new google.maps.Size(0, -10),
              }}
            >
              <div className="text-sm">
                <p className="font-semibold text-gray-900">Custom Location</p>
                <p className="text-gray-600">
                  {customCoordinates.lat.toFixed(4)}, {customCoordinates.lng.toFixed(4)}
                </p>
              </div>
            </InfoWindow>
          )}
        </Marker>
      )}
    </GoogleMap>
  );
}

export default function LocationMap(props: LocationMapProps) {
  const [useGoogleMaps, setUseGoogleMaps] = useState<boolean | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isGoogleReady, setIsGoogleReady] = useState(false);
  const [googleLoadError, setGoogleLoadError] = useState(false);

  // Check if Google Maps API key is available
  useEffect(() => {
    const checkGoogleMaps = async () => {
      // First check if NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set (preferred for client-side)
      const publicKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (publicKey && publicKey.trim().length > 0) {
        setApiKey(publicKey);
        setUseGoogleMaps(true);
        return;
      }

      // Fallback: check server-side API route
      try {
        const response = await fetch('/api/places/check-key');
        const data = await response.json();
        if (data.available) {
          // Fetch the API key from server (it's safe to expose as it should be restricted)
          const keyResponse = await fetch('/api/places/get-key');
          const keyData = await keyResponse.json();
          if (keyData.key) {
            setApiKey(keyData.key);
            setUseGoogleMaps(true);
            return;
          }
        }
        setUseGoogleMaps(false);
      } catch {
        setUseGoogleMaps(false);
      }
    };
    checkGoogleMaps();
  }, []);

  useEffect(() => {
    if (useGoogleMaps === false) {
      setIsGoogleReady(false);
    }
  }, [useGoogleMaps]);

  // While checking, show loading state
  if (useGoogleMaps === null) {
    return (
      <div className="h-[500px] w-full rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-gray-100 animate-pulse" />
    );
  }

  // If Google Maps is not available, use Leaflet fallback
  if (!useGoogleMaps || !apiKey) {
    return (
      <LeafletMap
        locations={props.locations}
        selectedLocation={props.selectedLocation}
        customCoordinates={props.customCoordinates}
        onSelect={props.onSelect}
        onCustomSelect={props.onCustomSelect}
      />
    );
  }

  // Use Google Maps
  return (
    <div className="h-[500px] w-full rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
      <LoadScript
        googleMapsApiKey={apiKey}
        onLoad={() => {
          if (typeof window !== 'undefined' && (window as typeof window & { google?: typeof google }).google?.maps) {
            setIsGoogleReady(true);
          }
        }}
        onError={() => {
          setGoogleLoadError(true);
          setUseGoogleMaps(false);
        }}
        loadingElement={
          <div className="h-[500px] w-full rounded-2xl bg-gray-100 animate-pulse" />
        }
      >
        {isGoogleReady && !googleLoadError ? (
          <GoogleMapsMap {...props} apiKey={apiKey} />
        ) : (
          <div className="h-[500px] w-full rounded-2xl bg-gray-100 animate-pulse" />
        )}
      </LoadScript>
    </div>
  );
}
