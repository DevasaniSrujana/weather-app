import React from 'react';
import { Card } from '../ui/card';
import { WeatherData } from '../WeatherApp';

interface WeeklyForecastProps {
  data: WeatherData;
  loading: boolean;
}

export const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <Card className="p-6 bg-gradient-glass backdrop-blur-sm border-white/20 shadow-weather rounded-3xl">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">7-Day Forecast</h3>
        <div className="space-y-3">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="animate-pulse flex items-center justify-between py-2">
              <div className="h-4 bg-white/20 rounded w-20"></div>
              <div className="h-8 w-8 bg-white/20 rounded-full"></div>
              <div className="h-4 bg-white/20 rounded w-16"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  };

  return (
    <Card className="p-6 bg-gradient-glass backdrop-blur-sm border-white/20 shadow-weather rounded-3xl 
                     hover:shadow-glow transition-shadow duration-500">
      <h3 className="text-lg font-semibold text-card-foreground mb-6 flex items-center">
        <span className="w-1 h-6 bg-primary rounded-full mr-3"></span>
        7-Day Forecast
      </h3>
      
      <div className="space-y-3">
        {data.forecast.forecastday.map((day, index) => (
          <div
            key={day.date}
            className="flex items-center justify-between py-3 px-4 bg-white/5 backdrop-blur-sm 
                       rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300
                       group animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Day */}
            <div className="flex-1 text-left">
              <div className="font-medium text-card-foreground group-hover:text-primary transition-colors">
                {formatDate(day.date)}
              </div>
              <div className="text-sm text-muted-foreground">
                {day.day.condition.text}
              </div>
            </div>

            {/* Weather Icon */}
            <div className="flex-shrink-0 mx-4">
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                className="w-10 h-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Temperature Range */}
            <div className="flex-shrink-0 text-right">
              <div className="font-semibold text-card-foreground">
                {Math.round(day.day.maxtemp_c)}°
              </div>
              <div className="text-sm text-muted-foreground">
                {Math.round(day.day.mintemp_c)}°
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};