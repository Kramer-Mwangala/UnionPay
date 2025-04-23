import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema({
  enrollment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enrollment',
    required: true
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  claimNumber: {
    type: String,
    unique: true
  },
  claimType: {
    type: String,
    enum: ['medical', 'accident', 'death', 'disability', 'other'],
    required: true
  },
  incidentDate: {
    type: Date,
    required: true
  },
  filingDate: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true
  },
  amountClaimed: {
    type: Number,
    required: true
  },
  amountApproved: Number,
  status: {
    type: String,
    enum: ['submitted', 'under-review', 'approved', 'rejected', 'paid'],
    default: 'submitted'
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewDate: Date,
  paymentDate: Date,
  rejectionReason: String,
  documents: [{
    type: {
      type: String,
      enum: ['medical-report', 'invoice', 'receipt', 'police-report', 'other']
    },
    name: String,
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  notes: [{
    content: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

const Claim = mongoose.model('Claim', claimSchema);
export default Claim;