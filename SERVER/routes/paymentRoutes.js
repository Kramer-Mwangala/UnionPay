// routes/paymentRoutes.js
import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { validatePayment, validateBulkPayment } from '../middleware/validators.js';
import * as paymentController from '../controllers/paymentController.js';

const router = express.Router();

// Get payment history with filtering
router.get('/', authenticate, paymentController.getPaymentHistory);

// Get payment details by ID
router.get('/:id', authenticate, paymentController.getPaymentById);

// Process single payment
router.post('/', authenticate, validatePayment, paymentController.processPayment);

// Process bulk payments
router.post('/bulk', authenticate, validateBulkPayment, paymentController.processBulkPayments);

// Check payment status
router.get('/:id/status', authenticate, paymentController.checkPaymentStatus);

// Payment callback (for Africa's Talking webhook)
router.post('/callback', paymentController.paymentCallback);

export default router;