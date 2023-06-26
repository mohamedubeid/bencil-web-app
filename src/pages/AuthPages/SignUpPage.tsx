import ImageSlider from '../../components/imageSlider/ImageSlider';
import SignUpForm from '../../components/auth/SignUpForm';
import AuthPagesStyle from './AuthPages.module';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const classes = AuthPagesStyle();
  return (
    <Box sx={classes.container}>
      <Box sx={classes.form_container}>
        <img src="/images/logo.svg" alt="bencil-logo" style={classes.logo} />
        <Typography variant="h1" mt='40px' > Welcome to Bencil</Typography>
        <Typography variant="subtitle1" color='secondary.dark' >Create an account or<Link to='/login' style={classes.login_style}>Log in</Link></Typography>
        <SignUpForm />
      </Box>
      <Box sx={classes.image_slider_container}>
        <ImageSlider />
      </Box>
    </Box>
  );
};

export default SignUpPage;
