import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'KES'
    }
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'temporary', 'casual'],
    required: true
  },
  skills: [String],
  experienceLevel: {
    type: String,
    enum: ['entry', 'intermediate', 'senior', 'expert']
  },
  educationRequirements: String,
  contactPerson: {
    name: String,
    email: String,
    phone: String
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  postDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: Date,
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active'
  },
  applicants: [{
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
    },
    applicationDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['applied', 'reviewed', 'interviewed', 'hired', 'rejected'],
      default: 'applied'
    }
  }]
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
export default Job;