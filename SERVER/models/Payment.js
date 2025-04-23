import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentType: {
    type: String,
    enum: ['salary', 'bonus', 'loan', 'refund', 'other'],
    required: true
  },
  description: String,
  paymentMethod: {
    type: String,
    enum: ['mpesa', 'bank', 'cash', 'other'],
    required: true
  },
  transactionReference: String,
  transactionId: String,
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  phoneNumber: String,
  failureReason: String,
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;