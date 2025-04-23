import Payment from '../models/Payment';
import Member from '../models/Member';
import * as paymentService from '../services/paymentService';
import * as apiResponse from '../utils/apiResponse';

/**
 * Get payment history with optional filtering
 */
const getPaymentHistory = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      memberId, 
      startDate, 
      endDate, 
      status,
      type,
      sortBy,
      sortDir
    } = req.query;
    
    const filterOptions = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      memberId,
      startDate,
      endDate,
      status,
      type,
      sortBy: sortBy || 'createdAt',
      sortDir: sortDir || 'desc'
    };
    
    const payments = await paymentService.getPayments(filterOptions);
    
    return apiResponse.success(res, payments);
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Get a specific payment by ID
 */
const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const payment = await paymentService.getPaymentById(id);
    
    if (!payment) {
      return apiResponse.notFound(res, 'Payment not found');
    }
    
    return apiResponse.success(res, { payment });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Process a single payment
 */
const processPayment = async (req, res) => {
  try {
    const {
      memberId,
      amount,
      paymentMethod,
      description,
      paymentReference,
      paymentType,
      metadata
    } = req.body;
    
    // Basic validation
    if (!memberId || !amount || !paymentMethod || !paymentType) {
      return apiResponse.badRequest(res, 'Missing required fields');
    }
    
    // Verify member exists
    const member = await Member.findById(memberId);
    if (!member) {
      return apiResponse.notFound(res, 'Member not found');
    }
    
    // Process payment
    const paymentResult = await paymentService.processPayment({
      memberId,
      amount,
      paymentMethod,
      description,
      paymentReference,
      paymentType,
      metadata,
      processedBy: req.user.id
    });
    
    return apiResponse.success(res, {
      message: 'Payment processed successfully',
      payment: paymentResult
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Process bulk payments
 */
const processBulkPayments = async (req, res) => {
  try {
    const { payments, batchReference } = req.body;
    
    if (!payments || !Array.isArray(payments) || payments.length === 0) {
      return apiResponse.badRequest(res, 'Payment data is required');
    }
    
    // Process bulk payments
    const result = await paymentService.processBulkPayments(payments, batchReference, req.user.id);
    
    return apiResponse.success(res, {
      message: `${result.successful.length} payments processed successfully`,
      successful: result.successful,
      failed: result.failed,
      batchReference: result.batchReference
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Check payment status
 */
const checkPaymentStatus = async (req, res) => {
  try {
    const { paymentReference } = req.params;
    
    if (!paymentReference) {
      return apiResponse.badRequest(res, 'Payment reference is required');
    }
    
    const status = await paymentService.checkPaymentStatus(paymentReference);
    
    if (!status) {
      return apiResponse.notFound(res, 'Payment not found');
    }
    
    return apiResponse.success(res, { status });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Generate payment receipt
 */
const generateReceipt = async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    const payment = await Payment.findById(paymentId);
    
    if (!payment) {
      return apiResponse.notFound(res, 'Payment not found');
    }
    
    const receiptUrl = await paymentService.generateReceiptPDF(payment);
    
    return apiResponse.success(res, { 
      message: 'Receipt generated',
      receiptUrl 
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Handle payment callback from Africa's Talking
 */
const handlePaymentCallback = async (req, res) => {
  try {
    const callbackData = req.body;
    
    await paymentService.processPaymentCallback(callbackData);
    
    return apiResponse.success(res, { 
      message: 'Payment callback processed successfully' 
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

export {
  getPaymentHistory,
  getPaymentById,
  processPayment,
  processBulkPayments,
  checkPaymentStatus,
  generateReceipt,
  handlePaymentCallback
};