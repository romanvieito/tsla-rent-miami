'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';
import dynamic from 'next/dynamic';

// Static libraries array to prevent LoadScript reloading
const GOOGLE_MAPS_LIBRARIES: ("places" | "marker")[] = ['places', 'marker'];

// Advanced Marker Element Component
interface AdvancedMarkerProps {
  position: google.maps.LatLngLiteral;
  map?: google.maps.Map;
  icon?: google.maps.Symbol | google.maps.Icon | string;
  onClick?: () => void;
  showInfoWindow?: boolean;
  infoWindowContent?: React.ReactNode;
  onCloseInfoWindow?: () => void;
}

function AdvancedMarker({
  position,
  map,
  icon,
  onClick,
  showInfoWindow,
  infoWindowContent,
  onCloseInfoWindow
}: AdvancedMarkerProps) {
  const [marker, setMarker] = useState<google.maps.marker.AdvancedMarkerElement | null>(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    if (!map || !window.google?.maps?.marker?.AdvancedMarkerElement) return;

    // Create custom marker element
    const markerElement = document.createElement('div');
    markerElement.style.width = '20px';
    markerElement.style.height = '20px';
    markerElement.style.borderRadius = '50%';
    markerElement.style.cursor = 'pointer';

    // Apply icon styles if provided
    if (icon && typeof icon === 'object' && 'fillColor' in icon) {
      const iconOptions = icon as any;
      markerElement.style.backgroundColor = iconOptions.fillColor || '#ef4444';
      markerElement.style.border = `${iconOptions.strokeWeight || 2}px solid ${iconOptions.strokeColor || '#ffffff'}`;
      markerElement.style.width = `${iconOptions.scale || 10}px`;
      markerElement.style.height = `${iconOptions.scale || 10}px`;
    } else {
      // Default styling
      markerElement.style.backgroundColor = '#ef4444';
      markerElement.style.border = '2px solid #ffffff';
    }

    const advancedMarker = new google.maps.marker.AdvancedMarkerElement({
      position,
      map,
      content: markerElement,
    });

    if (onClick) {
      advancedMarker.addListener('click', onClick);
    }

    setMarker(advancedMarker);

    return () => {
      if (advancedMarker) {
        advancedMarker.map = null;
      }
      if (infoWindow) {
        infoWindow.close();
      }
    };
  }, [map, position, icon, onClick]);

  useEffect(() => {
    if (infoWindowContent && !infoWindow) {
      const newInfoWindow = new google.maps.InfoWindow();

      // Add close listener
      if (onCloseInfoWindow) {
        newInfoWindow.addListener('closeclick', onCloseInfoWindow);
      }

      setInfoWindow(newInfoWindow);
    }
  }, [infoWindowContent, infoWindow, onCloseInfoWindow]);

  useEffect(() => {
    if (infoWindow && infoWindowContent && marker) {
      // Create a container for React content
      const container = document.createElement('div');
      container.className = 'text-sm';

      // Simple approach: render the content as HTML
      // In a production app, you'd want to use ReactDOM.render or portals
      if (React.isValidElement(infoWindowContent)) {
        // For now, we'll set the content directly
        infoWindow.setContent(infoWindowContent as any);
      }

      if (showInfoWindow) {
        infoWindow.open({
          anchor: marker,
          map: map,
        });
      } else {
        infoWindow.close();
      }
    }
  }, [infoWindow, infoWindowContent, showInfoWindow, marker, map]);

  return null; // AdvancedMarkerElement handles its own DOM
}

// Dynamically import Leaflet components for fallback
const LeafletMap = dynamic(() => import('./LeafletMapFallback'), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-gray-100 animate-pulse" />
  ),
});

