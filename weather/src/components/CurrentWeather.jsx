export default function CurrentWeather({ data, textColor, baseColor, isLoading = false }) {
    if (!data || !data.current || !data.location) {
        return (
            <div className="text-center py-12 text-white">
                No weather data available
            </div>
        )
    }

    const { current, location } = data
  
    if (isLoading) {
        return (
            <div className="text-white rounded-xl transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="space-y-2">
                        <div className="h-10 w-48 bg-white/20 rounded animate-pulse"></div>
                        <div className="h-4 w-32 bg-white/20 rounded animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-white/20 rounded-full animate-pulse"></div>
                        <div className="space-y-2 text-right">
                            <div className="h-12 w-24 bg-white/20 rounded animate-pulse"></div>
                            <div className="h-4 w-32 bg-white/20 rounded animate-pulse"></div>
                            <div className="h-4 w-24 bg-white/20 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
  
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="p-4 bg-white/10 rounded-xl animate-pulse">
                            <div className="h-6 w-6 bg-white/20 rounded-full mb-2"></div>
                            <div className="h-4 w-20 bg-white/20 rounded"></div>
                            <div className="h-6 w-16 bg-white/20 rounded mt-2"></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const Name = location?.name?.split('').map((letter, index) => (
        <span 
            key={index} 
            className="font-bold font-sans inline-block wave-animation"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            {letter === ' ' ? '\u00A0' : letter}
        </span>
    )) || location?.name || 'Unknown Location'
  
    return (
      <div className="text-white rounded-xl transition-shadow duration-300">
        <style jsx global>{`
            @keyframes jump {
                0%, 100% {
                    transform: translateY(0);
                    opacity: 1;
                }
                70% {
                    transform: translateY(0);
                    opacity: 1;
                }
                90% {
                    transform: translateY(-5px);
                    opacity: .7;
                }
            }

            .wave-animation {
                display: inline-block;
                animation: jump 3s ease-in-out infinite;
            }
        `}</style>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <h2 className={`text-3xl font-bold ${textColor} flex items-center gap-2 drop-shadow-[0_1px_12px_rgba(0,0,0,0.8)]`}>
                <div>{Name}</div>
                <span className={`whitespace-nowrap text-sm font-normal ${textColor}/70 bg-white/20 px-2 py-1 rounded-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]`}>
                    {location?.country || 'Unknown Country'}
                </span>
            </h2>
            <p className={`${textColor}/60`}>{location?.localtime || 'Time not available'}</p>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={current?.condition?.icon?.replace('64x64', '128x128') || '/weather-icon.png'}
              alt={current?.condition?.text || 'Weather condition'}
              className="w-20 h-20 object-contain"
            />
            <div className="text-right drop-shadow-[0_1px_12px_rgba(0,0,0,0.8)]">
              <div className={`text-5xl font-bold ${textColor}`}>{current?.temp_c || '--'} °C</div>
              <p className={`${textColor}/70`}>{current?.condition?.text || 'Condition not available'}</p>
              <p className={`text-sm ${textColor}/60`}>Feels like {current?.feelslike_c || '--'} °C</p>
            </div>
          </div>
        </div>
  
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <WeatherStat
            icon={<HumidityIcon />}
            label="Humidity"
            value={`${current?.humidity || '--'}%`}
            textColor={textColor}
            baseColor={baseColor}
          />
          <WeatherStat
            icon={<WindIcon />}
            label="Wind"
            value={`${current?.wind_kph || '--'} km/h`}
            subtext={current?.wind_dir}
            textColor={textColor}
            baseColor={baseColor}
          />
          <WeatherStat
            icon={<PressureIcon />}
            label="Pressure"
            value={`${current?.pressure_mb || '--'} mb`}
            textColor={textColor}
            baseColor={baseColor}
          />
          <WeatherStat
            icon={<VisibilityIcon />}
            label="Visibility"
            value={`${current?.vis_km || '--'} km`}
            textColor={textColor}
            baseColor={baseColor}
          />
        </div>
      </div>
    )
}
  
function WeatherStat({ icon, label, value, subtext, textColor, baseColor }) {
    return (
      <div className={`
        relative p-4 rounded-xl overflow-hidden
        bg-white/5 backdrop-blur-lg
        transition-all duration-300
        group hover:bg-white/10
        hover:shadow-xl
        hover:scale-[1.02]
      `}>
        {/* Glowing top border */}
        <div className={`
          absolute top-0 left-0 right-0 h-[1px]
          bg-gradient-to-r from-transparent via-white/60 to-transparent
          opacity-70 group-hover:opacity-100
          transition-opacity duration-300
        `}></div>
        
        {/* Glowing bottom border */}
        <div className={`
          absolute bottom-0 left-0 right-0 h-[1px]
          bg-gradient-to-r from-transparent via-white/60 to-transparent
          opacity-70 group-hover:opacity-100
          transition-opacity duration-300
        `}></div>
        
        {/* Inner shadow effect (base) */}
        <div className={`
          absolute inset-0 rounded-xl
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]
        `}></div>
        
        {/* Inner glow on hover */}
        <div className={`
          absolute inset-0 rounded-xl
          shadow-[inset_0_0_12px_0px_rgba(255,255,255,0.3)]
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          pointer-events-none
        `}></div>
        
        {/* Content */}
        <div className={`relative z-10 ${textColor} mb-2 group-hover:scale-110 transform transition-transform duration-200`}>
          {icon}
        </div>
        <div className={`relative z-10 text-sm ${textColor}/70 flex gap-2`}>
          {label} 
          {subtext && <div className={`text-xs ${textColor}/40`}>({subtext})</div>}
        </div>
        <div className={`relative z-10 font-semibold ${textColor} text-lg`}>{value}</div>
        
        {/* Subtle outer glow */}
        <div className={`
          absolute inset-0 rounded-xl -z-10
          ${baseColor.shadow}
          opacity-70 group-hover:opacity-90
          transition-opacity duration-300
        `}></div>
      </div>
    )
  }
  
  // Glass-style SVG Icons
  function HumidityIcon() {
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
      </svg>
    )
  }
  
  function WindIcon() {
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
      </svg>
    )
  }
  
  function PressureIcon() {
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8m-4-4h8" />
      </svg>
    )
  }
  
  function VisibilityIcon() {
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  }