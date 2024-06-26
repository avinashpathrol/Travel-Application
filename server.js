const express = require('express');
const cityRoutes = require('./routes/cityRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/cities', cityRoutes);
app.use('/weather', weatherRoutes);

if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app; 
