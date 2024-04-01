const express = require('express');
const cityRoutes = require('./routes/cityRoutes');

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Use the cityRoutes for the /api/cities path
app.use('/api/cities', cityRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
