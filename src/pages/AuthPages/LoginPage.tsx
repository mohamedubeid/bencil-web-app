import ImageSlider from '../../components/imageSlider/ImageSlider';
import AuthPagesStyle from './AuthPages.module';
import LoginForm from '../../components/auth/LoginForm';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const classes = AuthPagesStyle();
  return (
    <Box sx={classes.container}>
      <Box sx={classes.form_container}>
        <img src="/images/logo.svg" alt="bencil-logo" style={classes.logo} />
        <Typography variant="h1" mt='80px' textAlign='center'  > Welcome Back!</Typography>
        <Typography variant="subtitle2" textAlign='center' color='secondary.dark'>The more you watch, the more you grow professionally.</Typography>
        <LoginForm />
        <Typography variant='subtitle1' color='secondary.dark' textAlign='center' mt='32px'>Don't have an account?<Link to='/signup' style={classes.login_style}> Sign up</Link></Typography>
      </Box>
      <Box sx={classes.image_slider_container}>
        <ImageSlider />
      </Box>
    </Box>
  );
};

export default LoginPage;
