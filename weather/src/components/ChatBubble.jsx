'use client';

import { useState } from 'react';
import AiBotComp from './AiBotComp';

const weatherColors = {
  rainy: {
    bg: 'bg-cyan-500',
    shadow: 'shadow-[0_0_16px_4px_rgba(147,197,253,0.8)]',
    text: 'text-blue-100',
  },
  stormy: {
    bg: 'bg-purple-400',
    shadow: 'shadow-[0_0_16px_4px_rgba(216,180,254,0.8)]',
    text: 'text-purple-100',
  },
  cloudy: {
    bg: 'bg-gray-100',
    shadow: 'shadow-[0_0_16px_4px_rgba(209,213,219,0.8)]',
    text: 'text-gray-700',
  },
  sunny: {
    bg: 'bg-amber-400',
    shadow: 'shadow-[0_0_16px_4px_rgba(252,211,77,0.8)]',
    text: 'text-amber-100',
  },
  snowy: {
    bg: 'bg-cyan-400',
    shadow: 'shadow-[0_0_16px_4px_rgba(165,243,252,0.8)]',
    text: 'text-cyan-100',
  },
  foggy: {
    bg: 'bg-slate-400',
    shadow: 'shadow-[0_0_16px_4px_rgba(203,213,225,0.8)]',
    text: 'text-slate-100',
  },
  unknown: {
    bg: 'bg-amber-400',
    shadow: 'shadow-[0_0_16px_4px_rgba(254,215,170,0.8)]',
    text: 'text-amber-100',
  },
};

export default function ChatBubble({ weatherCategory = 'unknown' }) {
  const [isOpen, setIsOpen] = useState(false);
  const color = weatherColors[weatherCategory] || weatherColors.unknown;

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 lg:left-auto lg:right-6 z-50">
      <button
        onClick={toggleChat}
        className={`${color.bg} ${color.text} rounded-full p-3 sm:p-4 ${color.shadow} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 flex items-center gap-1 sm:gap-2 transition-colors animate-neon-glow`}
        style={{ animation: 'neon-glow 1.8s infinite alternate' }}
      >
        {isOpen ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="text-xs sm:text-sm font-medium hidden sm:inline">Close</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-xs sm:text-sm font-medium hidden sm:inline">Ask AI</span>
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-16 sm:bottom-20 left-0 lg:left-auto lg:right-0 w-[calc(100vw-2rem)] sm:w-80 h-80 sm:h-96 bg-black/80 backdrop-blur-md rounded-lg shadow-xl overflow-hidden">
          <div className="h-full w-full">
            <AiBotComp />
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes neon-glow {
          0%, 100% {
            box-shadow: 0 0 16px 4px rgba(255,255,255,0.2), 0 0 32px 8px rgba(0,0,0,0.05);
            filter: brightness(1);
          }
          50% {
            box-shadow: 0 0 32px 12px rgba(255,255,255,0.7), 0 0 48px 16px rgba(0,0,0,0.1);
            filter: brightness(1);
          }
        }
      `}</style>
    </div>
  );
} 