import request from 'supertest';
import app from './app';

describe('Health Check', () => {
  it('should return 200', async () => {
    const response = await request(app).get('/health').expect(200);
    expect(response.body).toEqual({ status: 'up' });
  });

  it("returns a 404 on route that doesn't exist", async () => {
    const response = await request(app).post('/404routenotfound').send().expect(404);
    expect(response.body.message).toBe('Route not Found!');
  });
});
