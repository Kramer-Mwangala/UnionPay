// config/passport.js
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Import User model - adjust the path if necessary
import User from '../models/User.js';

dotenv.config();

// Configure local strategy for email/password login
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        // Find user by email
        const user = await User.findOne({ email });

        // If user doesn't exist
        if (!user) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        // Check if user is active
        if (!user.isActive) {
          return done(null, false, { message: 'Account is disabled. Please contact support.' });
        }

        // Return user if everything is valid
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// JWT options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret',
};

// Configure JWT strategy for token authentication
passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      // Find user by ID from JWT payload
      const user = await User.findById(jwtPayload.sub);

      // If user doesn't exist or is not active
      if (!user || !user.isActive) {
        return done(null, false);
      }

      // Return user if found
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;