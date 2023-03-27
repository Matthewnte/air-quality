import AirQuality from '../../model';
import iqair from '../../services/iqair';
import api from '../../utils/api';
import stub from '../stub';

jest.mock('../../utils/api');
jest.mock('../../model');

describe('IQAIR service', () => {
  const parisZone = { latitude: '48.856613', longitude: '2.352222' };
  // mock all get requests requests
  (api.get as jest.Mock).mockResolvedValue(stub.AirQualityResponse);

  describe('get air quality for a given zone', () => {
    it('should return air quality for the given zone if successful', async () => {
      const airQuality = await iqair.getAirQuality(parisZone);
      expect(api.get).toBeCalled();
      expect(airQuality).toMatchObject({
        ts: expect.any(String),
        aqius: expect.any(Number),
        mainus: expect.any(String),
        aqicn: expect.any(Number),
        maincn: expect.any(String),
      });
    });
  });

  describe('log air quality to DB', () => {
    it('should call the airQuality.create() method', async () => {
      const airQualityStub = stub.AirQualityResponse.data.current.pollution;
      await iqair.logAirQualityToDB(airQualityStub);
      expect(AirQuality.create).toBeCalledWith(airQualityStub);
    });
  });
});
