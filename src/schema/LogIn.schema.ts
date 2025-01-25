import Joi from 'joi';
import {EmailValidation, PasswordValidation} from './Auth.schema';
import {LoginDataType} from '../components/auth/interfaces';

const LoginDataSchema: Joi.ObjectSchema<LoginDataType> = Joi.object({
  email: EmailValidation,
  password: PasswordValidation,
  // remember_me: Joi.boolean().required(),
});

export default LoginDataSchema;
