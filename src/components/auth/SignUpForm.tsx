import { Box, Stack, TextField } from '@mui/material';
import SignUpFormStyle from './SignUpForm.module';

const SignUpForm = () => {
  const classes = SignUpFormStyle();
  return (
    <Stack component='form' mt='16px' direction='column' spacing='8px' >
      <Stack direction='row' spacing='8px'>
        <TextField fullWidth placeholder='First Name' variant="outlined" size='small' />
        <TextField fullWidth placeholder='Last Name' variant="outlined" size='small' />
      </Stack>
      <TextField fullWidth placeholder='Last Name' variant="outlined" size='small' />
      <TextField fullWidth placeholder='Last Name' variant="outlined" size='small' />
    </Stack>
  );
};

export default SignUpForm;
