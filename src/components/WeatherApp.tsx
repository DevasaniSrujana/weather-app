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

// Generate fresh mock data for each location
const generateFreshMockData = (location: LocationResult): WeatherData => {
  // Generate dynamic dates for the next 7 days
  const generateDynamicDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]); // Format: YYYY-MM-DD
    }
    
    return dates;
  };

  // Generate dynamic weather conditions for variety
  const generateWeatherConditions = () => {
    const conditions = [
      { text: "Sunny", icon: "//cdn.weatherapi.com/weather/64x64/day/113.png", code: 113 },
      { text: "Partly cloudy", icon: "//cdn.weatherapi.com/weather/64x64/day/116.png", code: 116 },
      { text: "Cloudy", icon: "//cdn.weatherapi.com/weather/64x64/day/119.png", code: 119 },
      { text: "Light rain", icon: "//cdn.weatherapi.com/weather/64x64/day/296.png", code: 296 },
      { text: "Overcast", icon: "//cdn.weatherapi.com/weather/64x64/day/122.png", code: 122 },
      { text: "Mist", icon: "//cdn.weatherapi.com/weather/64x64/day/143.png", code: 143 },
      { text: "Fog", icon: "//cdn.weatherapi.com/weather/64x64/day/248.png", code: 248 }
    ];
    
    return conditions;
  };

  // Generate dynamic temperatures based on season and location
  const generateTemperatures = () => {
    const currentMonth = new Date().getMonth();
    let baseTemp = 22; // Default temperature
    
    // Adjust temperature based on season
    if (currentMonth >= 11 || currentMonth <= 1) { // Winter (Dec, Jan, Feb)
      baseTemp = 8;
    } else if (currentMonth >= 2 && currentMonth <= 4) { // Spring (Mar, Apr, May)
      baseTemp = 18;
    } else if (currentMonth >= 5 && currentMonth <= 7) { // Summer (Jun, Jul, Aug)
      baseTemp = 28;
    } else { // Fall (Sep, Oct, Nov)
      baseTemp = 15;
    }
    
    // Add some variation based on location
    const locationVariation = (location.name.length + location.id) % 10 - 5;
    return baseTemp + locationVariation;
  };

  const baseTemp = generateTemperatures();
  const conditions = generateWeatherConditions();
  
  // Generate current weather
  const currentCondition = conditions[Math.floor(Math.random() * conditions.length)];
  const currentTemp = baseTemp + Math.floor(Math.random() * 6) - 3;
  
  return {
    location: {
      name: location.name,
      region: location.region,
      country: location.country
    },
    current: {
      temp_c: currentTemp,
      temp_f: Math.round((currentTemp * 9/5) + 32),
      condition: currentCondition,
      wind_kph: 10 + Math.floor(Math.random() * 20),
      wind_mph: Math.round((10 + Math.floor(Math.random() * 20)) * 0.621371),
      humidity: 40 + Math.floor(Math.random() * 40),
      feelslike_c: currentTemp + Math.floor(Math.random() * 4) - 2,
      feelslike_f: Math.round(((currentTemp + Math.floor(Math.random() * 4) - 2) * 9/5) + 32)
    },
    forecast: {
      forecastday: generateDynamicDates().map((date, index) => {
        const condition = conditions[(index + location.id) % conditions.length];
        
        // Generate varied temperatures
        const maxTemp = baseTemp + Math.floor(Math.random() * 8) - 4;
        const minTemp = maxTemp - Math.floor(Math.random() * 8) - 2;
        
        return {
          date: date,
          day: {
            maxtemp_c: maxTemp,
            maxtemp_f: Math.round((maxTemp * 9/5) + 32),
            mintemp_c: minTemp,
            mintemp_f: Math.round((minTemp * 9/5) + 32),
            condition: condition
          },
          astro: {
            sunrise: `${6 + Math.floor(Math.random() * 2)}:${10 + Math.floor(Math.random() * 20)} AM`,
            sunset: `${5 + Math.floor(Math.random() * 2)}:${30 + Math.floor(Math.random() * 30)} PM`
          }
        };
      })
    }
  };
};

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
      // TEMPORARILY USING MOCK DATA UNTIL YOU GET A WORKING API KEY
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate fresh mock data for this specific location
      const freshMockData = generateFreshMockData(location);
      
      setWeatherData(freshMockData);
      
      /* 
      // UNCOMMENT THIS WHEN YOU HAVE A WORKING API KEY
      const API_KEY = 'YOUR_WORKING_API_KEY_HERE';
      
      const locationQuery = location.name;
      const currentUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(locationQuery)}&aqi=no`;
      const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(locationQuery)}&days=7&aqi=no&alerts=no`;
      
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(currentUrl),
        fetch(forecastUrl)
      ]);
      
      if (!currentResponse.ok) {
        throw new Error(`Weather API error: ${currentResponse.status}`);
      }
      
      const currentData = await currentResponse.json();
      let forecastData = null;
      
      if (forecastResponse.ok) {
        forecastData = await forecastResponse.json();
      }
      
      const data: WeatherData = {
        location: currentData.location,
        current: currentData.current,
        forecast: forecastData?.forecast || { forecastday: [] }
      };
      
      setWeatherData(data);
      */
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      // Fallback to fresh mock data
      const freshMockData = generateFreshMockData(location);
      setWeatherData(freshMockData);
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