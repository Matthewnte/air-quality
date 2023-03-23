import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;

// Setup DataBase
beforeAll(async () => {
  const uri = instance.getUri();
  await mongoose.connect(uri);
});

// Reset all data before Each test
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

// Close DB connections
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await instance.stop();
});
