import app from './app';
import config from './config';
import logger from './config/winston';
import connectDB from './db';

connectDB()
  .then(() => logger.info('DB connection successful'))
  .catch((error) => logger.info(error.message));

app.listen(config.port, () => logger.info(`listening on port ${config.port}`));
