import iqairService from '../../../services/iqair';
import { makeLogAirQualityScheduler } from '../../schedulers/logAirQuality';

jest.mock('../../../services/iqair');

describe('create ScheduledTask', () => {
  describe('makeLogAirQualityScheduler', () => {
    const zone = { latitude: '234.342', longitude: '123.2553' };
    it('should return a function', () => {
      const callback = makeLogAirQualityScheduler(zone);
      expect(callback).toEqual(expect.any(Function));
    });

    it('should log air quality data to db', async () => {
      const LogAirQualityAction = makeLogAirQualityScheduler(zone);
      await LogAirQualityAction();
      expect(iqairService.getAirQuality).toBeCalled();
      expect(iqairService.logAirQualityToDB).toBeCalled();
    });
  });
});
