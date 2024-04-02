// weather.test.js
describe('GET /weather/:cityName', () => {
    it('should respond with weather data for the city', async () => {
      const cityName = 'New York'; // Example city
      const response = await request(app).get(`/weather/${cityName}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('main');
      expect(response.body).toHaveProperty('weather');
    });
  });
  