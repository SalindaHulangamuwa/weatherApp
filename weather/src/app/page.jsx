'use client';
import Weather from './Weather'
import ChatBubble from '../components/ChatBubble'
import { useState } from 'react';

export default function Home() {
  const [weatherCategory, setWeatherCategory] = useState('unknown');
  return (
    <>
      <Weather setWeatherCategory={setWeatherCategory} />
      <ChatBubble weatherCategory={weatherCategory} />
    </>
  )
}