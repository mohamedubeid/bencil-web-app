import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';
import AuthPagesStyle from './AuthPages.module';
import SimpleAlertMessage from '../../components/ui/SimpleAlertMessage';
import VerifyEmailInput from '../../components/auth/VerifyEmailInput';


const VerifyEmailPage = () => {
  const [ openAlert, setOpenAlert ] = useState( false );
  const location = useLocation();
  const signUpData = location.state?.signUpData;
  const email = signUpData.email;
  const classes = AuthPagesStyle();
  const handleCloseAlert = () => {
    setOpenAlert( false )
  }
  const handleOpenAlert = () => {
    setOpenAlert( true );
  }

  return (
    <Box sx={classes.verify_outer_container}>
      <img src="/images/logo.svg" alt="bencil-logo" style={classes.logo} />
      <Box sx={classes.verify_page_container}>
        <Typography variant='h2' sx={classes.verify_title}>Verify your Email address</Typography>
        <Typography variant='h3' >We email a security code to </Typography>
        <Typography variant='h3' fontWeight='700'>{email}</Typography>
        <Typography variant='h3' mb={4}>
          If you can't find it, check your spam folder
          <Typography component='span' variant='h2' >.</Typography>
          <Link to='/signup'><Typography color='secondary.dark' variant='h3' component='span' fontWeight='bold'>Wrong email?</Typography></Link>
        </Typography>
        <VerifyEmailInput codeLength={6} />
        <Stack sx={classes.verify_action}>
          <Button variant='contained' size='medium' color='secondary' sx={classes.continue_button}>Continue Without Verify</Button>
          <Button variant='contained' size='medium' sx={classes.verify_button} >Verify</Button>
        </Stack>
        <Typography variant='h3' mt={8} >
          Still no code?
          <Button variant='text' disableRipple sx={classes.get_another_code} onClick={handleOpenAlert} >Get another one</Button>
        </Typography>
        <SimpleAlertMessage duration={6000} message='Another code sent successfully' handleClose={handleCloseAlert} open={openAlert} />
      </Box >
    </Box >
  );
};
export default VerifyEmailPage