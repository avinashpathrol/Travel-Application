// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// require('dotenv').config();
// const API_KEY = process.env.OPENWEATHERMAP_API_KEY; // Your API key stored in .env

// const getCoordinatesByCityName = async (req, res) => {
//   const { q, limit } = req.query; // Destructure the query parameters
//   const url = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=${limit}&appid=${API_KEY}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data)
//     if (!response.ok) {
//       throw new Error(`Geocoding API call failed with status: ${response.status}`);
//     }
    
//     console.log("Coordinates data:", data); // Logging the output
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to fetch coordinates', details: error.message });
//   }
// };

// module.exports = { getCoordinatesByCityName };
