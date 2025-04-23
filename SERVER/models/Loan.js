import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  interestRate: {
    type: Number,
    required: true
  },
  term: {
    type: Number,
    required: true
  }, // In months
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'disbursed', 'repaid', 'defaulted'],
    default: 'pending'
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  approvalDate: Date,
  disbursementDate: Date,
  repaymentSchedule: [{
    date: Date,
    amount: Number,
    status: {
      type: String,
      enum: ['pending', 'paid', 'late', 'missed'],
      default: 'pending'
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment'
    }
  }],
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rejectionReason: String,
  documents: [{
    type: String,
    url: String
  }]
}, { timestamps: true });

const Loan = mongoose.model('Loan', loanSchema);
export default Loan;