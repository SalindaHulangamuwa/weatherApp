'use client';

import { useState } from 'react';
import AiBotComp from './AiBotComp';

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 lg:left-auto lg:right-6 z-50">
      <button
        onClick={toggleChat}
        className="bg-black/90 backdrop-blur-sm text-white rounded-full p-3 sm:p-4 shadow-lg hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:ring-offset-2 flex items-center gap-1 sm:gap-2"
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
    </div>
  );
} 