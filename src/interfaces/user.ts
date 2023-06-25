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
