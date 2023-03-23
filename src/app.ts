import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler';
import AppError from './utils/appError';

const app = express();

app.use(express.json());
app.use(helmet());

app.get('/health', (_request, response) => {
  response.json({ status: 'up' });
});

app.all('*', (_request, _response, next) => {
  next(new AppError('Route not Found!', 404));
});

app.use(errorHandler);

app.use(morgan('combined'));

export default app;
