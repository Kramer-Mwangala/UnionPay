/**
 * Logger middleware for UnionPay API
 * Logs all incoming requests and their responses
 */

import winston from 'winston';
import morgan from 'morgan';

class Logger {
  constructor() {
    // Configure Winston logger
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
      ),
      defaultMeta: { service: 'unionpay-api' },
      transports: [
        // Write all logs with level 'error' and below to error.log
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        // Write all logs with level 'info' and below to combined.log
        new winston.transports.File({ filename: 'logs/combined.log' })
      ]
    });

    // If we're in development, also log to the console
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      }));
    }

    // Create a stream object for morgan to use
    this.stream = {
      write: (message) => {
        this.logger.info(message.trim());
      }
    };
  }

  /**
   * Request logger middleware using morgan
   */
  requestLogger = () => {
    return morgan(
      // Define token format
      ':remote-addr :method :url :status :res[content-length] - :response-time ms',
      { stream: this.stream }
    );
  };

  /**
   * Custom logger middleware for additional request details
   */
  detailedLogger = (req, res, next) => {
    const startTime = new Date();
    
    // Log request
    this.logger.info({
      type: 'request',
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      userId: req.user ? req.user.id : 'unauthenticated',
      userAgent: req.get('user-agent'),
      body: this.sanitizeBody(req.body)
    });

    // Override res.json to log response
    const originalJson = res.json;
    res.json = (body) => {
      const responseTime = new Date() - startTime;
      
      // Log response (excluding sensitive data)
      this.logger.info({
        type: 'response',
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        responseTime: `${responseTime}ms`,
        userId: req.user ? req.user.id : 'unauthenticated'
      });
      
      res.json = originalJson;
      return res.json(body);
    };
    
    next();
  };

  /**
   * Log errors separately
   */
  errorLogger = (err, req, res, next) => {
    this.logger.error({
      type: 'error',
      message: err.message,
      stack: err.stack,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      userId: req.user ? req.user.id : 'unauthenticated'
    });
    
    next(err);
  };

  /**
   * Remove sensitive information from request body
   */
  sanitizeBody = (body) => {
    if (!body) return {};
    
    const sanitized = { ...body };
    
    // List of fields to sanitize
    const sensitiveFields = [
      'password', 
      'confirmPassword', 
      'currentPassword',
      'newPassword',
      'token',
      'accessToken',
      'refreshToken',
      'otpCode',
      'idNumber',
      'nationalId'
    ];
    
    sensitiveFields.forEach(field => {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    });
    
    return sanitized;
  };

  /**
   * General purpose logging methods
   */
  info = (message, meta = {}) => {
    this.logger.info(message, meta);
  };

  error = (message, error = null) => {
    this.logger.error(message, { error: error ? error.stack : null });
  };

  warn = (message, meta = {}) => {
    this.logger.warn(message, meta);
  };

  debug = (message, meta = {}) => {
    this.logger.debug(message, meta);
  };
}

export default new Logger();