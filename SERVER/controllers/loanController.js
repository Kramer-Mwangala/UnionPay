import Loan from '../models/Loan';
import Member from '../models/Member';
import * as loanService from '../services/loanService';
import * as apiResponse from '../utils/apiResponse';

/**
 * Get all loans with optional filtering
 */
const getAllLoans = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      memberId, 
      status,
      startDate,
      endDate,
      sortBy,
      sortDir
    } = req.query;
    
    const filterOptions = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      memberId,
      status,
      startDate,
      endDate,
      sortBy: sortBy || 'createdAt',
      sortDir: sortDir || 'desc'
    };
    
    const loans = await loanService.getLoans(filterOptions);
    
    return apiResponse.success(res, loans);
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Get a specific loan by ID
 */
const getLoanById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const loan = await loanService.getLoanById(id);
    
    if (!loan) {
      return apiResponse.notFound(res, 'Loan not found');
    }
    
    return apiResponse.success(res, { loan });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Create a loan application
 */
const createLoanApplication = async (req, res) => {
  try {
    const {
      memberId,
      amount,
      purpose,
      duration,
      guarantors,
      attachments
    } = req.body;
    
    // Basic validation
    if (!memberId || !amount || !purpose || !duration) {
      return apiResponse.badRequest(res, 'Missing required fields');
    }
    
    // Verify member exists
    const member = await Member.findById(memberId);
    if (!member) {
      return apiResponse.notFound(res, 'Member not found');
    }
    
    // Check if member already has an active loan
    const activeLoans = await Loan.find({
      memberId,
      status: { $in: ['pending', 'approved', 'disbursed'] }
    });
    
    if (activeLoans.length > 0) {
      return apiResponse.badRequest(res, 'Member already has an active loan');
    }
    
    const newLoan = await loanService.createLoan({
      memberId,
      amount,
      purpose,
      duration,
      guarantors,
      attachments,
      createdBy: req.user.id
    });
    
    return apiResponse.created(res, {
      message: 'Loan application created successfully',
      loan: newLoan
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Update loan status
 */
const updateLoanStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comments } = req.body;
    
    if (!status || !['pending', 'approved', 'rejected', 'disbursed', 'completed', 'defaulted', 'canceled'].includes(status)) {
      return apiResponse.badRequest(res, 'Valid status is required');
    }
    
    const loan = await Loan.findById(id);
    
    if (!loan) {
      return apiResponse.notFound(res, 'Loan not found');
    }
    
    const updatedLoan = await loanService.updateLoanStatus(id, status, comments, req.user.id);
    
    return apiResponse.success(res, {
      message: `Loan status updated to ${status} successfully`,
      loan: updatedLoan
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Record a loan repayment
 */
const recordLoanRepayment = async (req, res) => {
  try {
    const { loanId } = req.params;
    const { amount, paymentMethod, reference, paymentDate } = req.body;
    
    if (!amount || !paymentMethod) {
      return apiResponse.badRequest(res, 'Amount and payment method are required');
    }
    
    const loan = await Loan.findById(loanId);
    
    if (!loan) {
      return apiResponse.notFound(res, 'Loan not found');
    }
    
    const repayment = await loanService.recordRepayment({
      loanId,
      amount,
      paymentMethod,
      reference,
      paymentDate: paymentDate || new Date(),
      recordedBy: req.user.id
    });
    
    return apiResponse.success(res, {
      message: 'Loan repayment recorded successfully',
      repayment,
      loanStatus: repayment.loanStatus
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Get loan repayment schedule
 */
const getLoanRepaymentSchedule = async (req, res) => {
  try {
    const { loanId } = req.params;
    
    const loan = await Loan.findById(loanId);
    
    if (!loan) {
      return apiResponse.notFound(res, 'Loan not found');
    }
    
    const schedule = await loanService.generateRepaymentSchedule(loanId);
    
    return apiResponse.success(res, {
      loanDetails: {
        id: loan._id,
        amount: loan.amount,
        duration: loan.duration,
        interestRate: loan.interestRate,
        startDate: loan.disbursementDate,
        status: loan.status
      },
      schedule
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

export {
  getAllLoans,
  getLoanById,
  createLoanApplication,
  updateLoanStatus,
  recordLoanRepayment,
  getLoanRepaymentSchedule
};