import Insurance from '../models/Insurance';
import Enrollment from '../models/Enrollment';
import Claim from '../models/Claim';
import Member from '../models/Member';
import * as insuranceService from '../services/insuranceService';
import * as apiResponse from '../utils/apiResponse';

/**
 * Get all available insurance plans
 */
const getInsurancePlans = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      type, 
      status,
      sortBy,
      sortDir 
    } = req.query;
    
    const filterOptions = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      type,
      status,
      sortBy: sortBy || 'createdAt',
      sortDir: sortDir || 'desc'
    };
    
    const plans = await insuranceService.getInsurancePlans(filterOptions);
    
    return apiResponse.success(res, plans);
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Get a specific insurance plan by ID
 */
const getInsurancePlanById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const plan = await insuranceService.getInsurancePlanById(id);
    
    if (!plan) {
      return apiResponse.notFound(res, 'Insurance plan not found');
    }
    
    return apiResponse.success(res, { plan });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Create a new insurance plan
 */
const createInsurancePlan = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      coverageDetails,
      premium,
      premiumFrequency,
      benefits,
      eligibilityCriteria,
      termsAndConditions
    } = req.body;
    
    // Basic validation
    if (!name || !description || !type || !coverageDetails || !premium || !premiumFrequency) {
      return apiResponse.badRequest(res, 'Missing required fields');
    }
    
    const newPlan = await insuranceService.createInsurancePlan({
      name,
      description,
      type,
      coverageDetails,
      premium,
      premiumFrequency,
      benefits,
      eligibilityCriteria,
      termsAndConditions,
      createdBy: req.user.id,
      status: 'active'
    });
    
    return apiResponse.created(res, {
      message: 'Insurance plan created successfully',
      plan: newPlan
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Update an insurance plan
 */
const updateInsurancePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const plan = await Insurance.findById(id);
    
    if (!plan) {
      return apiResponse.notFound(res, 'Insurance plan not found');
    }
    
    const updatedPlan = await insuranceService.updateInsurancePlan(id, updateData);
    
    return apiResponse.success(res, {
      message: 'Insurance plan updated successfully',
      plan: updatedPlan
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Get all member enrollments
 */
const getMemberEnrollments = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      memberId, 
      planId,
      status,
      sortBy,
      sortDir 
    } = req.query;
    
    const filterOptions = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      memberId,
      planId,
      status,
      sortBy: sortBy || 'createdAt',
      sortDir: sortDir || 'desc'
    };
    
    const enrollments = await insuranceService.getMemberEnrollments(filterOptions);
    
    return apiResponse.success(res, enrollments);
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Get a specific enrollment by ID
 */
const getEnrollmentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const enrollment = await insuranceService.getEnrollmentById(id);
    
    if (!enrollment) {
      return apiResponse.notFound(res, 'Enrollment not found');
    }
    
    return apiResponse.success(res, { enrollment });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Create a new enrollment
 */
const createEnrollment = async (req, res) => {
  try {
    const {
      memberId,
      planId,
      dependents,
      startDate,
      notes
    } = req.body;
    
    // Basic validation
    if (!memberId || !planId || !startDate) {
      return apiResponse.badRequest(res, 'Missing required fields');
    }
    
    // Verify member exists
    const member = await Member.findById(memberId);
    if (!member) {
      return apiResponse.notFound(res, 'Member not found');
    }
    
    // Verify plan exists
    const plan = await Insurance.findById(planId);
    if (!plan) {
      return apiResponse.notFound(res, 'Insurance plan not found');
    }
    
    // Check if member is already enrolled in this plan
    const existingEnrollment = await Enrollment.findOne({
      memberId,
      planId,
      status: { $in: ['active', 'pending'] }
    });
    
    if (existingEnrollment) {
      return apiResponse.badRequest(res, 'Member is already enrolled in this plan');
    }
    
    const newEnrollment = await insuranceService.createEnrollment({
      memberId,
      planId,
      dependents,
      startDate,
      notes,
      createdBy: req.user.id,
      status: 'pending'
    });
    
    return apiResponse.created(res, {
      message: 'Enrollment created successfully',
      enrollment: newEnrollment
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Update enrollment status
 */
const updateEnrollmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reason } = req.body;
    
    if (!status || !['pending', 'active', 'canceled', 'expired'].includes(status)) {
      return apiResponse.badRequest(res, 'Valid status is required');
    }
    
    const enrollment = await Enrollment.findById(id);
    
    if (!enrollment) {
      return apiResponse.notFound(res, 'Enrollment not found');
    }
    
    const updatedEnrollment = await insuranceService.updateEnrollmentStatus(id, status, reason, req.user.id);
    
    return apiResponse.success(res, {
      message: `Enrollment status updated to ${status} successfully`,
      enrollment: updatedEnrollment
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Get all insurance claims
 */
const getInsuranceClaims = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      memberId, 
      enrollmentId,
      planId,
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
      enrollmentId,
      planId,
      status,
      startDate,
      endDate,
      sortBy: sortBy || 'createdAt',
      sortDir: sortDir || 'desc'
    };
    
    const claims = await insuranceService.getInsuranceClaims(filterOptions);
    
    return apiResponse.success(res, claims);
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Get a specific claim by ID
 */
const getClaimById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const claim = await insuranceService.getClaimById(id);
    
    if (!claim) {
      return apiResponse.notFound(res, 'Claim not found');
    }
    
    return apiResponse.success(res, { claim });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Submit a new insurance claim
 */
const submitInsuranceClaim = async (req, res) => {
  try {
    const {
      enrollmentId,
      incidentDate,
      claimType,
      claimAmount,
      description,
      documents,
      additionalInfo
    } = req.body;
    
    // Basic validation
    if (!enrollmentId || !incidentDate || !claimType || !claimAmount || !description) {
      return apiResponse.badRequest(res, 'Missing required fields');
    }
    
    // Verify enrollment exists and is active
    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return apiResponse.notFound(res, 'Enrollment not found');
    }
    
    if (enrollment.status !== 'active') {
      return apiResponse.badRequest(res, `Enrollment is ${enrollment.status}, must be active to submit claims`);
    }
    
    const newClaim = await insuranceService.createClaim({
      enrollmentId,
      memberId: enrollment.memberId,
      planId: enrollment.planId,
      incidentDate,
      claimType,
      claimAmount,
      description,
      documents,
      additionalInfo,
      submittedBy: req.user.id,
      status: 'pending'
    });
    
    return apiResponse.created(res, {
      message: 'Insurance claim submitted successfully',
      claim: newClaim
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Update claim status
 */
const updateClaimStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, approvedAmount, comments } = req.body;
    
    if (!status || !['pending', 'under-review', 'approved', 'partially-approved', 'rejected', 'paid'].includes(status)) {
      return apiResponse.badRequest(res, 'Valid status is required');
    }
    
    const claim = await Claim.findById(id);
    
    if (!claim) {
      return apiResponse.notFound(res, 'Claim not found');
    }
    
    // If approving or partially approving, approvedAmount is required
    if ((status === 'approved' || status === 'partially-approved') && !approvedAmount) {
      return apiResponse.badRequest(res, 'Approved amount is required for approval');
    }
    
    const updatedClaim = await insuranceService.updateClaimStatus(id, {
      status,
      approvedAmount,
      comments,
      processedBy: req.user.id
    });
    
    return apiResponse.success(res, {
      message: `Claim status updated to ${status} successfully`,
      claim: updatedClaim
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

export {
  getInsurancePlans,
  getInsurancePlanById,
  createInsurancePlan,
  updateInsurancePlan,
  getMemberEnrollments,
  getEnrollmentById,
  createEnrollment,
  updateEnrollmentStatus,
  getInsuranceClaims,
  getClaimById,
  submitInsuranceClaim,
  updateClaimStatus
};