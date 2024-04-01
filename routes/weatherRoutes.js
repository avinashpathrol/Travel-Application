const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Link the route to the controller function that uses the city name
router.get('/:city', weatherController.getWeatherByCityName);
router.get('/weather/:city', weatherController.getWeatherByCityName);
// Add this route in your routes file
router.get('/forecast/:city', weatherController.getWeatherForecastByCityName);

module.exports = router;
