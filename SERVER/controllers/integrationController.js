import Member from '../models/Member';
import * as ussdService from '../services/ussdService';
import * as smsService from '../services/smsService';
import * as apiResponse from '../utils/apiResponse';
import * as africasTalking from '../config/africas-talking.js';

/**
 * Handle USSD session
 */
const handleUSSDSession = async (req, res) => {
  try {
    const {
      sessionId,
      serviceCode,
      phoneNumber,
      text
    } = req.body;
    
    if (!sessionId || !serviceCode || !phoneNumber) {
      return res.status(400).send('Missing required parameters');
    }
    
    // Format phone number to standard format
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
    
    // Process USSD session
    const response = await ussdService.processUSSDRequest({
      sessionId,
      serviceCode,
      phoneNumber: formattedPhone,
      text
    });
    
    // Africa's Talking expects plain text response with CON or END prefix
    return res.contentType('text/plain').send(response);
  } catch (error) {
    console.error('USSD Error:', error);
    return res.contentType('text/plain').send('END An error occurred. Please try again later.');
  }
};

/**
 * Send SMS notification
 */
const sendSMSNotification = async (req, res) => {
  try {
    const { recipientPhone, message, messageType, metadata } = req.body;
    
    if (!recipientPhone || !message) {
      return apiResponse.badRequest(res, 'Recipient phone and message are required');
    }
    
    // Format phone number to standard format
    const formattedPhone = recipientPhone.startsWith('+') ? recipientPhone : `+${recipientPhone}`;
    
    // Send SMS
    const result = await smsService.sendSMS({
      to: formattedPhone,
      message,
      messageType: messageType || 'notification',
      metadata: metadata || {},
      sentBy: req.user.id
    });
    
    return apiResponse.success(res, {
      message: 'SMS notification sent successfully',
      messageId: result.messageId,
      status: result.status
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Send SMS notifications in bulk
 */
const sendBulkSMSNotifications = async (req, res) => {
  try {
    const { recipients, message, messageType, metadata } = req.body;
    
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0 || !message) {
      return apiResponse.badRequest(res, 'Recipients list and message are required');
    }
    
    // Format phone numbers
    const formattedRecipients = recipients.map(phone => {
      return phone.startsWith('+') ? phone : `+${phone}`;
    });
    
    // Send bulk SMS
    const result = await smsService.sendBulkSMS({
      to: formattedRecipients,
      message,
      messageType: messageType || 'notification',
      metadata: metadata || {},
      sentBy: req.user.id
    });
    
    return apiResponse.success(res, {
      message: 'Bulk SMS notifications sent successfully',
      successCount: result.successCount,
      failureCount: result.failureCount,
      messageId: result.messageId,
      status: result.status
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Handle SMS callback from Africa's Talking
 */
const handleSMSCallback = async (req, res) => {
  try {
    const callbackData = req.body;
    
    // Validate callback data
    if (!callbackData || !callbackData.id || !callbackData.status) {
      return apiResponse.badRequest(res, 'Invalid callback data');
    }
    
    // Process SMS delivery report
    await smsService.processSMSCallback(callbackData);
    
    return apiResponse.success(res, {
      message: 'SMS callback processed successfully'
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Send 2FA verification code
 */
const send2FAVerificationCode = async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone) {
      return apiResponse.badRequest(res, 'Phone number is required');
    }
    
    // Format phone number to standard format
    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
    
    // Find member or user with this phone
    const member = await Member.findOne({ phone: formattedPhone });
    
    if (!member) {
      return apiResponse.notFound(res, 'No account found with this phone number');
    }
    
    // Generate and send verification code
    const { code, reference } = await smsService.send2FACode(formattedPhone);
    
    return apiResponse.success(res, {
      message: 'Verification code sent successfully',
      reference,
      expiresIn: '10 minutes'
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Verify 2FA code sent via SMS
 */
const verify2FACode = async (req, res) => {
  try {
    const { phone, code, reference } = req.body;
    
    if (!phone || !code || !reference) {
      return apiResponse.badRequest(res, 'Phone number, code, and reference are required');
    }
    
    // Format phone number to standard format
    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
    
    // Verify code
    const result = await smsService.verify2FACode(formattedPhone, code, reference);
    
    if (!result.verified) {
      return apiResponse.badRequest(res, result.message || 'Invalid verification code');
    }
    
    return apiResponse.success(res, {
      message: 'Code verified successfully',
      verified: true
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Send payment notification via SMS
 */
const sendPaymentNotification = async (req, res) => {
  try {
    const { memberId, paymentId, paymentAmount, paymentType } = req.body;
    
    if (!memberId || !paymentId || !paymentAmount || !paymentType) {
      return apiResponse.badRequest(res, 'Member ID, payment details are required');
    }
    
    // Find member
    const member = await Member.findById(memberId);
    
    if (!member) {
      return apiResponse.notFound(res, 'Member not found');
    }
    
    // Send payment notification
    const result = await smsService.sendPaymentNotification({
      phone: member.phone,
      name: `${member.firstName} ${member.lastName}`,
      paymentId,
      amount: paymentAmount,
      paymentType,
      date: new Date()
    });
    
    return apiResponse.success(res, {
      message: 'Payment notification sent successfully',
      messageId: result.messageId,
      status: result.status
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Send custom template-based SMS
 */
const sendTemplateSMS = async (req, res) => {
  try {
    const { templateName, recipient, templateData } = req.body;
    
    if (!templateName || !recipient || !templateData) {
      return apiResponse.badRequest(res, 'Template name, recipient, and template data are required');
    }
    
    // Format phone number to standard format
    const formattedPhone = recipient.startsWith('+') ? recipient : `+${recipient}`;
    
    // Send template SMS
    const result = await smsService.sendTemplateSMS({
      to: formattedPhone,
      templateName,
      templateData,
      sentBy: req.user.id
    });
    
    return apiResponse.success(res, {
      message: 'Template SMS sent successfully',
      messageId: result.messageId,
      status: result.status
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Get USSD menu configuration
 */
const getUSSDMenuConfig = async (req, res) => {
  try {
    const menuConfig = await ussdService.getMenuConfiguration();
    
    return apiResponse.success(res, { menuConfig });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Update USSD menu configuration
 */
const updateUSSDMenuConfig = async (req, res) => {
  try {
    const { menuItems } = req.body;
    
    if (!menuItems || !Array.isArray(menuItems) || menuItems.length === 0) {
      return apiResponse.badRequest(res, 'Valid menu items are required');
    }
    
    const updatedConfig = await ussdService.updateMenuConfiguration(menuItems);
    
    return apiResponse.success(res, {
      message: 'USSD menu configuration updated successfully',
      menuConfig: updatedConfig
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

export {
  handleUSSDSession,
  sendSMSNotification,
  sendBulkSMSNotifications,
  handleSMSCallback,
  send2FAVerificationCode,
  verify2FACode,
  sendPaymentNotification,
  sendTemplateSMS,
  getUSSDMenuConfig,
  updateUSSDMenuConfig
};