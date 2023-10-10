import AuthPagesStyle from './AuthPages.module';
import { LoginForm } from '../../components/auth';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';
import { paths } from '../../routes/paths';
import { Link } from '@mui/material';
import { RouterLink } from '../../routes/components';

const LoginPage: React.FC = () => {
  const classes = AuthPagesStyle();
  return (
    <>
      <Helmet><title>Login</title></Helmet>
      <Box>
        <Typography variant="h1" mt='80px' textAlign='center'  > Welcome Back!</Typography>
        <Typography variant="subtitle2" textAlign='center' color='secondary.dark'>The more you watch, the more you grow professionally.</Typography>
        <LoginForm />
        <Typography variant='subtitle1' color='secondary.dark' textAlign='center' mt='32px'>Don't have an account?
        <Link component={RouterLink}  to={paths.auth.register} style={classes.navigate_style}> Sign up </Link>
        </Typography>
      </Box>
    </>
  );
};

export default LoginPage;