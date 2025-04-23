const Job = require('../models/Job');
const apiResponse = require('../utils/apiResponse');
const { validateJobData } = require('../utils/validation');

/**
 * Job Service - Contains business logic for job posting operations
 */
class JobService {
  /**
   * Get all jobs with optional filtering
   * @param {Object} filters - Filter criteria like status, location, etc.
   * @param {Number} page - Page number for pagination
   * @param {Number} limit - Number of items per page
   * @returns {Promise<Object>} Jobs and pagination info
   */
  async getAllJobs(filters = {}, page = 1, limit = 10) {
    try {
      const query = {};
      
      // Apply filters if provided
      if (filters.status) query.status = filters.status;
      if (filters.location) query.location = { $regex: filters.location, $options: 'i' };
      if (filters.jobType) query.jobType = filters.jobType;
      if (filters.skillsRequired) query.skillsRequired = { $in: filters.skillsRequired };
      if (filters.salary) {
        query.salary = {};
        if (filters.salary.min) query.salary.$gte = parseFloat(filters.salary.min);
        if (filters.salary.max) query.salary.$lte = parseFloat(filters.salary.max);
      }
      
      // Calculate pagination
      const skip = (page - 1) * limit;
      
      // Execute query with pagination
      const jobs = await Job.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      
      // Get total count for pagination
      const totalJobs = await Job.countDocuments(query);
      
      return {
        jobs,
        pagination: {
          total: totalJobs,
          page: page,
          limit: limit,
          pages: Math.ceil(totalJobs / limit)
        }
      };
    } catch (error) {
      throw new Error(`Error fetching jobs: ${error.message}`);
    }
  }

  /**
   * Get job details by ID
   * @param {String} jobId - Job ID
   * @returns {Promise<Object>} Job details
   */
  async getJobById(jobId) {
    try {
      const job = await Job.findById(jobId);
      if (!job) {
        throw new Error('Job not found');
      }
      return job;
    } catch (error) {
      throw new Error(`Error fetching job: ${error.message}`);
    }
  }

  /**
   * Create a new job posting
   * @param {Object} jobData - Job details
   * @returns {Promise<Object>} Created job
   */
  async createJob(jobData) {
    try {
      // Validate job data
      const { isValid, errors } = validateJobData(jobData);
      if (!isValid) {
        throw new Error(`Invalid job data: ${JSON.stringify(errors)}`);
      }
      
      // Create new job
      const newJob = new Job({
        title: jobData.title,
        description: jobData.description,
        company: jobData.company,
        location: jobData.location,
        salary: jobData.salary,
        jobType: jobData.jobType,
        skillsRequired: jobData.skillsRequired || [],
        qualifications: jobData.qualifications || [],
        applicationDeadline: jobData.applicationDeadline,
        contactEmail: jobData.contactEmail,
        contactPhone: jobData.contactPhone,
        status: jobData.status || 'active'
      });
      
      const savedJob = await newJob.save();
      return savedJob;
    } catch (error) {
      throw new Error(`Error creating job: ${error.message}`);
    }
  }

  /**
   * Update job posting details
   * @param {String} jobId - Job ID
   * @param {Object} updateData - Job data to update
   * @returns {Promise<Object>} Updated job
   */
  async updateJob(jobId, updateData) {
    try {
      // Check if job exists
      const job = await Job.findById(jobId);
      if (!job) {
        throw new Error('Job not found');
      }
      
      // Update job fields
      Object.keys(updateData).forEach(key => {
        job[key] = updateData[key];
      });
      
      // Save updated job
      const updatedJob = await job.save();
      return updatedJob;
    } catch (error) {
      throw new Error(`Error updating job: ${error.message}`);
    }
  }

  /**
   * Delete a job posting
   * @param {String} jobId - Job ID
   * @returns {Promise<Boolean>} Success status
   */
  async deleteJob(jobId) {
    try {
      const result = await Job.findByIdAndDelete(jobId);
      if (!result) {
        throw new Error('Job not found');
      }
      return true;
    } catch (error) {
      throw new Error(`Error deleting job: ${error.message}`);
    }
  }

  /**
   * Search for jobs by keyword
   * @param {String} keyword - Search keyword
   * @param {Number} page - Page number
   * @param {Number} limit - Results per page
   * @returns {Promise<Object>} Matching jobs
   */
  async searchJobs(keyword, page = 1, limit = 10) {
    try {
      const query = {
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
          { company: { $regex: keyword, $options: 'i' } },
          { location: { $regex: keyword, $options: 'i' } },
          { skillsRequired: { $regex: keyword, $options: 'i' } }
        ]
      };
      
      const skip = (page - 1) * limit;
      
      const jobs = await Job.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      
      const totalJobs = await Job.countDocuments(query);
      
      return {
        jobs,
        pagination: {
          total: totalJobs,
          page: page,
          limit: limit,
          pages: Math.ceil(totalJobs / limit)
        }
      };
    } catch (error) {
      throw new Error(`Error searching jobs: ${error.message}`);
    }
  }
}

module.exports = new JobService();