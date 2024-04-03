require('dotenv').config();

const fetch = (...args) =>
  import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_KEY = process.env.OPENWEATHERMAP_API_KEY; // Retrieves the OpenWeatherMap API key from environment variables.

/**
 * Asynchronously fetches the geographical coordinates (latitude and longitude) for a given city name.
 * Uses the OpenWeatherMap Geocoding API.
 *
 * @param {string} cityName - The name of the city for which to fetch coordinates.
 * @returns {Promise<Object>} A promise that resolves with the geocoding information of the city.
 * @throws {Error} If the fetch operation fails or if the city cannot be found.
 */
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

/**
 * Asynchronously fetches weather data for a given set of geographical coordinates.
 *
 * @param {number} lat - The latitude of the location.
 * @param {number} lon - The longitude of the location.
 * @returns {Promise<Object>} A promise that resolves with the weather data for the location.
 * @throws {Error} If the fetch operation fails.
 */
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

/**
 * Controller function to handle the API route for fetching weather data by city name.
 * It first fetches the city's coordinates and then retrieves the weather data for those coordinates.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
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

/**
 * Controller function to handle the API route for fetching weather forecast data by city name for a specific date.
 * It first fetches the city's coordinates and then retrieves the weather forecast data for those coordinates.
 *
 * @param {Object} req - The HTTP request object, including city name in params and date in query.
 * @param {Object} res - The HTTP response object.
 */
const getWeatherForecastByCityName = async (req, res) => {
  const { city } = req.params;
  const { date } = req.query; // Expects a date query parameter in the format 'YYYY-MM-DD'.
  
  try {
    const { lat, lon } = await getCoordinatesByCityName(city);
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

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

// Export the controller functions to make them available for route handlers.
module.exports = { getWeatherByCityName, getWeatherForecastByCityName };
