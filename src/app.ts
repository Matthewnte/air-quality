import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(helmet());

app.get('/health', (_request, response) => {
  response.json({ status: 'up' });
});

app.all('*', (_request, response, next) => {
  return response.status(404).json({ status: 'error', message: 'Route not Found!' });
});

app.use(morgan('combined'));

export default app;
