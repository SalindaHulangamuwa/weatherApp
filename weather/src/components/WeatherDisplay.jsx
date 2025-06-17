import CurrentWeather from './CurrentWeather'
import HourlyForecast from './HourlyForecast'
import DailyForecast from './DailyForecast'

export default function WeatherDisplay({ weatherData, textColor, baseColor, isLoading }) {
  if (!weatherData) {
    return (
      <div className="text-center py-12 text-white">
        Enter a location to see weather information
      </div>
    )
  }

  const hasForecast = weatherData.forecast?.forecastday?.length > 0;
  const allHourlyData = hasForecast 
    ? weatherData.forecast.forecastday.flatMap(day => day.hour)
    : [];

  return (
    <div className="space-y-8">
      <CurrentWeather data={weatherData} textColor={textColor} baseColor={baseColor} isLoading={isLoading} />
      {hasForecast && (
        <>
          <HourlyForecast data={allHourlyData} textColor={textColor} isLoading={isLoading} />
          <DailyForecast data={weatherData.forecast.forecastday} textColor={textColor} isLoading={isLoading} />
        </>
      )}
    </div>
  )
}