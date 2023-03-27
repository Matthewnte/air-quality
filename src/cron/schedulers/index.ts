import createLogAirQualityTask from './logAirQuality';

/**
 * check “air quality“ for the Paris zone (latitude: 48.856613, longitude: 2.352222)
 * every 1 minute then save them in the database
 */
const parisZone = { latitude: '48.856613', longitude: '2.352222' };
export const logParisAirQualityTask = createLogAirQualityTask('* * * * *', parisZone);

export default {
  start: () => {
    logParisAirQualityTask.start();
  },
  stop: () => {
    logParisAirQualityTask.stop();
  }
};
