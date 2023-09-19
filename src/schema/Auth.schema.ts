import Joi from 'joi';
import {ResetPasswordData} from '../interfaces/Auth.interface';

export const EmailValidation = Joi.string()
  .email({tlds: {allow: false}})
  .min(3)
  .max(255)
  .required()
  .messages({
    'string.email': 'Invalid email address format',
    'string.min': 'Email should be at least {#limit} characters',
    'string.max': 'Email should not exceed {#limit} characters',
    'string.required': 'Email is required',
    'string.empty': 'Email is required',
  });

export const PasswordValidation = Joi.string()
  .pattern(/^(?=.*[!@#$%^&*])/)
  .min(8)
  .max(30)
  .required()
  .messages({
    'string.pattern.base': 'Password should contain at least one special character',
    'string.min': 'Password should have a minimum of {#limit} characters',
    'string.max': 'Password should have a maximum of {#limit} characters',
    'string.required': 'Password is required',
    'string.empty': 'Password is required',
  });

export const ConfirmPasswordValidation = Joi.string().valid(Joi.ref('password')).required().messages({
  'any.only': 'Confirm password must match the password',
  'any.required': 'Confirm password is required',
  'string.empty': 'Confirm Password is required',
});

export const ResetPasswordSchema: Joi.ObjectSchema<ResetPasswordData> = Joi.object({
  password: PasswordValidation,
  confirm_password: ConfirmPasswordValidation,
});
