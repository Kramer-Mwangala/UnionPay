import express from 'express';
import {
  login,
  verify2FA as verify2FAController,
  logout,
  enable2FA,
  activate2FA
} from '../controllers/authController.js';
import { authenticateJWT, verify2FA } from '../middleware/auth.js';

const router = express.Router();

// Login with email/password
router.post('/login', login);

// Verify 2FA and complete login
router.post('/verify-2fa', verify2FA, verify2FAController);

// Logout
router.post('/logout', authenticateJWT, logout);

// Enable 2FA setup
router.post('/enable-2fa', authenticateJWT, enable2FA);

// Verify and activate 2FA
router.post('/activate-2fa', authenticateJWT, activate2FA);

export default router;
