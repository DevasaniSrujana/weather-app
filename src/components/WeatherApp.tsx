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
      // Try to fetch real data, fallback to mock data
      const API_KEY = 'YOUR_API_KEY'; // Replace with actual API key
      
      if (API_KEY === 'YOUR_API_KEY') {
        // Use mock data when no API key is provided
        setTimeout(() => {
          setWeatherData(mockWeatherData);
          setLoading(false);
        }, 1000);
        return;
      }

      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location.lat},${location.lon}&days=7&aqi=no&alerts=no`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      
      const data: WeatherData = await response.json();
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