import Member from '../models/Member';
import * as memberService from '../services/memberService';
import * as apiResponse from '../utils/apiResponse';

/**
 * Get all members with optional filtering
 */
const getAllMembers = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search, sortBy, sortDir } = req.query;
    
    const filterOptions = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      status,
      search,
      sortBy: sortBy || 'createdAt',
      sortDir: sortDir || 'desc'
    };
    
    const members = await memberService.getMembers(filterOptions);
    
    return apiResponse.success(res, members);
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Get a specific member by ID
 */
const getMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const member = await memberService.getMemberById(id);
    
    if (!member) {
      return apiResponse.notFound(res, 'Member not found');
    }
    
    return apiResponse.success(res, { member });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Create a new member
 */
const createMember = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      idNumber,
      phone,
      email,
      dateOfBirth,
      gender,
      location,
      skills,
      emergencyContact
    } = req.body;
    
    // Basic validation
    if (!firstName || !lastName || !idNumber || !phone) {
      return apiResponse.badRequest(res, 'Missing required fields');
    }
    
    // Check if member with ID number already exists
    const existingMember = await Member.findOne({ idNumber });
    if (existingMember) {
      return apiResponse.badRequest(res, 'Member with this ID number already exists');
    }
    
    // Check if member with phone already exists
    const memberWithPhone = await Member.findOne({ phone });
    if (memberWithPhone) {
      return apiResponse.badRequest(res, 'Member with this phone number already exists');
    }
    
    const newMember = await memberService.createMember({
      firstName,
      lastName,
      idNumber,
      phone,
      email,
      dateOfBirth,
      gender,
      location,
      skills,
      emergencyContact,
      status: 'active'
    });
    
    return apiResponse.created(res, {
      message: 'Member created successfully',
      member: newMember
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Update a member's information
 */
const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const member = await Member.findById(id);
    
    if (!member) {
      return apiResponse.notFound(res, 'Member not found');
    }
    
    // If updating ID number, check if it's already in use
    if (updateData.idNumber && updateData.idNumber !== member.idNumber) {
      const existingMember = await Member.findOne({ idNumber: updateData.idNumber });
      if (existingMember) {
        return apiResponse.badRequest(res, 'ID number already in use by another member');
      }
    }
    
    // If updating phone, check if it's already in use
    if (updateData.phone && updateData.phone !== member.phone) {
      const memberWithPhone = await Member.findOne({ phone: updateData.phone });
      if (memberWithPhone) {
        return apiResponse.badRequest(res, 'Phone number already in use by another member');
      }
    }
    
    const updatedMember = await memberService.updateMember(id, updateData);
    
    return apiResponse.success(res, {
      message: 'Member updated successfully',
      member: updatedMember
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Update a member's status
 */
const updateMemberStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reason } = req.body;
    
    if (!status || !['active', 'inactive', 'suspended', 'pending'].includes(status)) {
      return apiResponse.badRequest(res, 'Valid status is required');
    }
    
    const member = await Member.findById(id);
    
    if (!member) {
      return apiResponse.notFound(res, 'Member not found');
    }
    
    const updatedMember = await memberService.updateMemberStatus(id, status, reason);
    
    return apiResponse.success(res, {
      message: `Member status updated to ${status} successfully`,
      member: updatedMember
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Bulk update member status
 */
const bulkUpdateMemberStatus = async (req, res) => {
  try {
    const { memberIds, status, reason } = req.body;
    
    if (!memberIds || !Array.isArray(memberIds) || memberIds.length === 0) {
      return apiResponse.badRequest(res, 'Member IDs are required');
    }
    
    if (!status || !['active', 'inactive', 'suspended', 'pending'].includes(status)) {
      return apiResponse.badRequest(res, 'Valid status is required');
    }
    
    const result = await memberService.bulkUpdateMemberStatus(memberIds, status, reason);
    
    return apiResponse.success(res, {
      message: `${result.updated} members updated successfully`,
      failedIds: result.failedIds
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

/**
 * Delete a member
 */
const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    
    const member = await Member.findById(id);
    
    if (!member) {
      return apiResponse.notFound(res, 'Member not found');
    }
    
    await memberService.deleteMember(id);
    
    return apiResponse.success(res, {
      message: 'Member deleted successfully'
    });
  } catch (error) {
    return apiResponse.serverError(res, error.message);
  }
};

export {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  updateMemberStatus,
  bulkUpdateMemberStatus,
  deleteMember
};