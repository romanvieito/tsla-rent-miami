'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
const createIcon = (color: string = '#000000') => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>
      <div style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        width: 8px;
        height: 8px;
        background-color: white;
        border-radius: 50%;
      "></div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};

const defaultIcon = createIcon('#ef4444'); // red-500
const selectedIcon = createIcon('#10b981'); // emerald-500
const customIcon = createIcon('#3b82f6'); // blue-500

// Component to handle map click events
function MapClickHandler({
  onMapClick,
}: {
  onMapClick: (lat: number, lng: number) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const handleClick = (e: L.LeafletMouseEvent) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    };

    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [map, onMapClick]);

  return null;
}

// Component to center map on selected location
function MapCenter({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [map, center]);

  return null;
}

type Location = {
  value: string;
  description: string;
  latitude: number;
  longitude: number;
};

type LeafletMapFallbackProps = {
  locations: Location[];
  selectedLocation: string;
  customCoordinates?: { lat: number; lng: number } | null;
  onSelect: (location: string) => void;
  onCustomSelect: (lat: number, lng: number) => void;
};

export default function LeafletMapFallback({
  locations,
  selectedLocation,
  customCoordinates,
  onSelect,
  onCustomSelect,
}: LeafletMapFallbackProps) {
  const mapRef = useRef<L.Map | null>(null);

  // Find selected location coordinates
  const selectedLoc = locations.find(loc => loc.value === selectedLocation);
  const isCustomSelected = selectedLocation === 'Custom Pin';

  // Determine map center
  const getMapCenter = (): [number, number] => {
    if (isCustomSelected && customCoordinates) {
      return [customCoordinates.lat, customCoordinates.lng];
    }
    if (selectedLoc) {
      return [selectedLoc.latitude, selectedLoc.longitude];
    }
    // Default to Miami center
    return [25.7617, -80.1918];
  };

  const center = getMapCenter();

  // Miami bounds: restrict map to Miami area
  // North: Aventura, South: Key Biscayne, East: Beach, West: Airport area
  const miamiBounds = L.latLngBounds(
    [25.6, -80.35], // Southwest corner
    [25.95, -80.05] // Northeast corner
  );

  return (
    <div className="h-[500px] w-full rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
      <MapContainer
        center={center}
        zoom={11}
        minZoom={10}
        maxZoom={16}
        maxBounds={miamiBounds}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCenter center={center} />
        <MapClickHandler onMapClick={onCustomSelect} />

        {/* Render predefined location markers */}
        {locations.map(location => {
          const isSelected = location.value === selectedLocation && !isCustomSelected;
          return (
            <Marker
              key={location.value}
              position={[location.latitude, location.longitude]}
              icon={isSelected ? selectedIcon : defaultIcon}
              eventHandlers={{
                click: () => {
                  onSelect(location.value);
                },
              }}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">{location.value}</p>
                  <p className="text-gray-600">{location.description}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Render custom location marker if exists */}
        {customCoordinates && (
          <Marker
            position={[customCoordinates.lat, customCoordinates.lng]}
            icon={customIcon}
            eventHandlers={{
              click: () => {
                onSelect('Custom Pin');
              },
            }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">Custom Location</p>
                <p className="text-gray-600">
                  {customCoordinates.lat.toFixed(4)}, {customCoordinates.lng.toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

