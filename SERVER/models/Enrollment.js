import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  insurance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Insurance',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  premiumAmount: {
    type: Number,
    required: true
  },
  beneficiaries: [{
    name: String,
    relationship: String,
    percentage: Number,
    contactInfo: String
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending', 'expired'],
    default: 'pending'
  },
  policyNumber: String,
  enrolledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  documents: [{
    type: String,
    url: String
  }],
  payments: [{
    amount: Number,
    date: Date,
    receipt: String,
    status: {
      type: String,
      enum: ['paid', 'pending', 'failed'],
      default: 'pending'
    }
  }]
}, { timestamps: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;