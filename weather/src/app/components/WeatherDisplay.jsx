import CurrentWeather from './CurrentWeather'
import HourlyForecast from './HourlyForecast'
import DailyForecast from './DailyForecast'

export default function WeatherDisplay({ weatherData, textColor, baseColor, isLoading }) {
  if (!weatherData) {
    return (
      <div className="text-center py-12 text-gray-500">
        Enter a location to see weather information
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <CurrentWeather data={weatherData} textColor={textColor} baseColor={baseColor} isLoading={isLoading} />
      <HourlyForecast data={weatherData.forecast.forecastday[0].hour} textColor={textColor} isLoading={isLoading} />
      <DailyForecast data={weatherData.forecast.forecastday} textColor={textColor} isLoading={isLoading} />
    </div>
  )
}