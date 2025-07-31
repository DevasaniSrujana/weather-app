import React from 'react';
import { Wind, Droplets, Sunrise, Thermometer, MapPin, Cloud } from 'lucide-react';
import { Card } from '../ui/card';
import { WeatherData } from '../WeatherApp';

interface CurrentWeatherProps {
  data: WeatherData;
  loading: boolean;
  error: string | null;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, loading, error }) => {
  if (loading) {
    return (
      <Card className="p-6 bg-gradient-glass backdrop-blur-sm border-white/20 shadow-weather rounded-3xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/20 rounded-lg w-3/4"></div>
          <div className="h-16 bg-white/20 rounded-lg w-1/2"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-white/20 rounded-lg"></div>
            <div className="h-12 bg-white/20 rounded-lg"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 bg-gradient-glass backdrop-blur-sm border-red-300/20 shadow-weather rounded-3xl">
        <div className="text-center text-red-500">
          <Cloud className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="text-lg font-medium">Unable to load weather data</p>
          <p className="text-sm text-muted-foreground mt-1">{error}</p>
        </div>
      </Card>
    );
  }

  // Add safety checks for API response
  if (!data || !data.current || !data.current.condition || !data.location) {
    return (
      <Card className="p-6 bg-gradient-glass backdrop-blur-sm border-red-300/20 shadow-weather rounded-3xl">
        <div className="text-center text-red-500">
          <Cloud className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="text-lg font-medium">Invalid weather data</p>
        </div>
      </Card>
    );
  }

  const { location, current, forecast } = data;
  const sunrise = forecast?.forecastday?.[0]?.astro?.sunrise || "6:30 AM";

  return (
    <Card className="p-6 bg-gradient-glass backdrop-blur-sm border-white/20 shadow-weather rounded-3xl 
                     hover:shadow-glow transition-shadow duration-500">
      {/* Location */}
      <div className="flex items-center justify-center mb-6 animate-fade-in">
        <MapPin className="h-5 w-5 text-primary mr-2" />
        <h2 className="text-xl font-semibold text-card-foreground">
          {location.name}, {location.region}
        </h2>
      </div>

      {/* Current Temperature & Condition */}
      <div className="text-center mb-8 animate-weather-float">
        <div className="relative inline-block">
          <img
            src={current.condition.icon}
            alt={current.condition.text}
            className="w-24 h-24 mx-auto mb-4 drop-shadow-lg animate-glow-pulse"
          />
        </div>
        <div className="space-y-2">
          <div className="text-5xl font-bold text-card-foreground mb-2">
            {Math.round(current.temp_c)}°
          </div>
          <div className="text-lg text-muted-foreground font-medium">
            {current.condition.text}
          </div>
          <div className="text-sm text-muted-foreground">
            Feels like {Math.round(current.feelslike_c)}°C
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 
                        hover:bg-white/20 transition-colors duration-300">
          <Wind className="h-6 w-6 text-primary mx-auto mb-2" />
          <div className="text-sm text-muted-foreground mb-1">Wind</div>
          <div className="text-lg font-semibold text-card-foreground">
            {Math.round(current.wind_kph)} km/h
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 
                        hover:bg-white/20 transition-colors duration-300">
          <Droplets className="h-6 w-6 text-primary mx-auto mb-2" />
          <div className="text-sm text-muted-foreground mb-1">Humidity</div>
          <div className="text-lg font-semibold text-card-foreground">
            {current.humidity}%
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 
                        hover:bg-white/20 transition-colors duration-300">
          <Sunrise className="h-6 w-6 text-primary mx-auto mb-2" />
          <div className="text-sm text-muted-foreground mb-1">Sunrise</div>
          <div className="text-lg font-semibold text-card-foreground">
            {sunrise}
          </div>
        </div>
      </div>
    </Card>
  );
};