import SignUpForm from '../../components/auth/SignUpForm';
import AuthPagesStyle from './AuthPages.module';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const classes = AuthPagesStyle();
  const location = useLocation();
  const signUpData = location.state?.signUpData || undefined;
  return (
    <Box>
      <Typography variant="h1" mt='40px' > Welcome to Bencil</Typography>
      <Typography variant="subtitle1" color='secondary.dark' >Create an account or<Link to='/auth/login' style={classes.navigate_style}>Log in</Link></Typography>
      <SignUpForm formData={signUpData} />
    </Box>

  );
};

export default SignUpPage;
