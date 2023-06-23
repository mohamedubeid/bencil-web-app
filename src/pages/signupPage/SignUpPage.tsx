import ImageSlider from '../../components/imageSlider/ImageSlider';
import SignUpForm from '../../components/auth/SignUpForm';
import SignUpPageStyle from './SignUpPage.module';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const classes = SignUpPageStyle();
  return (
    <Box sx={ classes.container }>
      <Box sx={ classes.signup_form_container }>
        <img src="/images/logo.svg" alt="bencil-logo" style={ classes.logo } />
        <Typography variant="h1"> Welcome to Bencil</Typography>
        <Typography variant="subtitle1">Create an account or<Link to='/login' style={ classes.login_style }>login</Link></Typography>
        <SignUpForm />
      </Box>
      <ImageSlider />
    </Box>
  );
};

export default SignUpPage;
