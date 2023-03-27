import mongoose from 'mongoose';
import connectDB from '../db';

// Setup DataBase
beforeAll(async () => {
  await connectDB();
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
});
