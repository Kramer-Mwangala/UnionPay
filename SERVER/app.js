import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import routes
import authRoutes from './routes/authRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import insuranceRoutes from './routes/insuranceRoutes.js';
import integrationRoutes from './routes/integrationRoutes.js';

// Import middleware
import errorHandler from './middleware/errorHandler.js';
import logger from './middleware/logger.js';

// Database connection
import './config/database.js';

// Passport configuration
import './config/passport.js';

// Initialize Express app
const app = express();

// Set port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('dev')); // HTTP request logger
app.use(passport.initialize()); // Initialize passport
app.use(logger); // Custom logger

// Static files - Serve landing page
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/integration', integrationRoutes);

// API documentation route
app.use('/api-docs', express.static(path.join(__dirname, 'docs')));

// Serve the landing page for any non-API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`UnionPay API Server running on port ${PORT}`);
});

export default app; // For testing purposes