type Location = {
  value: string;
  address: string;
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
      // Determine center based on selection
      let newCenter: { lat: number; lng: number } = DEFAULT_CENTER;
      const isCustom = selectedLocation === 'Custom Pin';
      
      if (isCustom && customCoordinates) {
        newCenter = { lat: customCoordinates.lat, lng: customCoordinates.lng };
      } else {
        const loc = locations.find(loc => loc.value === selectedLocation);
        if (loc) {
          newCenter = { lat: loc.latitude, lng: loc.longitude };
        }
      }
      
      mapRef.current.panTo(newCenter);
      // Adjust zoom level for better visibility of selected location
      mapRef.current.setZoom(DEFAULT_ZOOM);
      
      // Show info window for selected preset location to highlight it on the map
      const loc = locations.find(loc => loc.value === selectedLocation);
      if (loc && !isCustom) {
        setInfoWindowOpen(selectedLocation);
      }
    }
  }, [selectedLocation, customCoordinates, locations]);

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      onCustomSelect(e.latLng.lat(), e.latLng.lng());
    }
  }, [onCustomSelect]);

  // Guard against rendering if google maps is not available
  if (typeof window === 'undefined' || !window.google?.maps) {
    return (
      <div className="h-[300px] md:h-[500px] w-full rounded-2xl bg-gray-100 animate-pulse flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  // Create marker icon options
  const getMarkerIcon = (isSelected: boolean, isCustom: boolean = false) => {
    // Ensure google.maps is loaded before accessing SymbolPath
    if (typeof window === 'undefined' || !window.google?.maps?.SymbolPath) {
      return undefined; // Return undefined to use default marker
    }

    try {
      if (isCustom) {
        return {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: '#3b82f6',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3,
        };
      }
      return {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: isSelected ? 14 : 10,
        fillColor: isSelected ? '#10b981' : '#ef4444',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: isSelected ? 3 : 2,
      };
    } catch (error) {
      console.warn('Error creating marker icon, using default:', error);
      return undefined;
    }
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
          <AdvancedMarker
            key={location.value}
            position={{ lat: location.latitude, lng: location.longitude }}
            map={mapRef.current || undefined}
            icon={getMarkerIcon(isSelected)}
            onClick={() => {
              setInfoWindowOpen(location.value);
              onSelect(location.value);
            }}
            showInfoWindow={infoWindowOpen === location.value}
            infoWindowContent={
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{location.value}</p>
                <p className="text-gray-600">{location.address}</p>
              </div>
            }
            onCloseInfoWindow={() => setInfoWindowOpen(null)}
          />
        );
      })}

      {/* Render custom location marker if exists */}
      {customCoordinates && (
        <AdvancedMarker
          position={{ lat: customCoordinates.lat, lng: customCoordinates.lng }}
          map={mapRef.current || undefined}
          icon={getMarkerIcon(false, true)}
          onClick={() => {
            setInfoWindowOpen('Custom Pin');
            onSelect('Custom Pin');
          }}
          showInfoWindow={infoWindowOpen === 'Custom Pin'}
          infoWindowContent={
            <div className="text-sm">
              <p className="font-semibold text-gray-900">Custom Location</p>
              <p className="text-gray-600">
                {customCoordinates.lat.toFixed(4)}, {customCoordinates.lng.toFixed(4)}
              </p>
            </div>
          }
          onCloseInfoWindow={() => setInfoWindowOpen(null)}
        />
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
      <div className="h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden bg-gray-100 animate-pulse" />
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
    <div className="h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden">
      <LoadScript
        key={`google-maps-${apiKey}`}
        googleMapsApiKey={apiKey}
        libraries={GOOGLE_MAPS_LIBRARIES}
        onLoad={() => {
          if (typeof window !== 'undefined' && window.google?.maps) {
            setIsGoogleReady(true);
          }
        }}
        onError={(error) => {
          console.warn('Google Maps failed to load:', error);
          setGoogleLoadError(true);
          setUseGoogleMaps(false);
        }}
        loadingElement={
          <div className="h-[300px] md:h-[500px] w-full rounded-2xl bg-gray-100 animate-pulse" />
        }
      >
        {isGoogleReady && !googleLoadError ? (
          <GoogleMapsMap {...props} apiKey={apiKey} />
        ) : (
          <div className="h-[300px] md:h-[500px] w-full rounded-2xl bg-gray-100 animate-pulse" />
        )}
      </LoadScript>
    </div>
  );
}
