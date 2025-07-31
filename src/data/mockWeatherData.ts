import { WeatherData } from '../components/WeatherApp';

export const mockWeatherData: WeatherData = {
  location: {
    name: "New York",
    region: "New York",
    country: "United States of America"
  },
  current: {
    temp_c: 22,
    temp_f: 72,
    condition: {
      text: "Partly cloudy",
      icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
      code: 116
    },
    wind_kph: 13.0,
    wind_mph: 8.1,
    humidity: 65,
    feelslike_c: 24,
    feelslike_f: 75
  },
  forecast: {
    forecastday: [
      {
        date: "2024-01-15",
        day: {
          maxtemp_c: 25,
          maxtemp_f: 77,
          mintemp_c: 18,
          mintemp_f: 64,
          condition: {
            text: "Sunny",
            icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
            code: 113
          }
        },
        astro: {
          sunrise: "07:15 AM",
          sunset: "05:42 PM"
        }
      },
      {
        date: "2024-01-16",
        day: {
          maxtemp_c: 23,
          maxtemp_f: 73,
          mintemp_c: 16,
          mintemp_f: 61,
          condition: {
            text: "Partly cloudy",
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
            code: 116
          }
        },
        astro: {
          sunrise: "07:14 AM",
          sunset: "05:43 PM"
        }
      },
      {
        date: "2024-01-17",
        day: {
          maxtemp_c: 20,
          maxtemp_f: 68,
          mintemp_c: 14,
          mintemp_f: 57,
          condition: {
            text: "Cloudy",
            icon: "//cdn.weatherapi.com/weather/64x64/day/119.png",
            code: 119
          }
        },
        astro: {
          sunrise: "07:13 AM",
          sunset: "05:44 PM"
        }
      },
      {
        date: "2024-01-18",
        day: {
          maxtemp_c: 18,
          maxtemp_f: 64,
          mintemp_c: 12,
          mintemp_f: 54,
          condition: {
            text: "Light rain",
            icon: "//cdn.weatherapi.com/weather/64x64/day/296.png",
            code: 296
          }
        },
        astro: {
          sunrise: "07:12 AM",
          sunset: "05:45 PM"
        }
      },
      {
        date: "2024-01-19",
        day: {
          maxtemp_c: 21,
          maxtemp_f: 70,
          mintemp_c: 15,
          mintemp_f: 59,
          condition: {
            text: "Partly cloudy",
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
            code: 116
          }
        },
        astro: {
          sunrise: "07:11 AM",
          sunset: "05:46 PM"
        }
      },
      {
        date: "2024-01-20",
        day: {
          maxtemp_c: 24,
          maxtemp_f: 75,
          mintemp_c: 17,
          mintemp_f: 63,
          condition: {
            text: "Sunny",
            icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
            code: 113
          }
        },
        astro: {
          sunrise: "07:10 AM",
          sunset: "05:47 PM"
        }
      },
      {
        date: "2024-01-21",
        day: {
          maxtemp_c: 26,
          maxtemp_f: 79,
          mintemp_c: 19,
          mintemp_f: 66,
          condition: {
            text: "Sunny",
            icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
            code: 113
          }
        },
        astro: {
          sunrise: "07:09 AM",
          sunset: "05:48 PM"
        }
      }
    ]
  }
};

export const mockLocationResults = [
  {
    id: 1,
    name: "New York",
    region: "New York",
    country: "United States of America",
    lat: 40.71,
    lon: -74.01,
    url: "new-york-new-york-united-states-of-america"
  },
  {
    id: 2,
    name: "London",
    region: "City of London, Greater London",
    country: "United Kingdom",
    lat: 51.52,
    lon: -0.11,
    url: "london-city-of-london-greater-london-united-kingdom"
  },
  {
    id: 3,
    name: "Tokyo",
    region: "Tokyo",
    country: "Japan",
    lat: 35.69,
    lon: 139.69,
    url: "tokyo-tokyo-japan"
  },
  {
    id: 4,
    name: "Paris",
    region: "Ile-de-France",
    country: "France",
    lat: 48.87,
    lon: 2.33,
    url: "paris-ile-de-france-france"
  }
];