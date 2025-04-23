const africasTalking = require('../config/africas-talking');
const Member = require('../models/Member');
const logger = require('../middleware/logger');

/**
 * SMS Service - Contains business logic for SMS operations
 */
class SmsService {
  /**
   * Send an SMS notification to a single member
   * @param {String} to - Phone number to send to
   * @param {String} message - Message content
   * @returns {Promise<Object>} SMS send result
   */
  async sendSms(to, message) {
    try {
      // Format the phone number (ensure it has country code)
      const formattedNumber = this.formatPhoneNumber(to);
      
      const options = {
        to: formattedNumber,
        message: message
      };
      
      // Send the SMS via Africa's Talking
      const result = await africasTalking.SMS.send(options);
      
      // Log the result
      logger.info(`SMS sent to ${formattedNumber}`, { result });
      
      return result;
    } catch (error) {
      logger.error(`Error sending SMS to ${to}: ${error.message}`);
      throw new Error(`Failed to send SMS: ${error.message}`);
    }
  }

  /**
   * Send bulk SMS to multiple recipients
   * @param {Array} recipients - Array of phone numbers
   * @param {String} message - Message content
   * @returns {Promise<Object>} Bulk SMS result
   */
  async sendBulkSms(recipients, message) {
    try {
      // Format all phone numbers
      const formattedNumbers = recipients.map(number => this.formatPhoneNumber(number));
      
      const options = {
        to: formattedNumbers,
        message: message
      };
      
      // Send bulk SMS
      const result = await africasTalking.SMS.send(options);
      
      // Log the result
      logger.info(`Bulk SMS sent to ${formattedNumbers.length} recipients`, { result });
      
      return result;
    } catch (error) {
      logger.error(`Error sending bulk SMS: ${error.message}`);
      throw new Error(`Failed to send bulk SMS: ${error.message}`);
    }
  }

  /**
   * Send SMS to members based on filters
   * @param {Object} filters - Member filters (e.g., status, region)
   * @param {String} message - Message content
   * @returns {Promise<Object>} SMS send result
   */
  async sendSmsToFilteredMembers(filters, message) {
    try {
      // Query members based on filters
      const members = await Member.find(filters).select('phone');
      
      if (members.length === 0) {
        throw new Error('No members match the provided filters');
      }
      
      // Extract phone numbers
      const phoneNumbers = members.map(member => member.phone);
      
      // Send bulk SMS
      return await this.sendBulkSms(phoneNumbers, message);
    } catch (error) {
      logger.error(`Error sending filtered SMS: ${error.message}`);
      throw new Error(`Failed to send filtered SMS: ${error.message}`);
    }
  }

  /**
   * Send 2FA verification code
   * @param {String} phone - Phone number
   * @param {String} code - Verification code
   * @returns {Promise<Object>} SMS send result
   */
  async send2FACode(phone, code) {
    try {
      const message = `Your UnionPay verification code is: ${code}. Valid for 5 minutes.`;
      return await this.sendSms(phone, message);
    } catch (error) {
      logger.error(`Error sending 2FA code: ${error.message}`);
      throw new Error(`Failed to send verification code: ${error.message}`);
    }
  }

  /**
   * Send payment notification
   * @param {String} phone - Member phone number
   * @param {Object} paymentInfo - Payment details
   * @returns {Promise<Object>} SMS send result
   */
  async sendPaymentNotification(phone, paymentInfo) {
    try {
      const message = `UnionPay: Payment of ${paymentInfo.currency} ${paymentInfo.amount} has been ${paymentInfo.status}. Reference: ${paymentInfo.reference}. Date: ${new Date().toLocaleDateString()}`;
      return await this.sendSms(phone, message);
    } catch (error) {
      logger.error(`Error sending payment notification: ${error.message}`);
      throw new Error(`Failed to send payment notification: ${error.message}`);
    }
  }

  /**
   * Send loan status update notification
   * @param {String} phone - Member phone number
   * @param {Object} loanInfo - Loan details
   * @returns {Promise<Object>} SMS send result
   */
  async sendLoanStatusNotification(phone, loanInfo) {
    try {
      const message = `UnionPay: Your loan application #${loanInfo.reference} has been ${loanInfo.status}. Amount: ${loanInfo.currency} ${loanInfo.amount}. For details call ${process.env.SUPPORT_PHONE || '+1234567890'}`;
      return await this.sendSms(phone, message);
    } catch (error) {
      logger.error(`Error sending loan notification: ${error.message}`);
      throw new Error(`Failed to send loan notification: ${error.message}`);
    }
  }

  /**
   * Process SMS callback from Africa's Talking
   * @param {Object} smsData - SMS data from callback
   * @returns {Promise<Boolean>} Processing result
   */
  async processSmsCallback(smsData) {
    try {
      // Log the incoming SMS
      logger.info('SMS callback received', { smsData });
      
      // Process based on the content of the SMS
      // This could trigger different actions based on keywords
      const from = smsData.from;
      const text = smsData.text.toLowerCase();
      
      // Example: Process balance inquiry
      if (text.includes('balance')) {
        // Find the member by phone number
        const member = await Member.findOne({ phone: from });
        if (member) {
          // Send balance response
          await this.sendSms(from, `Your current UnionPay balance is: ${member.currency || 'USD'} ${member.balance || '0.00'}`);
        } else {
          await this.sendSms(from, 'Phone number not registered with UnionPay. Please contact support.');
        }
      }
      
      // Process help requests
      else if (text.includes('help')) {
        const helpMessage = 'UnionPay SMS commands: BAL - Check balance, LOAN - Loan status, JOBS - Latest job postings, HELP - Show this menu';
        await this.sendSms(from, helpMessage);
      }
      
      // Add more command handlers as needed
      
      return true;
    } catch (error) {
      logger.error(`Error processing SMS callback: ${error.message}`);
      return false;
    }
  }

  /**
   * Format phone number to ensure it has country code
   * @param {String} phoneNumber - Phone number to format
   * @returns {String} Formatted phone number
   * @private
   */
  formatPhoneNumber(phoneNumber) {
    // Remove spaces, dashes, parentheses
    let formatted = phoneNumber.replace(/[\s\-()]/g, '');
    
    // If number doesn't start with +, add the default country code (Kenya)
    if (!formatted.startsWith('+')) {
      // Remove leading 0 if present
      if (formatted.startsWith('0')) {
        formatted = formatted.substring(1);
      }
      
      // Add Kenya country code (or use environment variable for default country code)
      formatted = `+${process.env.DEFAULT_COUNTRY_CODE || '254'}${formatted}`;
    }
    
    return formatted;
  }
}

module.exports = new SmsService();