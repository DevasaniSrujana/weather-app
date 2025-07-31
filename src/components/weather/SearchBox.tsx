import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '../ui/input';
import { LocationResult } from '../WeatherApp';
import { mockLocationResults } from '../../data/mockWeatherData';

interface SearchBoxProps {
  onLocationSelect: (location: LocationResult) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchLocations = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    
    try {
      // Fetch real data from WeatherAPI
      const API_KEY = '949c528d47c74bffbf242438253107';

      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${encodeURIComponent(searchQuery)}`
      );
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data: LocationResult[] = await response.json();
      setSuggestions(data.slice(0, 5)); // Limit to 5 suggestions
      setIsOpen(true);
    } catch (error) {
      console.error('Error searching locations:', error);
      // Fallback to mock data
      const filtered = mockLocationResults.filter(location =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
      setIsOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      searchLocations(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleLocationClick = (location: LocationResult) => {
    setQuery(`${location.name}, ${location.region}`);
    setIsOpen(false);
    onLocationSelect(location);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          className="pl-12 pr-4 py-3 h-12 text-lg bg-card/80 backdrop-blur-sm border-white/20 shadow-card rounded-2xl 
                     focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300
                     placeholder:text-muted-foreground/70"
        />
        {loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-sm border border-white/20 
                        rounded-2xl shadow-weather z-50 overflow-hidden animate-fade-in">
          {suggestions.map((location) => (
            <button
              key={location.id}
              onClick={() => handleLocationClick(location)}
              className="w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors duration-200 
                         border-b border-white/10 last:border-b-0 group"
            >
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary group-hover:text-primary-glow transition-colors" />
                <div>
                  <div className="font-medium text-card-foreground group-hover:text-primary transition-colors">
                    {location.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {location.region}, {location.country}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};