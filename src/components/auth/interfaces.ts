import {SelectChangeEvent} from '@mui/material/Select';

export interface AuthContextType {
  user: any; // Replace 'User' with the actual type for user data
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  login: ({email, password, remember_me}: LogInData) => Promise<void>; // Specify the function signature with arguments
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  newPassword: (email: string, code: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  confirmRegister: (email: string, code: string) => Promise<void>;
  resendCodeRegister: (email: string) => Promise<void>;
};

export interface LogInData {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface SingUpForm {
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

export type User = Omit<SingUpForm, 'password' | 'confirm_password'>;

export const INITIAL_SIGN_UP_DATA: SingUpForm = {
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


export const INITIAL_LOG_IN_DATA: LogInData = {
  email: '',
  password: '',
  remember_me: false,
};

export interface ResetPasswordData {
  password: string;
  confirm_password: string;
}

export interface RefInputFieldProps {
  type?: string;
  inputRef: React.RefObject<HTMLInputElement>;
  placeholder: string;
  error?: boolean | undefined;
  helperText?: React.ReactNode;
}

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
    data: SingUpForm | undefined;
  };
}
