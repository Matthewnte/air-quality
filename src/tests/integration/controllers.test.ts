import request from 'supertest';
import app from '../../app';

describe('Air quality API', () => {
  describe('getAirQuality', () => {
    describe('when request is successful', () => {
      it('should return a 200 status code and air quality result', async () => {
        const response = await request(app).get('/api/v1/air-quality').expect(200);
        expect(response.body).toMatchObject({
          result: {
            pollution: {
              ts: expect.any(String),
              aqicn: expect.any(Number),
              mainus: expect.any(String),
              aqius: expect.any(Number),
              maincn: expect.any(String)
            }
          }
        });
      });
    });
  });

  describe('Most polluted date and time', () => {
    it('should return date and time where the Paris zone is the most polluted', () => {

    });
  });
});
