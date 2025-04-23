// services/loanService.js
import Loan from '../models/Loan.js';
import Member from '../models/Member.js';
import { sendSMS } from '../config/africas-talking.js';

// Get all loans with filtering
const getAllLoans = async (filter = {}, page = 1, limit = 10, sort = { createdAt: -1 }) => {
  try {
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort,
      populate: 'member',
      lean: true
    };

    const result = await Loan.paginate(filter, options);
    return result;
  } catch (error) {
    throw error;
  }
};

// Get loan by ID
const getLoanById = async (id) => {
  try {
    const loan = await Loan.findById(id).populate('member');
    if (!loan) {
      throw new Error('Loan not found');
    }
    return loan;
  } catch (error) {
    throw error;
  }
};

// Create loan application
const createLoanApplication = async (loanData) => {
  try {
    // Check if member exists
    const member = await Member.findById(loanData.member).populate('user');
    if (!member) {
      throw new Error('Member not found');
    }

    // Check if member is active
    if (member.status !== 'active') {
      throw new Error(`Cannot apply for loan. Member status is ${member.status}`);
    }

    // Check if member has pending or active loans
    const existingLoans = await Loan.find({
      member: member._id,
      status: { $in: ['pending', 'approved', 'disbursed'] }
    });

    if (existingLoans.length > 0) {
      throw new Error('Member already has a pending or active loan');
    }

    // Calculate loan terms based on amount
    const interestRate = 0.15; // 15% interest rate
    const loanTermMonths = loanData.amount <= 5000 ? 3 : 
                           loanData.amount <= 10000 ? 6 : 12;
    
    // Calculate monthly payment and total payable
    const monthlyInterest = interestRate / 12;
    const monthlyPayment = (loanData.amount * monthlyInterest) / 
                          (1 - Math.pow(1 + monthlyInterest, -loanTermMonths));
    const totalPayable = monthlyPayment * loanTermMonths;

    // Create new loan application
    const loan = new Loan({
      ...loanData,
      status: 'pending',
      interestRate,
      loanTermMonths,
      monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
      totalPayable: parseFloat(totalPayable.toFixed(2)),
      remainingBalance: parseFloat(totalPayable.toFixed(2))
    });

    await loan.save();

    // Send notification SMS
    if (member.phoneNumber) {
      const message = `Your loan application of ${loanData.amount} has been received. Loan ID: ${loan._id}. You will be notified when it's processed.`;
      try {
        await sendSMS(member.phoneNumber, message);
      } catch (smsError) {
        console.error('Failed to send loan application SMS:', smsError);
        // Continue even if SMS fails
      }
    }

    return loan;
  } catch (error) {
    throw error;
  }
};

// Update loan status
const updateLoanStatus = async (id, status, notes = '') => {
  try {
    // Check if loan exists
    const loan = await Loan.findById(id).populate('member');
    if (!loan) {
      throw new Error('Loan not found');
    }

    // Validate status transition
    const validTransitions = {
      pending: ['approved', 'rejected'],
      approved: ['disbursed', 'rejected'],
      disbursed: ['active', 'rejected'],
      active: ['completed', 'defaulted'],
      completed: [],
      rejected: [],
      defaulted: ['resolved']
    };

    if (!validTransitions[loan.status].includes(status)) {
      throw new Error(`Invalid status transition from ${loan.status} to ${status}`);
    }

    // Additional status-specific logic
    const updateData = { 
      status, 
      statusNotes: notes,
      statusUpdatedAt: new Date() 
    };
    
    if (status === 'disbursed') {
      updateData.disbursementDate = new Date();
      // Calculate due date based on term
      const dueDate = new Date();
      dueDate.setMonth(dueDate.getMonth() + loan.loanTermMonths);
      updateData.dueDate = dueDate;
    }
    
    if (status === 'active') {
      updateData.activationDate = new Date();
    }
    
    if (status === 'completed') {
      updateData.completionDate = new Date();
      updateData.remainingBalance = 0;
    }

    // Update loan
    const updatedLoan = await Loan.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('member');

    // Send notification SMS
    if (updatedLoan.member && updatedLoan.member.phoneNumber) {
      let message;
      
      switch (status) {
        case 'approved':
          message = `Your loan application of ${updatedLoan.amount} has been approved. We will disburse the funds soon.`;
          break;
        case 'rejected':
          message = `Your loan application has been rejected. Reason: ${notes || 'Did not meet criteria'}. Contact support for more information.`;
          break;
        case 'disbursed':
          message = `Your loan of ${updatedLoan.amount} has been disbursed. Monthly payment: ${updatedLoan.monthlyPayment}. Due date: ${updatedLoan.dueDate.toLocaleDateString()}.`;
          break;
        case 'completed':
          message = `Congratulations! Your loan has been fully repaid and is now closed.`;
          break;
        default:
          message = `Your loan status has been updated to ${status}. Loan ID: ${updatedLoan._id}.`;
      }
      
      try {
        await sendSMS(updatedLoan.member.phoneNumber, message);
      } catch (smsError) {
        console.error('Failed to send loan status update SMS:', smsError);
        // Continue even if SMS fails
      }
    }

    return updatedLoan;
  } catch (error) {
    throw error;
  }
};

