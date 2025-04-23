// routes/insuranceRoutes.js
import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { validateEnrollment, validateClaim } from '../middleware/validators.js';
import * as insuranceController from '../controllers/insuranceController.js';

const router = express.Router();

// Get insurance plans
router.get('/plans', authenticate, insuranceController.getInsurancePlans);

// Get insurance plan details
router.get('/plans/:id', authenticate, insuranceController.getInsurancePlanById);

// Get member enrollments
router.get('/enrollments', authenticate, insuranceController.getMemberEnrollments);

// Get enrollment by ID
router.get('/enrollments/:id', authenticate, insuranceController.getEnrollmentById);

// Create enrollment
router.post('/enrollments', authenticate, validateEnrollment, insuranceController.createEnrollment);

// Get insurance claims
router.get('/claims', authenticate, insuranceController.getInsuranceClaims);

// Get claim by ID
router.get('/claims/:id', authenticate, insuranceController.getClaimById);

// Submit insurance claim
router.post('/claims', authenticate, validateClaim, insuranceController.submitInsuranceClaim);

// Update claim status
router.patch('/claims/:id/status', authenticate, insuranceController.updateClaimStatus);

export default router;