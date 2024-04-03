const express = require('express');
const path = require('path');
const cors = require('cors');
const cityRoutes = require('../Travel Reservation/routes/cityRoutes');
const weatherRoutes = require('../Travel Reservation/routes/weatherRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// API routes
app.use('/api/cities', cityRoutes);
app.use('/weather', weatherRoutes);
//app.use('/geo', geocodeRoutes);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
