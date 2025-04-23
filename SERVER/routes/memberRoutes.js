// routes/memberRoutes.js
import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { validateMemberCreate, validateMemberUpdate } from '../middleware/validators.js';
import * as memberController from '../controllers/memberController.js';

const router = express.Router();

// Get all members with filtering
router.get('/', authenticate, memberController.getAllMembers);

// Get member details by ID
router.get('/:id', authenticate, memberController.getMemberById);

// Create new member
router.post('/', authenticate, validateMemberCreate, memberController.createMember);

// Update member details
router.put('/:id', authenticate, validateMemberUpdate, memberController.updateMember);

// Update member status
router.patch('/:id/status', authenticate, memberController.updateMemberStatus);

// Bulk update member status
router.patch('/status/bulk', authenticate, memberController.bulkUpdateMemberStatus);

// Delete member
router.delete('/:id', authenticate, memberController.deleteMember);

export default router;