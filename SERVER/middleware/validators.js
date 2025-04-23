/**
 * Request validation middleware for the UnionPay system
 * Provides validation for different API endpoints
 */

import { body, query, param, validationResult } from 'express-validator';
import { errorResponse } from '../utils/apiResponse';

class Validators {
  /**
   * Validate results and return errors if any
   */
  validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      errors.array().forEach(error => {
        validationErrors[error.param] = error.msg;
      });
      return errorResponse(res, 'Validation Error', validationErrors, 400);
    }
    next();
  };

  /**
   * Member validation rules
   */
  memberValidationRules = () => [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('phoneNumber')
      .notEmpty().withMessage('Phone number is required')
      .matches(/^\+?[0-9]{10,15}$/).withMessage('Valid phone number is required'),
    body('email')
      .optional()
      .isEmail().withMessage('Valid email is required'),
    body('idNumber')
      .notEmpty().withMessage('ID number is required')
      .isLength({ min: 5, max: 20 }).withMessage('ID number must be between 5-20 characters'),
    body('membershipType')
      .notEmpty().withMessage('Membership type is required')
      .isIn(['regular', 'premium', 'gold']).withMessage('Invalid membership type'),
    body('location')
      .notEmpty().withMessage('Location is required'),
    body('skills')
      .optional()
      .isArray().withMessage('Skills must be an array')
  ];

  /**
   * Job validation rules
   */
  jobValidationRules = () => [
    body('title')
      .notEmpty().withMessage('Job title is required')
      .isLength({ max: 100 }).withMessage('Title must be less than 100 characters'),
    body('description')
      .notEmpty().withMessage('Job description is required'),
    body('location')
      .notEmpty().withMessage('Job location is required'),
    body('salary.amount')
      .notEmpty().withMessage('Salary amount is required')
      .isNumeric().withMessage('Salary must be a number'),
    body('salary.currency')
      .notEmpty().withMessage('Salary currency is required')
      .isLength({ min: 3, max: 3 }).withMessage('Currency must be a 3-letter code'),
    body('salary.period')
      .notEmpty().withMessage('Salary period is required')
      .isIn(['hourly', 'daily', 'weekly', 'monthly', 'yearly']).withMessage('Invalid salary period'),
    body('contractType')
      .optional()
      .isIn(['full-time', 'part-time', 'contract', 'temporary']).withMessage('Invalid contract type'),
    body('applicationDeadline')
      .optional()
      .isISO8601().withMessage('Invalid date format for application deadline'),
    body('skills')
      .optional()
      .isArray().withMessage('Skills must be an array')
  ];

  /**
   * Payment validation rules
   */
  paymentValidationRules = () => [
    body('amount')
      .notEmpty().withMessage('Amount is required')
      .isNumeric().withMessage('Amount must be a number')
      .custom(value => value > 0).withMessage('Amount must be greater than 0'),
    body('currency')
      .notEmpty().withMessage('Currency is required')
      .isLength({ min: 3, max: 3 }).withMessage('Currency must be a 3-letter code'),
    body('phoneNumber')
      .notEmpty().withMessage('Phone number is required')
      .matches(/^\+?[0-9]{10,15}$/).withMessage('Valid phone number is required'),
    body('paymentType')
      .notEmpty().withMessage('Payment type is required')
      .isIn(['dues', 'loan', 'insurance', 'other']).withMessage('Invalid payment type'),
    body('description')
      .optional()
      .isLength({ max: 200 }).withMessage('Description must be less than 200 characters')
  ];

  /**
   * Loan validation rules
   */
  loanValidationRules = () => [
    body('memberId')
      .notEmpty().withMessage('Member ID is required'),
    body('amount')
      .notEmpty().withMessage('Loan amount is required')
      .isNumeric().withMessage('Amount must be a number')
      .custom(value => value > 0).withMessage('Amount must be greater than 0'),
    body('currency')
      .notEmpty().withMessage('Currency is required')
      .isLength({ min: 3, max: 3 }).withMessage('Currency must be a 3-letter code'),
    body('purpose')
      .notEmpty().withMessage('Loan purpose is required'),
    body('termMonths')
      .notEmpty().withMessage('Loan term is required')
      .isInt({ min: 1, max: 60 }).withMessage('Term must be between 1-60 months'),
    body('interestRate')
      .optional()
      .isNumeric().withMessage('Interest rate must be a number')
      .custom(value => value >= 0).withMessage('Interest rate cannot be negative')
  ];

  /**
   * Insurance validation rules
   */
  insuranceValidationRules = () => [
    body('memberId')
      .notEmpty().withMessage('Member ID is required'),
    body('planId')
      .notEmpty().withMessage('Insurance plan ID is required'),
    body('startDate')
      .notEmpty().withMessage('Start date is required')
      .isISO8601().withMessage('Invalid date format for start date'),
    body('coverageAmount')
      .notEmpty().withMessage('Coverage amount is required')
      .isNumeric().withMessage('Coverage amount must be a number')
      .custom(value => value > 0).withMessage('Coverage amount must be greater than 0'),
    body('beneficiaries')
      .optional()
      .isArray().withMessage('Beneficiaries must be an array'),
    body('beneficiaries.*.name')
      .optional()
      .isString().withMessage('Beneficiary name must be a string'),
    body('beneficiaries.*.relationship')
      .optional()
      .isString().withMessage('Beneficiary relationship must be a string'),
    body('beneficiaries.*.percentage')
      .optional()
      .isInt({ min: 1, max: 100 }).withMessage('Percentage must be between 1-100')
  ];

  /**
   * ID parameter validation
   */
  validateIdParam = () => [
    param('id').isMongoId().withMessage('Invalid ID format')
  ];

  /**
   * Pagination validation
   */
  paginationValidation = () => [
    query('page')
      .optional()
      .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1-100')
  ];

  /**
   * Date range validation
   */
  dateRangeValidation = () => [
    query('startDate')
      .optional()
      .isISO8601().withMessage('Start date must be in ISO format'),
    query('endDate')
      .optional()
      .isISO8601().withMessage('End date must be in ISO format')
      .custom((value, { req }) => {
        if (req.query.startDate && value) {
          return new Date(value) >= new Date(req.query.startDate);
        }
        return true;
      }).withMessage('End date must be after start date')
  ];
}

export default new Validators();