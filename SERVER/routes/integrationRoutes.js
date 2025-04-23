// routes/integrationRoutes.js
import express from 'express';
import * as integrationController from '../controllers/integrationController.js';
import { validateSMS } from '../middleware/validators.js';

const router = express.Router();

// USSD session handler
router.post('/ussd', integrationController.handleUSSDSession);

// Send SMS notifications
router.post('/sms/send', validateSMS, integrationController.sendSMSNotification);

// SMS callback handler
router.post('/sms/callback', integrationController.handleSMSCallback);

// Send 2FA verification codes
router.post('/2fa/send', integrationController.send2FAVerificationCode);

// Verify 2FA code
router.post('/2fa/verify', integrationController.verify2FACode);

// Handle Africa's Talking webhook notifications
router.post('/webhook/at', integrationController.handleATWebhook);

export default router;