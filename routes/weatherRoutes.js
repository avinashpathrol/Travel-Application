const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Link the route to the controller function
router.get('/:city', weatherController.getWeatherByCoordinates);

module.exports = router;
