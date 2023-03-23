import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

export = async function globalSetup () {
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();
  (global as any).__MONGOINSTANCE = instance;

  // The following is to make sure the database is clean before any test starts
  await mongoose.connect(uri);
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
};
