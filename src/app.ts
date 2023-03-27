import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { router } from './router';
import AppError from './utils/appError';
import { errorHandler } from './utils/errorHandler';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.get('/health', (_request, response) => {
  response.json({ status: 'up' });
});

app.use(morgan('combined'));

app.use('/api/v1', router);

app.all('*', (_request, _response, next) => {
  next(new AppError('Route not Found!', 404));
});

app.use(errorHandler);

export default app;
