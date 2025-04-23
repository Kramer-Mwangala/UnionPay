import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import User from '../models/User.js';
import { apiResponse } from '../utils/apiResponse.js';
import smsService from '../services/smsService.js';

// Login with email/password
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Validate request
    if (!email || !password) {
      return apiResponse(res, 400, false, 'Email and password are required', null);
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    
    // Check if user exists
    if (!user) {
      return apiResponse(res, 401, false, 'Invalid email or password', null);
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return apiResponse(res, 401, false, 'Invalid email or password', null);
    }
    
    // Check user status
    if (user.status !== 'active') {
      return apiResponse(res, 403, false, `Your account is ${user.status}`, null);
    }
    
    // If 2FA is enabled, send verification code and return user ID
    if (user.twoFactorEnabled) {
      // Generate 2FA code
      const code = speakeasy.totp({
        secret: user.twoFactorSecret,
        encoding: 'base32'
      });
      
      // Send code via SMS
      await smsService.send2FACode(user.phone, code);

      return apiResponse(res, 200, true, '2FA code sent to your phone', {
        userId: user._id,
        requiresTwoFactor: true
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || '1d' }
    );
    
    // Update last login
    user.lastLogin = Date.now();
    await user.save();
    
    return apiResponse(res, 200, true, 'Login successful', {
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        twoFactorEnabled: user.twoFactorEnabled
      }
    });
  } catch (error) {
    next(error);
  }
};

// Verify 2FA code and complete login
export const verify2FA = async (req, res, next) => {
  try {
    const { userId, twoFactorCode } = req.body;
    
    // Find user
    const user = req.verifiedUser;
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || '1d' }
    );
    
    // Update last login
    user.lastLogin = Date.now();
    await user.save();
    
    return apiResponse(res, 200, true, 'Login successful', {
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        twoFactorEnabled: user.twoFactorEnabled
      }
    });
  } catch (error) {
    next(error);
  }
};

// Logout user
export const logout = (req, res) => {
  // JWT is stateless, so we can't invalidate it server-side
  // The client should remove the token from storage
  return apiResponse(res, 200, true, 'Logout successful', null);
};

// Enable 2FA for a user
export const enable2FA = async (req, res, next) => {
  try {
    const user = req.user;
    
    // Generate new secret
    const secret = speakeasy.generateSecret({
      name: `UnionPay:${user.email}`
    });
    
    // Save secret to user
    user.twoFactorSecret = secret.base32;
    await user.save();
    
    // Generate current code
    const code = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32'
    });
    
    // Send code via SMS
    await smsService.send2FACode(user.phone, code);
    
    return apiResponse(res, 200, true, '2FA setup initiated. Verification code sent to your phone', {
      userId: user._id
    });
  } catch (error) {
    next(error);
  }
};

// Verify and activate 2FA
export const activate2FA = async (req, res, next) => {
  try {
    const { twoFactorCode } = req.body;
    const user = req.user;
    
    // Verify the code
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: twoFactorCode
    });
    
    if (!verified) {
      return apiResponse(res, 401, false, 'Invalid verification code', null);
    }
    
    // Activate 2FA
    user.twoFactorEnabled = true;
    await user.save();
    
    return apiResponse(res, 200, true, '2FA successfully enabled', null);
  } catch (error) {
    next(error);
  }
};