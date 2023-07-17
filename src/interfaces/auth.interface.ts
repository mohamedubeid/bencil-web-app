import {SelectChangeEvent} from '@mui/material/Select';

export interface SignUpData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  username: string;
  professions: string[];
  birth_date: string;
  news_letter: boolean;
}

export const INITIAL_SIGN_UP_DATA: SignUpData = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
  username: '',
  professions: [],
  birth_date: '',
  news_letter: false,
};

export interface LogInData {
  email: string;
  password: string;
  remember_me: boolean;
}

export const INITIAL_LOG_IN_DATA: LogInData = {
  email: '',
  password: '',
  remember_me: false,
};

export interface ResetPasswordData {
  password: string;
  confirm_password: string;
}

export const INITIAL_RESET_PASSWORD_DATA: ResetPasswordData = {
  password: '',
  confirm_password: '',
};

interface BaseInputFieldsProps {
  placeholder: string;
  name: string;
  value?: string;
  error?: boolean | undefined;
  helperText?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InputFieldProps extends BaseInputFieldsProps {
  type?: string;
  startAdornment?: React.ReactNode;
}

export interface PasswordTextFieldProps extends BaseInputFieldsProps {}

export interface ProfessionProps extends Omit<BaseInputFieldsProps, 'value' | 'onChange'> {
  onChange: (event: SelectChangeEvent<string[]>) => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>, profession: string) => void;
  value: string[];
}

export interface LocationState {
  state: {
    signUpData: SignUpData;
  };
}
