'use client';

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SearchBar from '../components/SearchBar'
import WeatherDisplay from '../components/WeatherDisplay'
import MapView from '../components/MapView'

export default function Weather() {
  const [currentLocation, setCurrentLocation] = useState({
    name: "Colombo, Sri Lanka",
    lat: 6.9271,
    lon: 79.8612
  })

  const [weatherData, setWeatherData] = useState(null);
  const [weatherCategory, setWeatherCategory] = useState('unknown');
  const [mounted, setMounted] = useState(false);
  const [baseColor, setBaseColor] = useState({
    border: 'border-amber-200/70',
    shadow: 'shadow-[0_0_8px_2px_rgba(254,215,170,0.6)]',
    text: 'text-amber-200',
    divide: 'divide-amber-200/30'
  })
  const [isLoading, setIsLoading] = useState(false);

  const bg = {
    rainy: "https://media.istockphoto.com/id/512218646/photo/storm-sky-rain.jpg?s=612x612&w=0&k=20&c=RoUDM9BMwqW8NkPXjzAzlDKCHPOmdZhmmeT3jGA2EaM=",
    stormy: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzGVAji_hWtARRGW2a0KB4-e_5xBVToipA3A&s",
    cloudy: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr3ja_bhI-Kvy75688Mlu1FUdNRc1Pji4-Kg&s",
    sunny: "https://images.unsplash.com/photo-1572966101025-e199cab72196",
    snowy: "https://images.unsplash.com/photo-1491403865995-cda9c458c314",
    foggy: "https://images.unsplash.com/photo-1524435497396-7bc897fa8d97",
    unknown: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBWqPGoRiQ0Q5kmb1UDwi161IpVnoqyJo-XQ&s"
  }

  const weatherColors = {
    rainy: {
      border: 'border-cyan-500',
      shadow: 'shadow-[0_0_8px_6px_rgba(147,197,253,0.5)]',
      text: 'text-blue-100',
      divide: 'divide-blue-300/30'
    },
    stormy: {
      border: 'border-purple-400',
      shadow: 'shadow-[0_0_8px_6px_rgba(216,180,254,0.5)]',
      text: 'text-purple-100',
      divide: 'divide-purple-300/30'
    },
    cloudy: {
      border: 'border-gray-100',
      shadow: 'shadow-[0_0_8px_6px_rgba(209,213,219,0.5)]',
      text: 'text-gray-100',
      divide: 'divide-gray-300/30'
    },
    sunny: {
      border: 'border-amber-400',
      shadow: 'shadow-[0_0_8px_6px_rgba(252,211,77,0.5)]',
      text: 'text-amber-100',
      divide: 'divide-amber-300/30'
    },
    snowy: {
      border: 'border-cyan-400',
      shadow: 'shadow-[0_0_8px_6px_rgba(165,243,252,0.5)]',
      text: 'text-cyan-100',
      divide: 'divide-cyan-200/30'
    },
    foggy: {
      border: 'border-slate-400',
      shadow: 'shadow-[0_0_8px_6px_rgba(203,213,225,0.5)]',
      text: 'text-slate-100',
      divide: 'divide-slate-300/30'
    },
    unknown: {
      border: 'border-amber-400',
      shadow: 'shadow-[0_0_8px_6px_rgba(254,215,170,0.5)]',
      text: 'text-amber-100',
      divide: 'divide-amber-200/30'
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (weatherData?.current?.condition?.text) {
      const rawDescription = weatherData.current.condition.text;
      const category = getWeatherCategory(rawDescription);
      setWeatherCategory(category);
      setBaseColor(weatherColors[category]);
    }
  }, [weatherData])

  const [activeTab, setActiveTab] = useState('result');

  const backgroundImageStyle = mounted
    ? {
        backgroundImage: `url(${bg[weatherCategory]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }
    : {}

  return (
    <>
    <div className="min-h-screen relative overflow-hidden" style={backgroundImageStyle}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-0" />
      
      {/* Animated Weather Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Rain Animation */}
        {weatherCategory === 'rainy' && (
          <div className="rain-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="rain-drop"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Snow Animation */}
        {weatherCategory === 'snowy' && (
          <div className="snow-container">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="snowflake"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Cloud Animation */}
        {(weatherCategory === 'cloudy' || weatherCategory === 'foggy') && (
          <div className="cloud-container">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="cloud"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${20 + Math.random() * 10}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Sun Rays Animation */}
        {weatherCategory === 'sunny' && (
          <div className="sun-container">
            <div className="sun-circle" />
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="sun-ray"
                style={{
                  transform: `rotate(${i * 30}deg)`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Lightning Animation */}
        {weatherCategory === 'stormy' && (
          <div className="lightning-container">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="lightning"
                style={{
                  left: `${20 + i * 30}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10">
        <main className="container mx-auto px-4 h-screen w-full flex flex-col justify-center">
          <h1 className={`border-4 rounded-full mb-3 mt-2 ${baseColor.border} ${baseColor.shadow}`}></h1>
          <motion.div
            className={`h-[94vh] overflow-hidden w-full rounded-2xl bg-white/0`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className={`flex flex-col lg:flex-row ${baseColor.divide}`}>
              {activeTab === "result" && (
                <div className="lg:w-3/5 py-6 px-1 md:px-6 max-h-[93vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
                    <WeatherDisplay weatherData={weatherData} textColor={"text-white"} baseColor={baseColor} isLoading={isLoading} />
                </div>
              )}

              <div className={`lg:w-2/5 px-1 md:px-6 pt-4 flex-col h-[91vh] ${activeTab === "map" ? 'flex' : 'hidden'} md:flex`}>
                <h2 className={`${"text-white"} text-lg font-semibold mb-4 mt-2`}>Select Location</h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <SearchBar
                    currentLocation={currentLocation}
                    setCurrentLocation={setCurrentLocation}
                    setWeatherData={setWeatherData}
                    baseColor={baseColor}
                    setIsLoading={setIsLoading}
                    setActiveTab={setActiveTab}
                  />
                </motion.div>
                <MapView
                  currentLocation={currentLocation}
                  setCurrentLocation={setCurrentLocation}
                  setWeatherData={setWeatherData}
                />
              </div>

            </div>
          </motion.div>
        </main>
      </div>
      
      {/* Mobile Navigation */}
      <div className="z-20 fixed rounded-full m-2 flex bottom-0 right-0 p-1 lg:hidden">
        {activeTab === "result" ? (
            <motion.button 
                onClick={() => setActiveTab("map")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                flex items-center justify-center 
                px-4 py-1 mx-1 rounded-full
                bg-gradient-to-b from-white/20 to-white/10
                backdrop-blur-2xl
                border border-white/30 border-b-white/40
                shadow-[0_1px_2px_rgba(255,255,255,0.2)]
                text-white font-medium
                transition-all duration-300
                relative overflow-hidden
                group
                `}
            >
                {/* Inner Glow */}
                <div className={`
                absolute inset-0 rounded-full
                bg-gradient-to-r from-transparent via-white/20 to-transparent
                opacity-0 group-hover:opacity-40
                transition-opacity duration-300
                pointer-events-none
                `}></div>
                Map
            </motion.button>
        ):(
            <motion.button 
                onClick={() => setActiveTab("result")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                flex items-center justify-center 
                px-4 py-1 mx-1 rounded-full
                bg-gradient-to-b from-white/20 to-white/10
                backdrop-blur-2xl
                border border-white/30 border-b-white/40
                shadow-[0_1px_2px_rgba(255,255,255,0.2)]
                text-white font-medium
                transition-all duration-300
                relative overflow-hidden
                group
                `}
            >
                {/* Inner Glow */}
                <div className={`
                absolute inset-0 rounded-full
                bg-gradient-to-r from-transparent via-white/20 to-transparent
                opacity-0 group-hover:opacity-40
                transition-opacity duration-300
                pointer-events-none
                `}></div>
                Weather
            </motion.button>
        )}
      </div>
    </div>
    </>
  )
}

function getWeatherCategory(description = "") {
  const desc = description.toLowerCase()
  if (desc.includes('rain') || desc.includes('drizzle') || desc.includes('shower')) return 'rainy'
  if (desc.includes('cloud')) return 'cloudy'
  if (desc.includes('sun') || desc.includes('clear')) return 'sunny'
  if (desc.includes('snow') || desc.includes('sleet') || desc.includes('blizzard')) return 'snowy'
  if (desc.includes('fog') || desc.includes('mist') || desc.includes('haze')) return 'foggy'
  if (desc.includes('thunder') || desc.includes('storm')) return 'stormy'
  return 'unknown'
}