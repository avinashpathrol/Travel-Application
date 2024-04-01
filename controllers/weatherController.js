// weatherController.js
const dotenv = require('dotenv');
dotenv.config();

const getWeatherByCoordinates = async (req, res) => {
  // Import fetch dynamically
  const fetch = (await import('node-fetch')).default;
  const { lat, lon } = req.query;
  const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
  const url = `https://api.openweathermap.org/data/3.0/onecall/timemachine?&&appid=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (response.ok) {
      res.json(data);
    } else {
      res.status(response.status).json({ error: data.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getWeatherByCoordinates };
