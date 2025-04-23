// config/africas-talking.js
import AfricasTalking from 'africastalking';
import dotenv from 'dotenv';

dotenv.config();

// Africa's Talking API credentials from environment variables
const credentials = {
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME,
};

// Error if credentials are missing
if (!credentials.apiKey || !credentials.username) {
  console.error('Africa\'s Talking credentials missing. Check environment variables.');
}

// Initialize Africa's Talking SDK
const africasTalking = AfricasTalking(credentials);

// Get specific services
const sms = africasTalking.SMS;
const ussd = africasTalking.USSD;
const payment = africasTalking.PAYMENTS;
const voice = africasTalking.VOICE;
const airtime = africasTalking.AIRTIME;

// Helper function to send SMS
const sendSMS = async (recipients, message, from = null) => {
  try {
    const options = {
      to: Array.isArray(recipients) ? recipients : [recipients],
      message,
      from,
    };
    
    const response = await sms.send(options);
    return response;
  } catch (error) {
    console.error(`Error sending SMS: ${error.message}`);
    throw error;
  }
};

// Helper function to process payments
const processPayment = async (productName, amount, phoneNumber, currency = 'KES') => {
  try {
    const options = {
      productName,
      currencyCode: currency,
      amount,
      phoneNumber,
      metadata: {
        timestamp: new Date().toISOString(),
      },
    };
    
    const response = await payment.mobileCheckout(options);
    return response;
  } catch (error) {
    console.error(`Error processing payment: ${error.message}`);
    throw error;
  }
};

// Helper function to send 2FA verification codes
const sendVerificationCode = async (phoneNumber, code) => {
  try {
    const message = `Your UnionPay verification code is: ${code}. Valid for 5 minutes.`;
    return await sendSMS(phoneNumber, message);
  } catch (error) {
    console.error(`Error sending verification code: ${error.message}`);
    throw error;
  }
};

export {
  africasTalking,
  sms,
  ussd,
  payment,
  voice,
  airtime,
  sendSMS,
  processPayment,
  sendVerificationCode,
};