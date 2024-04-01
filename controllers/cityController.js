// Example in your cityController.js or a similar file
const fs = require('fs');
const path = require('path');

const listCities = (req, res) => {
  const filePath = path.join(__dirname, '..', 'cities.json'); // Adjust the path as necessary

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading city data');
      return;
    }
    res.json(JSON.parse(data));
  });
};
module.exports = { listCities };