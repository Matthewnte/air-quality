import cron, { ScheduledTask } from 'node-cron';
import logger from '../../config/winston';
import iqairService from '../../services/iqair';
import { Zone } from '../../types';
import AppError from '../../utils/appError';
import getErrorMessage from '../../utils/getErrorMessage';

export const makeLogAirQualityScheduler = (zone: Zone) => async () => {
  const currentDate = new Date();
  logger.info(`Logging air quality data to DB - ${currentDate.getHours()}:${currentDate.getMinutes()}`);

  try {
    const airQualityData = await iqairService.getAirQuality(zone);
    await iqairService.logAirQualityToDB(airQualityData);
  } catch (error) {
    throw new AppError(getErrorMessage(error), 500);
  }
};

const createLogAirQualityTask = (cronExpresion: string, zone: Zone): ScheduledTask => {
  const scheduleAction = makeLogAirQualityScheduler(zone);
  return cron.schedule(cronExpresion, scheduleAction);
};

export default createLogAirQualityTask;
