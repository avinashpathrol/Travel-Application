// cityController.js
const listCities = (req, res) => {
    // For now, we'll return a hardcoded list of cities
    const cities = [
      { name: 'paris', label: 'Paris' },
      { name: 'new-york', label: 'New York' },
      { name: 'tokyo', label: 'Tokyo' },
      { name: 'sydney', label: 'Sydney' },
      { name: 'cairo', label: 'Cairo' }
    ];
    res.json(cities);
  };
  
  module.exports = {
    listCities,
  };
  