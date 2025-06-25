'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

export default function MapView({ currentLocation, setCurrentLocation }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      if (!mapRef.current) {
        mapRef.current = L.map('map').setView([currentLocation.lat, currentLocation.lon], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapRef.current)

        // Add initial marker
        markerRef.current = L.marker([currentLocation.lat, currentLocation.lon]).addTo(mapRef.current);

        mapRef.current.on('click', (e) => {
          const { lat, lng } = e.latlng;
          if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng]);
          } else {
            markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
          }
          setCurrentLocation({
            lat,
            lon: lng,
            name: `Selected Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`
          })
        })
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    }
  }, [])

  // Effect to update marker and center map when currentLocation changes
  useEffect(() => {
    if (mapRef.current && markerRef.current && currentLocation) {
      const L = require('leaflet');
      
      // Move marker to new location
      markerRef.current.setLatLng([currentLocation.lat, currentLocation.lon]);
      
      // Center map on new location with smooth animation
      mapRef.current.setView([currentLocation.lat, currentLocation.lon], 10, {
        animate: true,
        duration: 1
      });
    }
  }, [currentLocation]);

  return (
    <div className="relative h-full mt-6">
        <div
            id="map"
            className="absolute inset-0 z-0 rounded-lg overflow-hidden opacity-[0.7]"
        >
        </div>

        <div className="absolute bottom-4 right-4 z-10">
            {/* <button
            onClick={handleGetWeather}
            className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/30 text-black/50 border-2 border-black/30 rounded-lg hover:bg-white/20 transition-colors shadow-md"
            >
            Get Weather
            </button> */}
        </div>
    </div>
  );
}