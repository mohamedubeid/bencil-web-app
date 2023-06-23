import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import PasswordTextField from './PasswordTextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputField from './InputField';
import Profession from './ProfessionSelectField';
import Button from '@mui/material/Button';

// interface FormData {
//   password: string;
//   // Add other form fields here
// }

const SignUpForm: React.FC = () => {
  return (
    <Stack component='form' mt='32px' direction='column' spacing='16px'>
      <Stack direction='row' spacing='8px'>
        <InputField placeholder='First Name' />
        <InputField placeholder='Last Name' />
      </Stack>
      <InputField placeholder='Email' />
      <PasswordTextField placeholder='Password' />
      <PasswordTextField placeholder='Confirm Password' />
      <InputField placeholder='username' startAdornment='@' />
      <Profession />
      <InputField placeholder='Birth Date' type='date' />
      <FormControlLabel
        control={<Checkbox
        // name="getEmails" checked={signupForm.getEmails} onChange={handleChange}
        />}//handle here
        label="Get useful tips and updates via email"
      />
      <Button variant='contained' size='large'>Join Now</Button>
    </Stack>
  );
};

export default SignUpForm;
