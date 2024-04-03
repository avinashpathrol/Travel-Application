require('dotenv').config();

// Dynamic import for fetch
const fetch = (...args) =>
  import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

// Function to get coordinates by city name
const getCoordinatesByCityName = async (cityName) => {
    console.log(`Fetching coordinates for city: ${cityName}`);
    const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`;
    try {
      const geocodeResponse = await fetch(geocodeUrl);
      const geocodeData = await geocodeResponse.json();
      if (!geocodeResponse.ok || geocodeData.length === 0) {
        console.error(`Geocoding failed for city: ${cityName}, Status: ${geocodeResponse.status}, Body:`, geocodeData);
        throw new Error('Geocoding failed');
      }
      console.log(`Coordinates for ${cityName}:`, geocodeData[0]);
      return geocodeData[0];
    } catch (error) {
      console.error('Geocoding error:', error);
      throw error;
    }
  };
  

// Function to fetch weather data by latitude and longitude
const fetchWeatherData = async (lat, lon) => {
  console.log(`Fetching weather data for coordinates: lat=${lat}, lon=${lon}`);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    console.error('Weather fetching failed for coordinates:', `lat=${lat}, lon=${lon}`);
    throw new Error('Weather fetching failed');
  }
  console.log(`Weather data for lat=${lat}, lon=${lon}:`, data);
  return data;
};

// Function to get weather by city name
const getWeatherByCityName = async (req, res) => {
    const city = req.params.city;
    console.log(`Request received for weather data by city name: ${city}`);
    if (!city) {
      return res.status(400).json({ message: "City name is required" });
    }
    try {
      const { lat, lon } = await getCoordinatesByCityName(city);
      const weatherData = await fetchWeatherData(lat, lon);
      res.json(weatherData);
    } catch (error) {
      console.error('Error fetching weather by city name:', city, 'Error:', error.message);
      res.status(500).json({ message: error.message });
    }
  };

  // Add this function in your weatherController.js file
const getWeatherForecastByCityName = async (req, res) => {
  const { city } = req.params;
  const { date } = req.query; // Expecting a date query parameter in the format 'YYYY-MM-DD'
  
  try {
    // Get coordinates first
    const { lat, lon } = await getCoordinatesByCityName(city);

    // Fetch forecast data
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

    // Filter forecast data for the specified date
    const dateTimestamp = new Date(date).setHours(0, 0, 0, 0);
    const forecastForDate = forecastData.list.filter((forecast) => {
      const forecastTimestamp = new Date(forecast.dt_txt).setHours(0, 0, 0, 0);
      return forecastTimestamp === dateTimestamp;
    });

    if (forecastForDate.length === 0) {
      throw new Error('Forecast for the specified date is not available');
    }

    res.json(forecastForDate);
  } catch (error) {
    console.error('Error fetching weather forecast:', error.message);
    res.status(500).json({ message: error.message });
  }
};

  

module.exports = { getWeatherByCityName, getWeatherForecastByCityName };
