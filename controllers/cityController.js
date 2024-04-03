const fs = require('fs');
const path = require('path');

/**
 * List cities from a JSON file.
 * 
 * This controller function reads city data from a JSON file and returns it in the response.
 * It expects no input from the request object. On success, it sends back a JSON array of cities.
 * In case of any file reading errors, it sends a 500 server error response.
 *
 * @param {object} req - The request object from the client. Not used in this function.
 * @param {object} res - The response object to send data or errors back to the client.
 */
const listCities = (req, res) => {
  // Define the path to the cities.json file relative to this script
  const filePath = path.join(__dirname, '..', 'cities.json');

  // Asynchronously read the content of the cities.json file
  fs.readFile(filePath, (err, data) => {
    // If an error occurs during file reading, send a 500 status code and error message
    if (err) {
      res.status(500).send('Error reading city data');
      return;
    }
    // Parse the file content from JSON and send it as a response
    res.json(JSON.parse(data));
  });
};

// Export the listCities function to make it available for other modules
module.exports = { listCities };
