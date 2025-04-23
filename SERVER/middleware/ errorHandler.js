/**
 * Global error handling middleware for UnionPay API
 * Standardizes error responses across the application
 */

import { errorResponse } from '../utils/apiResponse';

class ErrorHandler {
  /**
   * Central error handling middleware
   * Catches all errors and formats them appropriately for client response
   */
  handleErrors = (err, req, res, next) => {
    console.error('Error:', err);

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      const validationErrors = {};
      
      // Extract validation error messages for each field
      for (const field in err.errors) {
        validationErrors[field] = err.errors[field].message;
      }
      
      return errorResponse(res, 'Validation Error', validationErrors, 400);
    }
    
    // Handle Mongoose cast errors (invalid ObjectId)
    if (err.name === 'CastError') {
      return errorResponse(res, `Invalid ${err.path}: ${err.value}`, null, 400);
    }
    
    // Handle duplicate key errors
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return errorResponse(res, `${field} already exists`, null, 409);
    }
    
    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
      return errorResponse(res, 'Invalid token', null, 401);
    }
    
    if (err.name === 'TokenExpiredError') {
      return errorResponse(res, 'Token expired', null, 401);
    }
    
    // Handle Africa's Talking API errors
    if (err.name === 'AfricasTalkingError') {
      return errorResponse(res, 'Integration service error', err.message, 502);
    }
    
    // Handle custom API errors
    if (err.statusCode) {
      return errorResponse(res, err.message, err.details, err.statusCode);
    }
    
    // Handle unexpected errors
    return errorResponse(
      res, 
      'Server Error', 
      process.env.NODE_ENV === 'development' ? err.message : null,
      500
    );
  };

  /**
   * Handle 404 errors for routes that don't exist
   */
  handleNotFound = (req, res) => {
    return errorResponse(res, `Endpoint not found: ${req.originalUrl}`, null, 404);
  };
}

export default new ErrorHandler();