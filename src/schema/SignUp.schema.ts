import Joi from 'joi';
import {EmailValidation, PasswordValidation, ConfirmPasswordValidation} from './Auth.schema';
import { SingUpForm } from '../components/auth/interfaces';

const SignUpDataSchema: Joi.ObjectSchema<SingUpForm> = Joi.object({
  first_name: Joi.string().min(2).max(50).required().messages({
    'string.min': 'First name should be at least {#limit} characters',
    'string.max': 'First name should not exceed {#limit} characters',
    'string.required': 'First name is required',
    'string.empty': 'First name is required',
  }),
  last_name: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Last name should be at least {#limit} characters',
    'string.max': 'Last name should not exceed {#limit} characters',
    'string.required': 'Last name is required',
    'string.empty': 'Last name is required',
  }),
  email: EmailValidation,
  password: PasswordValidation,
  confirm_password: ConfirmPasswordValidation,
  username: Joi.string()
    .regex(/^[a-z0-9_]+$/)
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.pattern.base': 'Username should only contain lowercase characters, numbers, and underscores',
      'string.min': 'Username should have a minimum of {#limit} characters',
      'string.max': 'Username should have a maximum of {#limit} characters',
      'string.required': 'Username is required',
      'string.empty': 'Username is required',
    }),
  professions: Joi.array().items(Joi.string()).min(1).required().messages({
    'array.min': 'At least one profession must be selected',
    'array.required': 'Professions are required',
    'array.empty': 'Professions are required',
  }),
  birth_date: Joi.date().iso().max('now').required().messages({
    'date.max': 'Birth date cannot be in the future.',
    'date.required': 'Birth date is required.',
    'date.empty': 'Birth date is required.',
    'date.format': 'Birth date must be in YYYY-MM-DD format',
  }),
  news_letter: Joi.boolean().required(),
});

export default SignUpDataSchema;
