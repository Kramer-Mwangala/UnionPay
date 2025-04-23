import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { apiResponse } from '../utils/apiResponse.js';
import speakeasy from 'speakeasy';

// Authentication middleware using JWT
export const authenticateJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return apiResponse(res, 401, false, 'Unauthorized access', null);
    }
    
    // Check if user account is active
    if (user.status !== 'active') {
      return apiResponse(res, 403, false, 'Account is not active', null);
    }
    
    req.user = user;
    next();
  })(req, res, next);
};

// Role-based authorization middleware
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return apiResponse(res, 401, false, 'Unauthorized access', null);
    }
    
    if (!roles.includes(req.user.role)) {
      return apiResponse(res, 403, false, 'You do not have permission to perform this action', null);
    }
    
    next();
  };
};

// Verify 2FA code middleware
export const verify2FA = async (req, res, next) => {
  try {
    const { userId, twoFactorCode } = req.body;
    
    if (!userId || !twoFactorCode) {
      return apiResponse(res, 400, false, 'User ID and 2FA code are required', null);
    }
    
    const user = await User.findById(userId);
    
    if (!user) {
      return apiResponse(res, 404, false, 'User not found', null);
    }
    
    if (!user.twoFactorEnabled) {
      // If 2FA not enabled, skip verification
      req.verifiedUser = user;
      return next();
    }
    
    // Verify the 2FA code
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: twoFactorCode
    });
    
    if (!verified) {
      return apiResponse(res, 401, false, 'Invalid 2FA code', null);
    }
    
    req.verifiedUser = user;
    next();
  } catch (error) {
    next(error);
  }
};