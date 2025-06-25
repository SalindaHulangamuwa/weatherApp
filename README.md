# 🌤️ Weather App

A modern, interactive weather application built with Next.js 15, featuring real-time weather data, AI-powered weather assistance, interactive maps, and dynamic weather animations.

![Weather App Preview](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-black?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🌍 **Interactive Weather Display**
- **Real-time Weather Data**: Current conditions, temperature, humidity, wind speed, and more
- **5-Day Forecast**: Detailed daily and hourly weather predictions
- **Dynamic Theming**: Color schemes and backgrounds that change based on weather conditions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🎨 **Immersive Weather Animations**
- **Rain Animation**: Animated raindrops falling during rainy weather
- **Snow Animation**: Drifting snowflakes for snowy conditions
- **Cloud Animation**: Floating clouds for cloudy/foggy weather
- **Sun Animation**: Pulsing sun with rotating rays for sunny weather
- **Lightning Animation**: Flash effects during stormy weather

### 🤖 **AI Weather Assistant**
- **Intelligent Chat Interface**: Ask weather-related questions in natural language
- **Real-time Search Integration**: Powered by LangChain and Tavily search
- **Weather-Specific Responses**: AI trained to handle weather queries and provide detailed information
- **Context-Aware**: Understands weather terminology and location-based questions

### 🗺️ **Interactive Map**
- **Click-to-Select**: Click anywhere on the map to get weather for that location
- **Real-time Updates**: Map automatically centers on selected locations
- **OpenStreetMap Integration**: Free, open-source mapping solution
- **Smooth Animations**: Fluid transitions when changing locations

### 🔍 **Smart Location Features**
- **Search Any Location**: Enter city names, coordinates, or landmarks
- **Current Location**: Automatic geolocation detection
- **Location History**: Easy access to previously searched locations
- **Auto-complete**: Intelligent location suggestions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- API keys for weather and AI services

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Weather API (WeatherAPI.com)
   NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key_here
   
   # OpenAI API (for AI assistant)
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Tavily Search API (for AI search capabilities)
   TAVILY_SEARCH_API_KEY=your_tavily_api_key_here
   ```

4. **Get API Keys**
   - **WeatherAPI.com**: Sign up at [weatherapi.com](https://www.weatherapi.com/) for free weather data
   - **OpenAI**: Get API key from [platform.openai.com](https://platform.openai.com/)
   - **Tavily**: Sign up at [tavily.com](https://tavily.com/) for search capabilities

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🛠️ Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **Tailwind CSS 4**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Leaflet.js**: Interactive maps

### Backend & AI
- **Next.js Server Actions**: Server-side API handling
- **LangChain**: AI/LLM framework for intelligent responses
- **OpenAI GPT**: Large language model for weather assistance
- **Tavily Search**: Real-time search integration

### APIs & Services
- **WeatherAPI.com**: Weather data and forecasts
- **OpenStreetMap**: Free mapping tiles
- **Geolocation API**: Browser-based location detection

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.js            # Root layout component
│   ├── page.jsx             # Main page component
│   └── Weather.jsx          # Main weather app component
├── components/
│   ├── AiBotComp.jsx        # AI chat interface
│   ├── ChatBubble.jsx       # Chat bubble component
│   ├── CurrentWeather.jsx   # Current weather display
│   ├── DailyForecast.jsx    # Daily forecast component
│   ├── HourlyForecast.jsx   # Hourly forecast component
│   ├── MapView.jsx          # Interactive map component
│   ├── SearchBar.jsx        # Location search interface
│   └── WeatherDisplay.jsx   # Weather display wrapper
└── serverActions/
    └── aiBot.ts             # AI assistant server action
```

## 🎯 Key Features Explained

### Dynamic Weather Theming
The app automatically changes its visual theme based on weather conditions:
- **Rainy**: Blue/cyan color scheme with rain animations
- **Stormy**: Purple theme with lightning effects
- **Sunny**: Amber/yellow theme with sun animations
- **Cloudy**: Gray theme with floating clouds
- **Snowy**: Cyan theme with snowflake animations
- **Foggy**: Slate theme with cloud effects

### AI Weather Assistant
The AI assistant can:
- Answer weather-related questions in natural language
- Provide detailed weather explanations
- Search for real-time weather information
- Handle location-specific queries
- Explain weather phenomena and terminology

### Interactive Map Features
- Click anywhere on the map to select a location
- Automatic weather data fetching for selected locations
- Smooth map transitions and animations
- Responsive design for all screen sizes

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

### Environment Variables for Production
Make sure to set the following environment variables in your deployment platform:
- `NEXT_PUBLIC_WEATHER_API_KEY`
- `OPENAI_API_KEY`
- `TAVILY_SEARCH_API_KEY`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [WeatherAPI.com](https://www.weatherapi.com/) for weather data
- [OpenStreetMap](https://www.openstreetmap.org/) for mapping
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include your environment details and error messages

---

**Built with ❤️ using Next.js, React, and modern web technologies**
