// config/database.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Database connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: true
};

// MongoDB connection URI from environment variables
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/unionpay';

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbURI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// If Node process ends, close the MongoDB connection
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed due to app termination');
  process.exit(0);
});

export { connectDB };