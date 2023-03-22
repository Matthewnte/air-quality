import app from './app';
import config from './config';
import logger from './config/winston';

app.listen(config.port, () => logger.info(`listening on port ${config.port}`));
