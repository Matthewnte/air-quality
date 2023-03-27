import commandLineArgs from 'command-line-args';
import logger from '../config/winston';
import connectDB from '../db';
import airQualityScheduler from './schedulers';

const optionDefinitions = [
  {
    name: 'start',
    alias: 's',
    type: String,
    defaultValue: true,
  },
];
// extract option from the commandline (i.e --start=false)
const options = commandLineArgs(optionDefinitions);

// start all jobs
export const runCronJobs = (): void => {
  airQualityScheduler.start();
};

// stop all jobs
export const stopCronJobs = (): void => {
  airQualityScheduler.stop();
};

// start or stop jobs depending on commandline options
if (options.start === true) {
  logger.info('starting up tasks...');
  connectDB().catch(error => { logger.error(error); });
  runCronJobs();
} else {
  logger.info('starting tasks...');
  stopCronJobs();
}
