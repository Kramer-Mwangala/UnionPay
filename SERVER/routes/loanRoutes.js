// routes/loanRoutes.js
import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { validateLoanCreate, validateLoanUpdate } from '../middleware/validators.js';
import * as loanController from '../controllers/loanController.js';

const router = express.Router();

// Get all loans with filtering
router.get('/', authenticate, loanController.getAllLoans);

// Get loan details by ID
router.get('/:id', authenticate, loanController.getLoanById);

// Create loan application
router.post('/', authenticate, validateLoanCreate, loanController.createLoanApplication);

// Update loan status
router.patch('/:id/status', authenticate, loanController.updateLoanStatus);

// Get loans by member ID
router.get('/member/:memberId', authenticate, loanController.getLoansByMember);

// Get loan analytics and statistics
router.get('/analytics', authenticate, loanController.getLoanAnalytics);

export default router;