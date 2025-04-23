import axios from 'axios';
import Payment from '../models/Payment.js';
import Member from '../models/Member.js';
import smsService from './smsService.js';
import { generateReference } from '../utils/helpers.js';

// Daraja API configuration 
const DARAJA_API = {
  baseUrl: process.env.DARAJA_API_BASE_URL,
  consumerKey: process.env.DARAJA_CONSUMER_KEY,
  consumerSecret: process.env.DARAJA_CONSUMER_SECRET,
  passKey: process.env.DARAJA_PASS_KEY,
  shortCode: process.env.DARAJA_SHORT_CODE,
  callbackUrl: process.env.DARAJA_CALLBACK_URL
};

class PaymentService {
  // Get OAuth token from Daraja API
  async getOAuthToken() {
    try {
      const response = await axios.get(
        `${DARAJA_API.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${DARAJA_API.consumerKey}:${DARAJA_API.consumerSecret}`).toString('base64')}`
          }
        }
      );
      
      return response.data.access_token;
    } catch (error) {
      console.error('OAuth Token Error:', error);
      throw new Error('Failed to get OAuth token');
    }
  }

  // Generate password for STK Push
  generatePassword(timestamp) {
    const { shortCode, passKey } = DARAJA_API;
    const password = Buffer.from(`${shortCode}${passKey}${timestamp}`).toString('base64');
    return password;
  }

  // Process single payment using STK Push
  async processSinglePayment(payment, user) {
    try {
      // Validate payment
      if (!payment.amount || !payment.phoneNumber || !payment.memberId) {
        throw new Error('Amount, phone number, and member ID are required');
      }

      // Find member
      const member = await Member.findById(payment.memberId);
      if (!member) {
        throw new Error('Member not found');
      }

      // Generate transaction reference
      const reference = generateReference(payment.paymentType);

      // Format phone number
      let phone = payment.phoneNumber.replace(/^\+/, '');
      if (phone.startsWith('254') && phone.length === 12) {
        // already valid
      } else if (phone.startsWith('0') && phone.length === 10) {
        phone = `254${phone.substring(1)}`;
      } else {
        throw new Error('Invalid phone number format');
      }

      // Get OAuth token
      const token = await this.getOAuthToken();

      // (Continue with STK Push logic here...)

    } catch (error) {
      console.error('Payment Processing Error:', error);
      throw error;
    }
  }
}

export default new PaymentService();
