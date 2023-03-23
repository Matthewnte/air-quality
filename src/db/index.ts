import { connect, set } from 'mongoose';
import config from '../config';

const connectDB = async (): Promise<typeof import('mongoose')> => {
  if (!config.database.url) {
    throw new Error('Please provide a database url string');
  }

  set('strictQuery', false);
  return await connect(config.database.url);
};

export default connectDB;
