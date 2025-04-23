import mongoose from 'mongoose';

const insuranceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['health', 'life', 'accident', 'disability', 'retirement'],
    required: true
  },
  provider: String,
  coverageDetails: String,
  premiumAmount: {
    type: Number,
    required: true
  },
  premiumFrequency: {
    type: String,
    enum: ['monthly', 'quarterly', 'biannual', 'annual'],
    default: 'monthly'
  },
  benefits: [String],
  eligibility: String,
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  documents: [{
    name: String,
    url: String
  }]
}, { timestamps: true });

const Insurance = mongoose.model('Insurance', insuranceSchema);
export default Insurance;