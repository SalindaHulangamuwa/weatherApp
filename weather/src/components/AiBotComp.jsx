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

      <div className="flex-none">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask about the weather..."
          className="w-3/5 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500/30 focus:border-transparent bg-black/30 text-gray-100/90 placeholder-gray-400/50 inline-block mr-2"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading || !searchQuery.trim()}
          className="px-6 py-2 bg-black/50 text-white/90 rounded-lg hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-gray-500/30 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow inline-block"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}