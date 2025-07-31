import React, { useState, useEffect } from 'react';
import { SearchBox } from './weather/SearchBox';
import { CurrentWeather } from './weather/CurrentWeather';
import { WeeklyForecast } from './weather/WeeklyForecast';
import { mockWeatherData } from '../data/mockWeatherData';

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    wind_mph: number;
    humidity: number;
    feelslike_c: number;
    feelslike_f: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
      };
      astro: {
        sunrise: string;
        sunset: string;
      };
    }>;
  };
}

export interface LocationResult {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

const WeatherApp: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Start with mock data for New York
  useEffect(() => {
    setWeatherData(mockWeatherData);
  }, []);

  const handleLocationSelect = async (location: LocationResult) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch real data from WeatherAPI
      const API_KEY = '949c528d47c74bffbf242438253107';

      // Use location name for better API response
      const locationQuery = location.name;
      
      // Get current weather and forecast separately for better reliability
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(locationQuery)}&aqi=no`),
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(locationQuery)}&days=7&aqi=no&alerts=no`)
      ]);
      
      if (!currentResponse.ok) {
        throw new Error(`Current weather API error: ${currentResponse.status}`);
      }
      
      const currentData = await currentResponse.json();
      let forecastData = null;
      
      // Forecast is optional - if it fails, we'll still show current weather
      if (forecastResponse.ok) {
        forecastData = await forecastResponse.json();
      }
      
      // Combine the data into expected format
      const data: WeatherData = {
        location: currentData.location,
        current: currentData.current,
        forecast: forecastData?.forecast || { forecastday: [] }
      };
      
      setWeatherData(data);
    } catch (err) {
      console.error('Error fetching weather:', err);
      // Fallback to mock data
      setWeatherData(mockWeatherData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-sky p-4 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto">
        <div className="space-y-6">
          {/* Search Section */}
          <div className="animate-fade-in">
            <SearchBox onLocationSelect={handleLocationSelect} />
          </div>

          {/* Current Weather */}
          {weatherData && (
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CurrentWeather 
                data={weatherData} 
                loading={loading} 
                error={error} 
              />
            </div>
          )}

          {/* Weekly Forecast */}
          {weatherData && (
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <WeeklyForecast data={weatherData} loading={loading} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;