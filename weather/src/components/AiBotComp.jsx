'use client'
import { useState } from 'react';
import { aiBotAction } from '@/serverActions/aiBot';

export default function AiBotComp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isWeatherQuestion = (query) => {
    const weatherKeywords = [
      'weather', 'temperature', 'forecast', 'rain', 'snow', 'sunny', 'cloudy',
      'humidity', 'wind', 'storm', 'thunder', 'lightning', 'precipitation',
      'climate', 'meteorological', 'barometric', 'atmospheric'
    ];
    
    const queryLower = query.toLowerCase();
    return weatherKeywords.some(keyword => queryLower.includes(keyword));
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    const userMessage = searchQuery.trim();
    setChatHistory(prev => [...prev, { type: 'user', content: userMessage }]);
    setSearchQuery('');
    
    setIsLoading(true);
    
    if (isWeatherQuestion(userMessage)) {
      const response = await aiBotAction({ userPrompt: userMessage });
      setChatHistory(prev => [...prev, { type: 'bot', content: response }]);
    } else {
      setChatHistory(prev => [...prev, { 
        type: 'bot', 
        content: "I can only help with weather-related questions. Please ask me about weather, temperature, forecast, or other weather conditions." 
      }]);
    }
    
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-black/40 backdrop-blur-sm rounded-2xl shadow-xl p-4">
      {/* Header with chat bubble icon and title */}
      <div className="flex items-center mb-4 pb-3 border-b border-gray-600/30">
        <div className="w-8 h-8 bg-blue-500/80 rounded-full flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-white/90">Weather AI</h2>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto mb-4">
        {chatHistory.length === 0 && (
          <div className="text-center text-gray-400/60 mb-4">
            Ask me about the weather in any location!
          </div>
        )}
        {chatHistory.map((message, index) => (
          <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block px-4 py-2 rounded-lg ${
              message.type === 'user' 
                ? 'bg-black/50 text-gray-100/90' 
                : 'bg-black/30 text-gray-200/80'
            }`}>
              <p className="whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500/50"></div>
            <span className="ml-2 text-gray-300/60">Thinking...</span>
          </div>
        )}
      </div>

      <div className="flex-none flex flex-row gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask about the weather..."
          className="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500/30 focus:border-transparent bg-black/30 text-gray-100/90 placeholder-gray-400/50"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading || !searchQuery.trim()}
          className="px-6 py-2 bg-black/50 text-white/90 rounded-lg hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-gray-500/30 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}