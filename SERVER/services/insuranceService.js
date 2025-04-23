const Insurance = require('../models/Insurance');
const Enrollment = require('../models/Enrollment');
const Claim = require('../models/Claim');
const Member = require('../models/Member');
const { validateInsuranceData, validateClaimData } = require('../utils/validation');

/**
 * Insurance Service - Contains business logic for insurance management
 */
class InsuranceService {
  /**
   * Get all available insurance plans
   * @param {Object} filters - Optional filters for insurance plans
   * @returns {Promise<Array>} List of insurance plans
   */
  async getInsurancePlans(filters = {}) {
    try {
      const query = {};
      
      // Apply filters if provided
      if (filters.type) query.type = filters.type;
      if (filters.status) query.status = filters.status;
      
      const plans = await Insurance.find(query).sort({ premium: 1 });
      return plans;
    } catch (error) {
      throw new Error(`Error fetching insurance plans: ${error.message}`);
    }
  }

  /**
   * Get specific insurance plan by ID
   * @param {String} planId - Insurance plan ID
   * @returns {Promise<Object>} Insurance plan details
   */
  async getInsurancePlanById(planId) {
    try {
      const plan = await Insurance.findById(planId);
      if (!plan) {
        throw new Error('Insurance plan not found');
      }
      return plan;
    } catch (error) {
      throw new Error(`Error fetching insurance plan: ${error.message}`);
    }
  }

