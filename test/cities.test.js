// cities.test.js
const request = require('supertest');
const app = require('../server');

describe('GET /api/cities', () => {
  it('should respond with a list of cities', async () => {
    const response = await request(app).get('/api/cities');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