// Process loan repayment
const processLoanRepayment = async (loanId, amount, paymentMethod, reference) => {
  try {
    // Check if loan exists
    const loan = await Loan.findById(loanId).populate('member');
    if (!loan) {
      throw new Error('Loan not found');
    }

    // Validate loan status
    if (!['disbursed', 'active'].includes(loan.status)) {
      throw new Error(`Cannot process payment for loan with status: ${loan.status}`);
    }

    // Validate amount
    if (amount <= 0) {
      throw new Error('Payment amount must be greater than zero');
    }

    // Process payment
    const remainingBalance = parseFloat((loan.remainingBalance - amount).toFixed(2));
    
    // Add payment to repayment history
    const payment = {
      amount,
      date: new Date(),
      method: paymentMethod,
      reference,
      previousBalance: loan.remainingBalance,
      newBalance: remainingBalance
    };

    // Update loan
    const updateData = {
      remainingBalance,
      $push: { repaymentHistory: payment },
      status: remainingBalance <= 0 ? 'completed' : 'active'
    };

    if (remainingBalance <= 0) {
      updateData.completionDate = new Date();
    }

    if (loan.status === 'disbursed') {
      updateData.status = 'active';
      updateData.activationDate = new Date();
    }

    const updatedLoan = await Loan.findByIdAndUpdate(
      loanId,
      updateData,
      { new: true, runValidators: true }
    ).populate('member');

    // Send notification SMS
    if (loan.member && loan.member.phoneNumber) {
      const message = `Payment of ${amount} received for loan ID: ${loan._id}. New balance: ${remainingBalance}. ${remainingBalance <= 0 ? 'Loan fully repaid!' : ''}`;
      try {
        await sendSMS(loan.member.phoneNumber, message);
      } catch (smsError) {
        console.error('Failed to send loan payment SMS:', smsError);
        // Continue even if SMS fails
      }
    }

    return {
      loan: updatedLoan,
      payment
    };
  } catch (error) {
    throw error;
  }
};

// Get loans by member ID
const getLoansByMember = async (memberId, page = 1, limit = 10) => {
  try {
    // Check if member exists
    const member = await Member.findById(memberId);
    if (!member) {
      throw new Error('Member not found');
    }

    return await getAllLoans({ member: memberId }, page, limit);
  } catch (error) {
    throw error;
  }
};

// Get loan analytics
const getLoanAnalytics = async () => {
  try {
    const aggregation = await Loan.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
          totalRemaining: { $sum: '$remainingBalance' }
        }
      },
      {
        $project: {
          status: '$_id',
          count: 1,
          totalAmount: 1,
          totalRemaining: 1,
          _id: 0
        }
      }
    ]);

    // Calculate overall stats
    const overallStats = {
      totalLoans: 0,
      totalLoanAmount: 0,
      totalRepaid: 0,
      totalRemaining: 0
    };

    aggregation.forEach(item => {
      overallStats.totalLoans += item.count;
      overallStats.totalLoanAmount += item.totalAmount;
      overallStats.totalRemaining += item.totalRemaining;
    });

    overallStats.totalRepaid = overallStats.totalLoanAmount - overallStats.totalRemaining;

    // Get monthly trends (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyTrends = await Loan.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: { 
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      },
      {
        $project: {
          yearMonth: { 
            $concat: [
              { $toString: '$_id.year' }, 
              '-', 
              { $toString: { $cond: [{ $lt: ['$_id.month', 10] }, { $concat: ['0', { $toString: '$_id.month' }] }, { $toString: '$_id.month' }] } }
            ]
          },
          count: 1,
          totalAmount: 1,
          _id: 0
        }
      }
    ]);

    return {
      statusBreakdown: aggregation,
      overallStats,
      monthlyTrends
    };
  } catch (error) {
    throw error;
  }
};

export {
  getAllLoans,
  getLoanById,
  createLoanApplication,
  updateLoanStatus,
  processLoanRepayment,
  getLoansByMember,
  getLoanAnalytics
};