import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AuthPagesStyle from './AuthPages.module';
import { SimpleAlertMessage } from '../../components/ui';
import { SimpleAlertMessageProps } from '../../components/ui/interfaces';
import { VerificationCodeInput } from '../../components/auth';
import { SingUpForm, LocationState } from '../../components/auth/interfaces';
// import { handleSendingCode } from './AuthUtils';
import { VERIFY_EMAIL_CODE_LENGTH } from "../../config/variables";
import { useRouter, useLocation } from '../../routes/hooks';
import { Helmet } from 'react-helmet-async';


const VerifyEmailPage = () => {

  const router = useRouter();
  const location = useLocation();

  const [ verificationCode, setVerificationCode ] = useState<string>( '' );

  const [ anotherCodeAlrt, setAnotherCodeAlrt ] = useState<Omit<SimpleAlertMessageProps, 'handleClose' | 'duration'>>( {
    open: false,
    severity: 'success',
    message: 'notify message',
  } );

  const [ verifyAlert, setVerifyAlert ] = useState<Omit<SimpleAlertMessageProps, 'handleClose' | 'duration'>>( {
    open: false,
    severity: 'success',
    message: 'Verified',
  } );

  const signUpData: SingUpForm | undefined = location.state?.data || undefined;
  const email = signUpData?.email;

  const classes = AuthPagesStyle();

  const handleCloseAnotherCodeAlrt = () => {
    setAnotherCodeAlrt( ( prevState ) => ( {
      ...prevState,
      open: false,
    } ) );
  }
  const handleCloseVerifyAlert = () => {
    setVerifyAlert( ( prevState ) => ( {
      ...prevState,
      open: false,
    } ) );
  }

  const handleVerificationCodeChange = ( code: string ) => {
    setVerificationCode( code );
  };

  const handleVerify = () => {
    if ( verificationCode.length < VERIFY_EMAIL_CODE_LENGTH ) {
      setVerifyAlert( ( prevState ) => ( {
        ...prevState,
        open: true,
        severity: 'warning',
        message: 'You need to write the code first before continue'
      } ) );
      return;
    }
    const isVerify = true;
    if ( isVerify ) {
      setVerifyAlert( ( prevState ) => ( {
        ...prevState,
        open: true,
        severity: 'success',
        message: 'Verified'
      } ) );
    } else {
      setVerifyAlert( ( prevState ) => ( {
        ...prevState,
        open: true,
        severity: 'error',
        message: 'Error Code'
      } ) );
    }
  }
    // const handleGetAnotherCode = () => {
    //   handleSendingCode( setAnotherCodeAlrt );
    // }

  const handleWrongEmail = () => {
    const data = { ...signUpData, username: signUpData?.username.substring( 1 ) };
    router.push('/auth/register', { state: { data } }as LocationState)
    localStorage.removeItem( 'bencil-last-sent-time-stamp' )
  }

  useEffect( () => { //to prevent user go to this page unless he fill the signup form
    if ( signUpData === undefined ) {
      router.replace('/auth/register');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] )

  return (
  <>
    <Helmet><title>Verify Email</title></Helmet>
    <Stack textAlign='center' mt={6} spacing={3}>
      <Typography variant="h2" > Verify your Email address</Typography>
      <Typography variant='h3'  >We email a security code to <span style={{ fontWeight: 'bold' }}>{email}</span></Typography>
      <Typography variant='h3' mb={4}>
        If you can't find it, check your spam folder
        <Typography component='span' variant='h2' >.</Typography>
        <Typography color='secondary' variant='h3' component='span' fontWeight='bold' onClick={handleWrongEmail} sx={{ cursor: 'pointer', textDecoration: 'underLine', '&: hover':{textDecoration: 'none'} }}>Wrong email?</Typography>
      </Typography>
      <VerificationCodeInput onCodeChange={handleVerificationCodeChange} />
      <SimpleAlertMessage message={verifyAlert.message} severity={verifyAlert.severity} handleClose={handleCloseVerifyAlert} open={verifyAlert.open} />
      <Stack sx={classes.verify_action} direction='column' >
        <Button variant='contained' size='large' onClick={handleVerify} fullWidth>Verify</Button>
        <Button variant='contained' size='large' color='secondary' fullWidth>Continue Without Verify</Button>
      </Stack>
      <Typography variant='h3' mt={8} >
        Still no code?
        {/* <Button variant='text' disableRipple sx={classes.get_another_code} onClick={handleGetAnotherCode} >Get another one</Button> */}
      </Typography>
      <SimpleAlertMessage message={anotherCodeAlrt.message} severity={anotherCodeAlrt.severity} handleClose={handleCloseAnotherCodeAlrt} open={anotherCodeAlrt.open} />
    </Stack >
  </>
  );
};
export default VerifyEmailPage;