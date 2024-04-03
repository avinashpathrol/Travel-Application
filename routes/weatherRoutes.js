const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/:city', weatherController.getWeatherByCityName);
router.get('/weather/:city', weatherController.getWeatherByCityName);
router.get('/forecast/:city', weatherController.getWeatherForecastByCityName);

module.exports = router;
