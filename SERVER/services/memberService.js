// services/memberService.js
import Member from '../models/Member.js';
import User from '../models/User.js';
import { sendSMS } from '../config/africas-talking.js';

// Get all members with filtering
const getAllMembers = async (filter = {}, page = 1, limit = 10, sort = { createdAt: -1 }) => {
  try {
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort,
      populate: 'user',
      lean: true
    };

    const result = await Member.paginate(filter, options);
    return result;
  } catch (error) {
    throw error;
  }
};

// Get member by ID
const getMemberById = async (id) => {
  try {
    const member = await Member.findById(id).populate('user');
    if (!member) {
      throw new Error('Member not found');
    }
    return member;
  } catch (error) {
    throw error;
  }
};

// Create new member
const createMember = async (memberData) => {
  try {
    // Check if member with same ID number exists
    const existingMember = await Member.findOne({ idNumber: memberData.idNumber });
    if (existingMember) {
      throw new Error('Member with this ID number already exists');
    }

    // If user account is provided, check if it exists
    if (memberData.user) {
      const user = await User.findById(memberData.user);
      if (!user) {
        throw new Error('User account not found');
      }
    }

    // Create new member
    const member = new Member(memberData);
    await member.save();

    // Send welcome SMS if phone number is available
    if (member.phoneNumber) {
      const message = `Welcome to UnionPay! Your membership ID is ${member._id}. You can now access construction worker benefits through our platform.`;
      try {
        await sendSMS(member.phoneNumber, message);
      } catch (smsError) {
        console.error('Failed to send welcome SMS:', smsError);
        // Continue even if SMS fails
      }
    }

    return member;
  } catch (error) {
    throw error;
  }
};

// Update member
const updateMember = async (id, updateData) => {
  try {
    // Check if member exists
    const member = await Member.findById(id);
    if (!member) {
      throw new Error('Member not found');
    }

    // If updating ID number, check if it's unique
    if (updateData.idNumber && updateData.idNumber !== member.idNumber) {
      const existingMember = await Member.findOne({ idNumber: updateData.idNumber });
      if (existingMember) {
        throw new Error('Member with this ID number already exists');
      }
    }

    // Update member
    const updatedMember = await Member.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('user');

    return updatedMember;
  } catch (error) {
    throw error;
  }
};

// Update member status
const updateMemberStatus = async (id, status, reason = '') => {
  try {
    // Check if member exists
    const member = await Member.findById(id);
    if (!member) {
      throw new Error('Member not found');
    }

    // Update status
    member.status = status;
    member.statusReason = reason;
    member.statusUpdatedAt = new Date();

    await member.save();

    // Send notification if status changed to inactive or suspended
    if (['inactive', 'suspended'].includes(status) && member.phoneNumber) {
      const message = `Dear Member, your UnionPay account status has been changed to ${status}. ${reason ? 'Reason: ' + reason : ''}. For inquiries, please contact support.`;
      try {
        await sendSMS(member.phoneNumber, message);
      } catch (smsError) {
        console.error('Failed to send status update SMS:', smsError);
        // Continue even if SMS fails
      }
    }

    return member;
  } catch (error) {
    throw error;
  }
};

// Bulk update member status
const bulkUpdateMemberStatus = async (memberIds, status, reason = '') => {
  try {
    if (!Array.isArray(memberIds) || memberIds.length === 0) {
      throw new Error('No member IDs provided');
    }

    const updateTime = new Date();
    
    // Update all members
    const result = await Member.updateMany(
      { _id: { $in: memberIds } },
      { 
        $set: { 
          status,
          statusReason: reason,
          statusUpdatedAt: updateTime
        } 
      }
    );

    // Send notifications to updated members
    if (['inactive', 'suspended'].includes(status)) {
      const members = await Member.find({ _id: { $in: memberIds }, phoneNumber: { $exists: true } });
      
      for (const member of members) {
        const message = `Dear Member, your UnionPay account status has been changed to ${status}. ${reason ? 'Reason: ' + reason : ''}. For inquiries, please contact support.`;
        try {
          await sendSMS(member.phoneNumber, message);
        } catch (smsError) {
          console.error(`Failed to send status update SMS to ${member._id}:`, smsError);
          // Continue with next member even if SMS fails
        }
      }
    }

    return {
      modifiedCount: result.modifiedCount,
      status,
      reason,
      updatedAt: updateTime
    };
  } catch (error) {
    throw error;
  }
};

// Delete member
const deleteMember = async (id) => {
  try {
    const member = await Member.findByIdAndDelete(id);
    if (!member) {
      throw new Error('Member not found');
    }
    return { message: 'Member deleted successfully' };
  } catch (error) {
    throw error;
  }
};

// Search members
const searchMembers = async (query, page = 1, limit = 10) => {
  try {
    const searchRegex = new RegExp(query, 'i');
    
    const filter = {
      $or: [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { idNumber: searchRegex },
        { phoneNumber: searchRegex },
        { email: searchRegex }
      ]
    };
    
    return await getAllMembers(filter, page, limit);
  } catch (error) {
    throw error;
  }
};

export {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  updateMemberStatus,
  bulkUpdateMemberStatus,
  deleteMember,
  searchMembers
};