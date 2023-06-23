import { useState } from 'react';
import SignUpFormStyle from './SignUpForm.module';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import PasswordTextField from '../ui/PasswordTextField';

interface FormData {
  password: string;
  // Add other form fields here
}

const SignUpForm: React.FC = () => {
  const classes = SignUpFormStyle();
  const [ showPassword, setShowPassword ] = useState( false );
  const handleClickShowPassword = () => setShowPassword( !showPassword );
  return (
    <Stack component='form' mt='16px' direction='column' spacing='8px' >
      <Stack direction='row' spacing='8px'>
        <TextField fullWidth size='small' placeholder='First Name' variant="outlined" />
        <TextField fullWidth placeholder='Last Name' variant="outlined" size='small' />
      </Stack>
      <PasswordTextField placeholder='Password' />
      <PasswordTextField placeholder='Confirm Password' />
      <TextField fullWidth size='small' placeholder='Email' variant="outlined" />
    </Stack>
  );
};

export default SignUpForm;
