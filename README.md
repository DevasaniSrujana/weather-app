# 🌤️ Weather Zen UI

A beautiful, modern weather application built with React, TypeScript, and Tailwind CSS. Features a clean glass-morphism design with smooth animations and dynamic weather data.

## ✨ Features

- **🌍 Global City Search** - Search for any of 34 major cities worldwide
- **🌡️ Current Weather** - Real-time temperature, conditions, humidity, and wind
- **📅 7-Day Forecast** - Dynamic weather predictions with current dates
- **🎨 Modern UI** - Glass-morphism design with smooth animations
- **📱 Responsive** - Works perfectly on desktop and mobile
- **⚡ Fast Performance** - Optimized React app with clean code

## 🚀 Live Demo

[Add your live demo link here when deployed]

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful UI components
- **Lucide React** - Modern icons
- **Vite** - Fast build tool

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-zen-ui.git
   cd weather-zen-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🌍 Available Cities

### Asia
- **India**: Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad
- **Pakistan**: Karachi, Lahore, Islamabad
- **Other**: Tokyo, Seoul, Beijing, Shanghai, Hong Kong, Bangkok, Singapore, Jakarta, Manila, Kuala Lumpur, Ho Chi Minh City, Dhaka

### Europe
- London, Paris, Berlin, Rome

### North America
- New York, Los Angeles, Toronto

### Middle East
- Dubai, Riyadh

### Africa
- Cairo, Lagos

### Oceania
- Sydney, Melbourne

## 🎯 Usage

1. **Search for a city** - Type any city name in the search box
2. **View current weather** - See temperature, conditions, humidity, and wind
3. **Check 7-day forecast** - Scroll down to see the weekly weather prediction
4. **Try different cities** - Each city shows unique, dynamic weather data

## 🔧 Configuration

### Using Real Weather Data (Optional)

To get real weather data instead of mock data:

1. **Get a free API key** from [WeatherAPI.com](https://www.weatherapi.com/)
2. **Test your API key** using the included `api-test.html` file
3. **Update the code** in `src/components/WeatherApp.tsx`:
   ```typescript
   // Replace this line:
   const API_KEY = 'YOUR_WORKING_API_KEY_HERE';
   
   // With your actual API key:
   const API_KEY = 'your-actual-api-key-here';
   ```
4. **Uncomment the API code** by removing the `/*` and `*/` comments

## 📁 Project Structure

```
weather-zen-ui/
├── src/
│   ├── components/
│   │   ├── ui/           # Shadcn/ui components
│   │   └── weather/      # Weather-specific components
│   ├── data/
│   │   └── mockWeatherData.ts  # Mock weather data
│   └── App.tsx           # Main app component
├── api-test.html         # API key testing tool
├── test-api.html         # Simple API test
└── README.md
```

## 🎨 Design Features

- **Glass-morphism UI** - Beautiful frosted glass effects
- **Smooth animations** - Fade-in and slide-up animations
- **Responsive design** - Works on all screen sizes
- **Dark theme** - Easy on the eyes
- **Hover effects** - Interactive elements

## 🔍 Testing

### Manual Testing
1. Search for different cities
2. Verify weather data changes for each city
3. Test responsive design (resize browser)
4. Check animations and transitions

### API Testing
Use the included `api-test.html` to test your WeatherAPI key:
1. Open `api-test.html` in your browser
2. Enter your API key
3. Click "Test API" to verify it works

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **WeatherAPI.com** - For weather data API
- **Shadcn/ui** - For beautiful UI components
- **Tailwind CSS** - For utility-first styling
- **Lucide React** - For modern icons

## 📞 Support

If you have any questions or issues:
1. Check the [Issues](https://github.com/yourusername/weather-zen-ui/issues) page
2. Create a new issue if your problem isn't already listed
3. Include details about your environment and steps to reproduce

---

**Made with ❤️ by [Your Name]**