  /**
   * Get all member enrollments
   * @param {Object} filters - Filter criteria for enrollments
   * @param {Number} page - Page number for pagination
   * @param {Number} limit - Items per page
   * @returns {Promise<Object>} Enrollments with pagination info
   */
  async getMemberEnrollments(filters = {}, page = 1, limit = 10) {
    try {
      const query = {};
      
      // Apply filters
      if (filters.memberId) query.memberId = filters.memberId;
      if (filters.planId) query.planId = filters.planId;
      if (filters.status) query.status = filters.status;
      
      const skip = (page - 1) * limit;
      
      const enrollments = await Enrollment.find(query)
        .skip(skip)
        .limit(limit)
        .populate('memberId', 'name email phone')
        .populate('planId', 'name type coverage premium')
        .sort({ createdAt: -1 });
      
      const total = await Enrollment.countDocuments(query);
      
      return {
        enrollments,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(`Error fetching enrollments: ${error.message}`);
    }
  }

  /**
   * Get enrollment by ID
   * @param {String} enrollmentId - Enrollment ID
   * @returns {Promise<Object>} Enrollment details
   */
  async getEnrollmentById(enrollmentId) {
    try {
      const enrollment = await Enrollment.findById(enrollmentId)
        .populate('memberId', 'name email phone')
        .populate('planId', 'name type coverage premium');
      
      if (!enrollment) {
        throw new Error('Enrollment not found');
      }
      
      return enrollment;
    } catch (error) {
      throw new Error(`Error fetching enrollment: ${error.message}`);
    }
  }

  /**
   * Create new insurance enrollment
   * @param {Object} enrollmentData - Enrollment details
   * @returns {Promise<Object>} Created enrollment
   */
  async createEnrollment(enrollmentData) {
    try {
      // Validate member existence
      const member = await Member.findById(enrollmentData.memberId);
      if (!member) {
        throw new Error('Member not found');
      }
      
      // Validate insurance plan existence
      const plan = await Insurance.findById(enrollmentData.planId);
      if (!plan) {
        throw new Error('Insurance plan not found');
      }
      
      // Check if member is already enrolled in this plan
      const existingEnrollment = await Enrollment.findOne({
        memberId: enrollmentData.memberId,
        planId: enrollmentData.planId,
        status: { $in: ['active', 'pending'] }
      });
      
      if (existingEnrollment) {
        throw new Error('Member is already enrolled in this insurance plan');
      }
      
      // Create new enrollment
      const newEnrollment = new Enrollment({
        memberId: enrollmentData.memberId,
        planId: enrollmentData.planId,
        startDate: enrollmentData.startDate || new Date(),
        endDate: enrollmentData.endDate,
        premiumAmount: plan.premium,
        paymentFrequency: enrollmentData.paymentFrequency || 'monthly',
        dependents: enrollmentData.dependents || [],
        status: enrollmentData.status || 'pending'
      });
      
      const savedEnrollment = await newEnrollment.save();
      
      // Return populated enrollment
      return await Enrollment.findById(savedEnrollment._id)
        .populate('memberId', 'name email phone')
        .populate('planId', 'name type coverage premium');
    } catch (error) {
      throw new Error(`Error creating enrollment: ${error.message}`);
    }
  }

  /**
   * Update enrollment status
   * @param {String} enrollmentId - Enrollment ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated enrollment
   */
  async updateEnrollment(enrollmentId, updateData) {
    try {
      const enrollment = await Enrollment.findById(enrollmentId);
      if (!enrollment) {
        throw new Error('Enrollment not found');
      }
      
      // Update fields
      Object.keys(updateData).forEach(key => {
        enrollment[key] = updateData[key];
      });
      
      const updatedEnrollment = await enrollment.save();
      
      return await Enrollment.findById(updatedEnrollment._id)
        .populate('memberId', 'name email phone')
        .populate('planId', 'name type coverage premium');
    } catch (error) {
      throw new Error(`Error updating enrollment: ${error.message}`);
    }
  }

  /**
   * Get insurance claims with filters
   * @param {Object} filters - Filter criteria
   * @param {Number} page - Page number
   * @param {Number} limit - Items per page
   * @returns {Promise<Object>} Claims with pagination
   */
  async getInsuranceClaims(filters = {}, page = 1, limit = 10) {
    try {
      const query = {};
      
      // Apply filters
      if (filters.memberId) query.memberId = filters.memberId;
      if (filters.enrollmentId) query.enrollmentId = filters.enrollmentId;
      if (filters.status) query.status = filters.status;
      
      const skip = (page - 1) * limit;
      
      const claims = await Claim.find(query)
        .skip(skip)
        .limit(limit)
        .populate('memberId', 'name email phone')
        .populate('enrollmentId')
        .sort({ createdAt: -1 });
      
      const total = await Claim.countDocuments(query);
      
      return {
        claims,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(`Error fetching claims: ${error.message}`);
    }
  }

  /**
   * Get claim by ID
   * @param {String} claimId - Claim ID
   * @returns {Promise<Object>} Claim details
   */
  async getClaimById(claimId) {
    try {
      const claim = await Claim.findById(claimId)
        .populate('memberId', 'name email phone')
        .populate({
          path: 'enrollmentId',
          populate: {
            path: 'planId',
            model: 'Insurance'
          }
        });
      
      if (!claim) {
        throw new Error('Claim not found');
      }
      
      return claim;
    } catch (error) {
      throw new Error(`Error fetching claim: ${error.message}`);
    }
  }

  /**
   * Submit a new insurance claim
   * @param {Object} claimData - Claim details
   * @returns {Promise<Object>} Created claim
   */
  async submitClaim(claimData) {
    try {
      // Validate claim data
      const { isValid, errors } = validateClaimData(claimData);
      if (!isValid) {
        throw new Error(`Invalid claim data: ${JSON.stringify(errors)}`);
      }
      
      // Verify enrollment exists and is active
      const enrollment = await Enrollment.findById(claimData.enrollmentId);
      if (!enrollment) {
        throw new Error('Enrollment not found');
      }
      
      if (enrollment.status !== 'active') {
        throw new Error('Cannot submit claim for inactive enrollment');
      }
      
      // Create new claim
      const newClaim = new Claim({
        memberId: claimData.memberId,
        enrollmentId: claimData.enrollmentId,
        claimType: claimData.claimType,
        claimAmount: claimData.claimAmount,
        claimDate: claimData.claimDate || new Date(),
        incident: {
          date: claimData.incident.date,
          description: claimData.incident.description,
          location: claimData.incident.location
        },
        documents: claimData.documents || [],
        status: 'pending',
        notes: claimData.notes || ''
      });
      
      const savedClaim = await newClaim.save();
      
      return await Claim.findById(savedClaim._id)
        .populate('memberId', 'name email phone')
        .populate('enrollmentId');
    } catch (error) {
      throw new Error(`Error submitting claim: ${error.message}`);
    }
  }

  /**
   * Update claim status
   * @param {String} claimId - Claim ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated claim
   */
  async updateClaimStatus(claimId, updateData) {
    try {
      const claim = await Claim.findById(claimId);
      if (!claim) {
        throw new Error('Claim not found');
      }
      
      // Update fields
      Object.keys(updateData).forEach(key => {
        claim[key] = updateData[key];
      });
      
      const updatedClaim = await claim.save();
      
      return await Claim.findById(updatedClaim._id)
        .populate('memberId', 'name email phone')
        .populate({
          path: 'enrollmentId',
          populate: {
            path: 'planId',
            model: 'Insurance'
          }
        });
    } catch (error) {
      throw new Error(`Error updating claim: ${error.message}`);
    }
  }
}

module.exports = new InsuranceService();