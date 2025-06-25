export default function DailyForecast({ data, textColor, isLoading }) {
    if (isLoading) {
        return (
            <div className={`bg-white/10 rounded-xl p-6 border ${textColor}/30 shadow-md`}>
                <h3 className={`text-xl font-semibold ${textColor} mb-6 flex items-center gap-2`}>
                    <div className="w-5 h-5 bg-white/20 rounded animate-pulse"></div>
                    <div className="h-6 w-32 bg-white/20 rounded animate-pulse"></div>
                </h3>
                <div className="space-y-4">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex items-center justify-between py-2 px-4">
                            <div className="w-36 h-6 bg-white/20 rounded animate-pulse"></div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 rounded-full animate-pulse"></div>
                                <div className="w-32 h-4 bg-white/20 rounded animate-pulse"></div>
                            </div>
                            <div className="w-24 space-y-2">
                                <div className="h-5 w-16 bg-white/20 rounded animate-pulse ml-auto"></div>
                                <div className="h-4 w-12 bg-white/20 rounded animate-pulse ml-auto"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    
    return (
      <div className={`shadow-xl shadow-[inset_0_1px_10px_rgba(255,255,255,0.2)] text-white bg-white/5 rounded-xl p-4 sm:p-6 ${textColor}/30 transition-shadow duration-300`}>
        <h3 className={`text-lg sm:text-xl font-semibold ${textColor} mb-4 sm:mb-6 flex items-center gap-2`}>
          <CalendarIcon textColor={textColor} />
          5-Day Forecast
        </h3>
        <div className="space-y-3 sm:space-y-4 max-h-[220px] sm:max-h-[300px] overflow-y-auto pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-white/10">
          {data.map((day, index) => {
            const date = new Date(day.date);
            const dateStr = date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })
  
            return (
              <div
                key={index}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 px-2 sm:px-4 transition-all duration-200 border-b border-white/30 ${textColor}/20`}
              >
                <div className={`w-32 sm:w-36 font-medium ${textColor}/90 text-sm sm:text-base`}>{dateStr}</div>
  
                <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
                  <img
                    src={day.day.condition.icon.replace("64x64", "128x128")}
                    alt={day.day.condition.text}
                    className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                  />
                  <div className={`w-24 sm:w-32 text-xs sm:text-sm ${textColor}/70 truncate`}>
                    {day.day.condition.text}
                  </div>
                </div>
  
                <div className="w-20 sm:w-24 text-right space-y-1">
                  <div className={`font-semibold ${textColor} text-base sm:text-lg`}>{day.day.maxtemp_c}°C</div>
                  <div className={`text-xs sm:text-sm ${textColor}/60`}>{day.day.mintemp_c}°C</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  
  function CalendarIcon({ textColor }) {
    return (
      <svg
        className={`w-5 h-5 ${textColor}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    )
  }