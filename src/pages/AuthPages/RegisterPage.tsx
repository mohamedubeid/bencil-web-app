import { SignUpForm } from '../../components/auth';
import AuthPagesStyle from './AuthPages.module';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import { RouterLink } from '../../routes/components';
import { useLocation } from '../../routes/hooks';
import { paths } from '../../routes/paths';
import { Helmet } from 'react-helmet-async';

const RegisterPage: React.FC = () => {
  const classes = AuthPagesStyle();
  const location = useLocation();
  
  const signUpData = location.state?.data || undefined; // change it try to use context here
  return (
    <>
      <Helmet><title>Register</title></Helmet>
      <Box>
        <Typography variant="h1" mt='40px' > Welcome to Bencil</Typography>
        <Typography variant="subtitle1" color='secondary.dark' >Create an account or<Link component={RouterLink} to={paths.auth.login} style={classes.navigate_style}>Log in</Link></Typography>
        <SignUpForm formData={signUpData} />
      </Box>
    </>
  );
};

export default RegisterPage;
