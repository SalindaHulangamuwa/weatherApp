'use client';

import { useState } from 'react';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';

const WeatherChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize the chat model
  const model = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0.7,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const prompt = ChatPromptTemplate.fromMessages([
        ['system', 'You are a helpful weather assistant. You can answer questions about weather conditions, forecasts, and provide weather-related advice.'],
        ...messages.map(msg => [msg.role === 'user' ? 'human' : 'assistant', msg.content]),
        ['human', input],
      ]);

      const chain = prompt.pipe(model);
      const response = await chain.invoke({});
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.content }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-md mx-auto bg-black/70 backdrop-blur-lg rounded-lg shadow-lg p-4 border border-white/20">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.role === 'user'
                ? 'bg-blue-600/30 ml-auto'
                : 'bg-gray-800/50'
            } max-w-[80%] text-white`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="bg-gray-800/50 p-3 rounded-lg max-w-[80%] text-white">
            Thinking...
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about the weather..."
          className="flex-1 p-2 bg-gray-800/50 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-white/50"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600/30 text-white rounded-lg hover:bg-blue-600/50 disabled:opacity-50 border border-white/20"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default WeatherChatbot; 