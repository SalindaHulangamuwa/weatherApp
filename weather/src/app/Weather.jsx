'use client';

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SearchBar from './components/SearchBar'
import WeatherDisplay from './components/WeatherDisplay'
import MapView from './components/MapView'
import WeatherChatbot from './components/WeatherChatbot'

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
  const [activeTab, setActiveTab] = useState('result');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

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

  const backgroundImageStyle = mounted
    ? {
        backgroundImage: `url(${bg[weatherCategory]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }
    : {}

  return (
    <div className="min-h-screen relative overflow-hidden" style={backgroundImageStyle}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-0" />

      <div className="relative z-10">
        <main className="container mx-auto px-4 h-screen w-full flex flex-col justify-center">
          <h1 className={`border-4 rounded-full mb-3 mt-2 ${baseColor.border} ${baseColor.shadow}`}></h1>
          <motion.div
            className={`min-h-[94vh] overflow-auto w-full rounded-2xl bg-white/0`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Desktop Tabs */}
            <div className="hidden lg:flex w-full mb-4 justify-center gap-4">
              {/* Removed Weather and Map desktop tabs */}
            </div>

            <div className={`flex flex-col lg:flex-row ${baseColor.divide}`}>
              {activeTab === "result" && (
                <div className="lg:w-3/5 py-6 px-1 md:px-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
                    <WeatherDisplay weatherData={weatherData} textColor={"text-white"} baseColor={baseColor} isLoading={isLoading} />
                </div>
              )}

              {activeTab === "chat" && (
                <div className="lg:w-3/5 py-6 px-1 md:px-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
                    <WeatherChatbot />
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
      <div className="z-20 fixed rounded-full m-2 flex bottom-0 right-0 p-1 lg:hidden space-x-2">
        <motion.button 
            onClick={() => setActiveTab("result")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
            flex items-center justify-center 
            px-4 py-1 rounded-full
            bg-gradient-to-b from-white/20 to-white/10
            backdrop-blur-2xl
            border border-white/30 border-b-white/40
            shadow-[0_1px_2px_rgba(255,255,255,0.2)]
            text-white font-medium
            transition-all duration-300
            relative overflow-hidden
            group
            ${activeTab === 'result' ? 'opacity-100' : 'opacity-70 hover:opacity-100'}
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

        <motion.button 
            onClick={() => setActiveTab("map")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
            flex items-center justify-center 
            px-4 py-1 rounded-full
            bg-gradient-to-b from-white/20 to-white/10
            backdrop-blur-2xl
            border border-white/30 border-b-white/40
            shadow-[0_1px_2px_rgba(255,255,255,0.2)]
            text-white font-medium
            transition-all duration-300
            relative overflow-hidden
            group
            ${activeTab === 'map' ? 'opacity-100' : 'opacity-70 hover:opacity-100'}
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
      </div>

      {/* Floating Chatbot Bubble */}
      <AnimatePresence>
        {isChatbotOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, x: 50, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-4 z-50 w-full max-w-sm lg:max-w-md"
          >
            <WeatherChatbot />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`
          fixed bottom-4 left-4 z-50 p-4 pr-6 rounded-full
          bg-black/70 text-white shadow-lg
          hover:bg-black/90
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          border border-white/20
          flex items-center space-x-2
          lg:left-auto lg:right-4
        `}
      >
        {isChatbotOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        {!isChatbotOpen && <span className="text-sm font-medium">Weather AI</span>}
      </motion.button>
    </div>
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