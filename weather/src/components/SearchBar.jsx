'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SearchBar({ currentLocation, setCurrentLocation, setWeatherData, baseColor, setIsLoading, setActiveTab }) {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const handleSearch = async () => {
    const location = document.getElementById('location-input').value.trim();
    if (!location) return;

    setIsSearching(true);
    try {
      const searchResponse = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${encodeURIComponent(location)}`
      );
      const searchData = await searchResponse.json();

      if (searchData && searchData.length > 0) {
        const firstResult = searchData[0];
        const newLocation = {
          name: `${firstResult.name}, ${firstResult.country}`,
          lat: firstResult.lat,
          lon: firstResult.lon
        };
        setCurrentLocation(newLocation);
        await fetchWeather(newLocation.lat, newLocation.lon);
      }
    } catch (error) {
      console.error('Error searching location:', error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (currentLocation) {
      fetchWeather(currentLocation.lat, currentLocation.lon);
    }
  }, [currentLocation]);

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            name: "Your Current Location"
          };
          setCurrentLocation(newLocation);
          await fetchWeather(newLocation.lat, newLocation.lon);
          setIsLocating(false);
        },
        (error) => {
          alert("Unable to retrieve your location: " + error.message);
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const fetchWeather = async (lat, lon) => {
    try {
      setActiveTab("result")
      setIsLoading(true)
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=5&aqi=no&alerts=no`
      );
      const data = await response.json();
      setIsLoading(false)
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 items-center text-white"
    >
      {/* Glass Input Field */}
      <motion.div className="flex-1 relative">
        <input
          type="text"
          id="location-input"
          placeholder="Enter city or location"
          defaultValue={currentLocation.name}
          className={`
            w-full px-4 py-3 rounded-xl 
            bg-transparent
            backdrop-blur-2xl
            border border-white/20
            text-white placeholder-white/50
            focus:outline-none focus:border-white/40
            shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]
            transition-all duration-300
            z-10 relative
          `}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        
        {/* Input Field Glow */}
        <div className={`
          absolute inset-0 rounded-xl
          bg-gradient-to-r from-transparent via-white/30 to-transparent
          opacity-0 transition-opacity duration-300
          pointer-events-none
          input-focus:opacity-50
          -z-0
        `}></div>
      </motion.div>
  
      {/* iOS Glass Search Button */}
      <motion.button
        onClick={handleSearch}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`
          px-4 py-3 rounded-xl 
          bg-gradient-to-b from-white/20 to-white/10
          backdrop-blur-2xl
          border border-white/30 border-b-white/40
          shadow-[0_1px_2px_rgba(255,255,255,0.2)]
          transition-all duration-300
          relative overflow-hidden
          group
        `}
        disabled={isSearching}
      >
        {/* Button Inner Glow */}
        <div className={`
          absolute inset-0
          bg-gradient-to-r from-transparent via-white/20 to-transparent
          opacity-0 group-hover:opacity-40
          transition-opacity duration-300
          pointer-events-none
        `}></div>
        
        {/* Button Content */}
        <div className="flex items-center gap-2 relative z-10">
          {isSearching ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                <path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22ZM2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor"/>
              </svg>
              <span>Searching</span>
            </>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#eeeeff">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
      </motion.button>
  
      {/* iOS Glass Location Button */}
      <motion.button
        onClick={handleCurrentLocation}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`
          px-4 py-3 rounded-xl 
          bg-gradient-to-b from-white/20 to-white/10
          backdrop-blur-2xl
          border border-white/30 border-b-white/40
          shadow-[0_1px_2px_rgba(255,255,255,0.2)]
          transition-all duration-300
          relative overflow-hidden
          group
        `}
        disabled={isLocating}
      >
        {/* Button Inner Glow */}
        <div className={`
          absolute inset-0
          bg-gradient-to-r from-transparent via-white/20 to-transparent
          opacity-0 group-hover:opacity-40
          transition-opacity duration-300
          pointer-events-none
        `}></div>
        
        {/* Button Content */}
        <div className="flex items-center gap-2 relative z-10">
          {isLocating ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                <path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22ZM2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor"/>
              </svg>
              <span>Locating</span>
            </>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#eeeeff">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </div>
      </motion.button>
    </motion.div>
  )
}