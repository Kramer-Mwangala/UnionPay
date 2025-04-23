// services/authService.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../models/User.js';
import { sendVerificationCode } from '../config/africas-talking.js';

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { 
      sub: userId 
    },
    process.env.JWT_SECRET || 'your_jwt_secret',
    { 
      expiresIn: '1d' 
    }
  );
};

// Generate refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { 
      sub: userId 
    },
    process.env.REFRESH_TOKEN_SECRET || 'your_refresh_secret',
    { 
      expiresIn: '7d' 
    }
  );
};

// Register a new user
const registerUser = async (userData) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // Create new user
    const user = new User({
      ...userData,
      password: hashedPassword,
      isActive: true,
      role: userData.role || 'user',
    });

    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

// Login user
const loginUser = async (email, password) => {
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new Error('Account is disabled');
    }

    // Generate tokens
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
      refreshToken,
    };
  } catch (error) {
    throw error;
  }
};

// Generate and send 2FA code
const generate2FACode = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Generate random 6-digit code
    const code = crypto.randomInt(100000, 999999).toString();
    
    // Save code to user record with expiration time (5 minutes)
    user.twoFactorCode = code;
    user.twoFactorCodeExpires = Date.now() + 5 * 60 * 1000;
    await user.save();

    // Send code via SMS if phone number exists
    if (user.phoneNumber) {
      await sendVerificationCode(user.phoneNumber, code);
    }

    return { success: true };
  } catch (error) {
    throw error;
  }
};

// Verify 2FA code
const verify2FACode = async (userId, code) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Check if code is valid and not expired
    if (
      user.twoFactorCode !== code || 
      Date.now() > user.twoFactorCodeExpires
    ) {
      throw new Error('Invalid or expired verification code');
    }

    // Clear the code after successful verification
    user.twoFactorCode = undefined;
    user.twoFactorCodeExpires = undefined;
    await user.save();

    return { verified: true };
  } catch (error) {
    throw error;
  }
};

// Refresh access token
const refreshAccessToken = async (refreshToken) => {
  try {
    // Verify refresh token
    const decoded = jwt.verify(
      refreshToken, 
      process.env.REFRESH_TOKEN_SECRET || 'your_refresh_secret'
    );
    
    // Get user
    const user = await User.findById(decoded.sub);
    if (!user || !user.isActive) {
      throw new Error('Invalid refresh token');
    }

    // Generate new access token
    const newAccessToken = generateToken(user._id);
    
    return { token: newAccessToken };
  } catch (error) {
    throw error;
  }
};

// Change password
const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new Error('Current password is incorrect');
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    return { success: true };
  } catch (error) {
    throw error;
  }
};

export {
  registerUser,
  loginUser,
  generate2FACode,
  verify2FACode,
  refreshAccessToken,
  changePassword,
  generateToken,
  generateRefreshToken
};