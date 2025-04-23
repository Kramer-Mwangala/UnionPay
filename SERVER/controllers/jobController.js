import Job from '../models/Job';
import { successResponse, errorResponse } from '../utils/apiResponse';
import { validateJobData } from '../utils/validation';

/**
 * Job Controller - Handles all job posting related operations for the UnionPay system
 */
class JobController {
  /**
   * Get all jobs with optional filtering
   * @param {Object} req - Express request object with query parameters for filtering
   * @param {Object} res - Express response object
   */
  getAllJobs = async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        location,
        title,
        status,
        postedAfter,
        postedBefore,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query;

      // Build query filters
      const filter = {};
      if (location) filter.location = { $regex: location, $options: 'i' };
      if (title) filter.title = { $regex: title, $options: 'i' };
      if (status) filter.status = status;
      
      // Date range filters
      if (postedAfter || postedBefore) {
        filter.createdAt = {};
        if (postedAfter) filter.createdAt.$gte = new Date(postedAfter);
        if (postedBefore) filter.createdAt.$lte = new Date(postedBefore);
      }

      // Setup pagination and sorting
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const sort = {};
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

      // Execute query with pagination
      const jobs = await Job.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit));

      // Get total count for pagination
      const total = await Job.countDocuments(filter);
      
      return successResponse(res, {
        jobs,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit))
        }
      });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return errorResponse(res, 'Failed to fetch jobs', error);
    }
  };

  /**
   * Get job details by ID
   * @param {Object} req - Express request object with job ID in params
   * @param {Object} res - Express response object
   */
  getJobById = async (req, res) => {
    try {
      const { id } = req.params;
      const job = await Job.findById(id);
      
      if (!job) {
        return errorResponse(res, 'Job not found', null, 404);
      }
      
      return successResponse(res, { job });
    } catch (error) {
      console.error('Error fetching job details:', error);
      return errorResponse(res, 'Failed to fetch job details', error);
    }
  };

  /**
   * Create a new job posting
   * @param {Object} req - Express request object with job data in body
   * @param {Object} res - Express response object
   */
  createJob = async (req, res) => {
    try {
      const jobData = req.body;
      
      // Validate job data
      const { valid, errors } = validateJobData(jobData);
      if (!valid) {
        return errorResponse(res, 'Invalid job data', errors, 400);
      }
      
      // Create new job with user as creator
      const job = new Job({
        ...jobData,
        createdBy: req.user.id,
        status: 'open',
        createdAt: new Date()
      });
      
      await job.save();
      
      return successResponse(res, { job }, 201);
    } catch (error) {
      console.error('Error creating job:', error);
      return errorResponse(res, 'Failed to create job', error);
    }
  };

  /**
   * Update an existing job posting
   * @param {Object} req - Express request object with job ID in params and update data in body
   * @param {Object} res - Express response object
   */
  updateJob = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      // Validate update data
      const { valid, errors } = validateJobData(updateData, true);
      if (!valid) {
        return errorResponse(res, 'Invalid job data', errors, 400);
      }
      
      // Find job to update
      const job = await Job.findById(id);
      
      if (!job) {
        return errorResponse(res, 'Job not found', null, 404);
      }
      
      // Check if user has permission to update
      if (job.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
        return errorResponse(res, 'Not authorized to update this job', null, 403);
      }
      
      // Update job with new data
      Object.keys(updateData).forEach(key => {
        job[key] = updateData[key];
      });
      
      job.updatedAt = new Date();
      await job.save();
      
      return successResponse(res, { job });
    } catch (error) {
      console.error('Error updating job:', error);
      return errorResponse(res, 'Failed to update job', error);
    }
  };

  /**
   * Delete a job posting
   * @param {Object} req - Express request object with job ID in params
   * @param {Object} res - Express response object
   */
  deleteJob = async (req, res) => {
    try {
      const { id } = req.params;
      
      // Find job to delete
      const job = await Job.findById(id);
      
      if (!job) {
        return errorResponse(res, 'Job not found', null, 404);
      }
      
      // Check if user has permission to delete
      if (job.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
        return errorResponse(res, 'Not authorized to delete this job', null, 403);
      }
      
      await Job.findByIdAndDelete(id);
      
      return successResponse(res, { message: 'Job successfully deleted' });
    } catch (error) {
      console.error('Error deleting job:', error);
      return errorResponse(res, 'Failed to delete job', error);
    }
  };

  /**
   * Change job status (open, closed, filled)
   * @param {Object} req - Express request object with job ID in params and status in body
   * @param {Object} res - Express response object
   */
  updateJobStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!['open', 'closed', 'filled'].includes(status)) {
        return errorResponse(res, 'Invalid status value', null, 400);
      }
      
      const job = await Job.findById(id);
      
      if (!job) {
        return errorResponse(res, 'Job not found', null, 404);
      }
      
      // Check if user has permission
      if (job.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
        return errorResponse(res, 'Not authorized to update this job', null, 403);
      }
      
      job.status = status;
      job.updatedAt = new Date();
      
      await job.save();
      
      return successResponse(res, { job });
    } catch (error) {
      console.error('Error updating job status:', error);
      return errorResponse(res, 'Failed to update job status', error);
    }
  };

  /**
   * Search jobs by keyword (across title, description, skills, location)
   * @param {Object} req - Express request object with search term in query
   * @param {Object} res - Express response object
   */
  searchJobs = async (req, res) => {
    try {
      const { q, page = 1, limit = 10 } = req.query;
      
      if (!q) {
        return errorResponse(res, 'Search term is required', null, 400);
      }
      
      const filter = {
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } },
          { skills: { $regex: q, $options: 'i' } },
          { location: { $regex: q, $options: 'i' } }
        ]
      };
      
      // Setup pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);
      
      const jobs = await Job.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));
        
      const total = await Job.countDocuments(filter);
      
      return successResponse(res, {
        jobs,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit))
        }
      });
    } catch (error) {
      console.error('Error searching jobs:', error);
      return errorResponse(res, 'Failed to search jobs', error);
    }
  };
}

export default new JobController();