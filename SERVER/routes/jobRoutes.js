// routes/jobRoutes.js
import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { validateJobCreate, validateJobUpdate } from '../middleware/validators.js';
import * as jobController from '../controllers/jobController.js';

const router = express.Router();

// Get all jobs with filtering
router.get('/', authenticate, jobController.getAllJobs);

// Get job details by ID
router.get('/:id', authenticate, jobController.getJobById);

// Create job posting
router.post('/', authenticate, validateJobCreate, jobController.createJobPosting);

// Update job posting
router.put('/:id', authenticate, validateJobUpdate, jobController.updateJobPosting);

// Delete job posting
router.delete('/:id', authenticate, jobController.deleteJobPosting);

// Apply for job
router.post('/:id/apply', authenticate, jobController.applyForJob);

// Get applicants for a job
router.get('/:id/applicants', authenticate, jobController.getJobApplicants);

export default router;