import Joi from 'joi';
import {EmailValidation, PasswordValidation} from './Auth.schema';
import {LogInData} from '../components/auth/interfaces';

const LoginDataSchema: Joi.ObjectSchema<LogInData> = Joi.object({
  email: EmailValidation,
  password: PasswordValidation,
  remember_me: Joi.boolean().required(),
});

export default LoginDataSchema;
