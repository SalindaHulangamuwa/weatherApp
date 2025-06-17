export default function HourlyForecast({ data, textColor, isLoading }) {
  const currentHour = new Date().getHours();
  const next12Hours = data.slice(currentHour, currentHour + 12);
  if (isLoading) {
    return (
      <div className={`bg-white/5 rounded-xl p-6 border ${textColor}/30 shadow-md`}>
        <h3 className={`text-xl font-semibold ${textColor} mb-6 flex items-center gap-2`}>
          <div className="w-5 h-5 bg-white/20 rounded-full animate-pulse"></div>
          <div className="h-6 w-32 bg-white/20 rounded animate-pulse"></div>
        </h3>
        <div className="grid grid-cols-5 overflow-x-auto pb-4 gap-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex-none w-full text-center p-3 rounded-lg bg-white/10 animate-pulse"
            >
              <div className="h-4 w-12 mx-auto bg-white/20 rounded"></div>
              <div className="w-12 h-12 mx-auto my-2 bg-white/20 rounded-full"></div>
              <div className="h-6 w-8 mx-auto bg-white/20 rounded"></div>
              <div className="h-3 w-16 mx-auto mt-1 bg-white/20 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`shadow-xl shadow-[inset_0_1px_10px_rgba(255,255,255,0.2)] text-white bg-white/5 rounded-xl p-6 ${textColor}/30 transition-shadow duration-300`}>
      <h3 className={`text-xl font-semibold ${textColor} mb-6 flex items-center gap-2`}>
        <ClockIcon textColor={textColor} />
        Hourly Forecast
      </h3>
      <div className={`flex md:grid
          ${next12Hours.length == 1 && 'grid-cols-1'}
          ${next12Hours.length == 2 && 'grid-cols-2'}
          ${next12Hours.length == 3 && 'grid-cols-3'}
          ${next12Hours.length == 4 && 'grid-cols-4'}
          ${next12Hours.length == 5 && 'grid-cols-5'}
          ${next12Hours.length >= 6 && 'grid-cols-6'}
          overflow-x-auto pb-4 gap-4 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-white/10`}>
        {next12Hours.map((hour, index) => (
          <div
          key={index}
          className={`
            relative flex-none w-26 md:w-full text-center p-3 rounded-lg 
            bg-white/5 hover:bg-white/10 transition-all duration-300 
            backdrop-blur-lg overflow-hidden
            border-t border-b border-transparent
            group hover:border-t-white/30 hover:border-b-white/20
          `}
        >
          {/* Glowing top border */}
          <div className={`
            absolute top-0 left-0 right-0 h-[1px] 
            bg-gradient-to-r from-transparent via-white/50 to-transparent
            opacity-70 group-hover:opacity-100
            transition-opacity duration-300
          `}></div>
        
          {/* Glowing bottom border */}
          <div className={`
            absolute bottom-0 left-0 right-0 h-[1px]
            bg-gradient-to-r from-transparent via-white/50 to-transparent
            opacity-70 group-hover:opacity-100
            transition-opacity duration-300
          `}></div>
        
          {/* Inner shadow */}
          <div className={`
            absolute inset-0 rounded-lg
            shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]
          `}></div>
        
          {/* Content */}
          <div className={`text-sm font-medium ${textColor}/70`}>
            {hour.time.split(' ')[1]}
          </div>
          <img
            src={hour.condition.icon.replace('64x64', '128x128')}
            alt={hour.condition.text}
            className="w-12 h-12 mx-auto my-2 drop-shadow-lg"
          />
          <div className={`font-semibold ${textColor} text-lg`}>
            {hour.temp_c}°C
          </div>
          <div className={`text-xs ${textColor}/60 mt-1 truncate`}>
            {hour.condition.text}
          </div>
        
          {/* Subtle outer glow */}
          <div className={`
            absolute inset-0 rounded-lg -z-10
            ${textColor}/10
            opacity-70 group-hover:opacity-90
            transition-opacity duration-300
          `}></div>
        </div>
        ))}
      </div>
    </div>
  );
}

function ClockIcon({ textColor }) {
  return (
    <svg
      className={`w-5 h-5 ${textColor}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}