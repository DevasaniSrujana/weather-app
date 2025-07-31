import { WeatherData } from '../components/WeatherApp';

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

// Generate dynamic temperatures based on season
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
  
  return baseTemp;
};

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
    forecastday: generateDynamicDates().map((date, index) => {
      const baseTemp = generateTemperatures();
      const conditions = generateWeatherConditions();
      const condition = conditions[index % conditions.length];
      
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

export const mockLocationResults = [
  // North America
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
    name: "Los Angeles",
    region: "California",
    country: "United States of America",
    lat: 34.05,
    lon: -118.24,
    url: "los-angeles-california-united-states-of-america"
  },
  {
    id: 3,
    name: "Toronto",
    region: "Ontario",
    country: "Canada",
    lat: 43.65,
    lon: -79.38,
    url: "toronto-ontario-canada"
  },
  
  // Europe
  {
    id: 4,
    name: "London",
    region: "City of London, Greater London",
    country: "United Kingdom",
    lat: 51.52,
    lon: -0.11,
    url: "london-city-of-london-greater-london-united-kingdom"
  },
  {
    id: 5,
    name: "Paris",
    region: "Ile-de-France",
    country: "France",
    lat: 48.87,
    lon: 2.33,
    url: "paris-ile-de-france-france"
  },
  {
    id: 6,
    name: "Berlin",
    region: "Berlin",
    country: "Germany",
    lat: 52.52,
    lon: 13.41,
    url: "berlin-berlin-germany"
  },
  {
    id: 7,
    name: "Rome",
    region: "Lazio",
    country: "Italy",
    lat: 41.90,
    lon: 12.50,
    url: "rome-lazio-italy"
  },
  
  // Asia
  {
    id: 8,
    name: "Tokyo",
    region: "Tokyo",
    country: "Japan",
    lat: 35.69,
    lon: 139.69,
    url: "tokyo-tokyo-japan"
  },
  {
    id: 9,
    name: "Mumbai",
    region: "Maharashtra",
    country: "India",
    lat: 19.08,
    lon: 72.88,
    url: "mumbai-maharashtra-india"
  },
  {
    id: 10,
    name: "Delhi",
    region: "Delhi",
    country: "India",
    lat: 28.70,
    lon: 77.10,
    url: "delhi-delhi-india"
  },
  {
    id: 11,
    name: "Bangalore",
    region: "Karnataka",
    country: "India",
    lat: 12.97,
    lon: 77.59,
    url: "bangalore-karnataka-india"
  },
  {
    id: 12,
    name: "Chennai",
    region: "Tamil Nadu",
    country: "India",
    lat: 13.08,
    lon: 80.27,
    url: "chennai-tamil-nadu-india"
  },
  {
    id: 13,
    name: "Kolkata",
    region: "West Bengal",
    country: "India",
    lat: 22.57,
    lon: 88.36,
    url: "kolkata-west-bengal-india"
  },
  {
    id: 14,
    name: "Hyderabad",
    region: "Telangana",
    country: "India",
    lat: 17.39,
    lon: 78.46,
    url: "hyderabad-telangana-india"
  },
  {
    id: 15,
    name: "Karachi",
    region: "Sindh",
    country: "Pakistan",
    lat: 24.86,
    lon: 67.01,
    url: "karachi-sindh-pakistan"
  },
  {
    id: 16,
    name: "Lahore",
    region: "Punjab",
    country: "Pakistan",
    lat: 31.55,
    lon: 74.36,
    url: "lahore-punjab-pakistan"
  },
  {
    id: 17,
    name: "Islamabad",
    region: "Islamabad Capital Territory",
    country: "Pakistan",
    lat: 33.72,
    lon: 73.06,
    url: "islamabad-islamabad-capital-territory-pakistan"
  },
  {
    id: 18,
    name: "Dhaka",
    region: "Dhaka",
    country: "Bangladesh",
    lat: 23.81,
    lon: 90.36,
    url: "dhaka-dhaka-bangladesh"
  },
  {
    id: 19,
    name: "Bangkok",
    region: "Bangkok",
    country: "Thailand",
    lat: 13.76,
    lon: 100.50,
    url: "bangkok-bangkok-thailand"
  },
  {
    id: 20,
    name: "Singapore",
    region: "Singapore",
    country: "Singapore",
    lat: 1.35,
    lon: 103.82,
    url: "singapore-singapore-singapore"
  },
  {
    id: 21,
    name: "Jakarta",
    region: "Jakarta",
    country: "Indonesia",
    lat: -6.21,
    lon: 106.85,
    url: "jakarta-jakarta-indonesia"
  },
  {
    id: 22,
    name: "Manila",
    region: "Metro Manila",
    country: "Philippines",
    lat: 14.60,
    lon: 120.98,
    url: "manila-metro-manila-philippines"
  },
  {
    id: 23,
    name: "Kuala Lumpur",
    region: "Kuala Lumpur",
    country: "Malaysia",
    lat: 3.14,
    lon: 101.69,
    url: "kuala-lumpur-kuala-lumpur-malaysia"
  },
  {
    id: 24,
    name: "Ho Chi Minh City",
    region: "Ho Chi Minh",
    country: "Vietnam",
    lat: 10.82,
    lon: 106.63,
    url: "ho-chi-minh-city-ho-chi-minh-vietnam"
  },
  {
    id: 25,
    name: "Seoul",
    region: "Seoul",
    country: "South Korea",
    lat: 37.57,
    lon: 126.98,
    url: "seoul-seoul-south-korea"
  },
  {
    id: 26,
    name: "Beijing",
    region: "Beijing",
    country: "China",
    lat: 39.90,
    lon: 116.41,
    url: "beijing-beijing-china"
  },
  {
    id: 27,
    name: "Shanghai",
    region: "Shanghai",
    country: "China",
    lat: 31.23,
    lon: 121.47,
    url: "shanghai-shanghai-china"
  },
  {
    id: 28,
    name: "Hong Kong",
    region: "Hong Kong",
    country: "Hong Kong",
    lat: 22.32,
    lon: 114.17,
    url: "hong-kong-hong-kong-hong-kong"
  },
  
  // Middle East
  {
    id: 29,
    name: "Dubai",
    region: "Dubai",
    country: "United Arab Emirates",
    lat: 25.20,
    lon: 55.27,
    url: "dubai-dubai-united-arab-emirates"
  },
  {
    id: 30,
    name: "Riyadh",
    region: "Riyadh",
    country: "Saudi Arabia",
    lat: 24.71,
    lon: 46.68,
    url: "riyadh-riyadh-saudi-arabia"
  },
  
  // Africa
  {
    id: 31,
    name: "Cairo",
    region: "Cairo",
    country: "Egypt",
    lat: 30.04,
    lon: 31.24,
    url: "cairo-cairo-egypt"
  },
  {
    id: 32,
    name: "Lagos",
    region: "Lagos",
    country: "Nigeria",
    lat: 6.52,
    lon: 3.38,
    url: "lagos-lagos-nigeria"
  },
  
  // Oceania
  {
    id: 33,
    name: "Sydney",
    region: "New South Wales",
    country: "Australia",
    lat: -33.87,
    lon: 151.21,
    url: "sydney-new-south-wales-australia"
  },
  {
    id: 34,
    name: "Melbourne",
    region: "Victoria",
    country: "Australia",
    lat: -37.81,
    lon: 144.96,
    url: "melbourne-victoria-australia"
  }
];