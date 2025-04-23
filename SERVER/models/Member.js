import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  idNumber: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: String,
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  address: {
    street: String,
    city: String,
    county: String,
    postalCode: String
  },
  skills: [String],
  membershipNumber: {
    type: String,
    unique: true
  },
  membershipStatus: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  nextOfKin: {
    name: String,
    relationship: String,
    phone: String
  },
  profilePhoto: String,
  documents: [{
    type: {
      type: String,
      enum: ['id', 'certificate', 'other']
    },
    url: String,
    verified: Boolean
  }]
}, { timestamps: true });

const Member = mongoose.model('Member', memberSchema);
export default Member;