import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthPagesStyle from './AuthPages.module';
import SimpleAlertMessage, { SimpleAlertMessageProps } from '../../components/ui/SimpleAlertMessage';
import VerifyEmailInput from '../../components/auth/VerifyEmailInput';
import { SignUpData, LocationState } from '../../interfaces/auth.interface';
import { handleSendingCode } from './AuthUtils';
import { VERIFY_EMAIL_CODE_LENGTH } from "../../components/config/variables";

const VerifyEmailPage = () => {
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
  const location = useLocation();
  const navigate = useNavigate();
  const signUpData: SignUpData | undefined = location.state?.signUpData || undefined;
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
    console.log( typeof verificationCode, 'verificationCodeverificationCode' )
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
  const handleGetAnotherCode = () => {
    handleSendingCode( setAnotherCodeAlrt );
  }

  const handleWrongEmail = () => {
    navigate( '/auth/signup', { state: { signUpData: { ...signUpData, username: signUpData?.username.substring( 1 ) } } } as LocationState );
    localStorage.removeItem( 'bencil-last-sent-time-stamp' )
  }

  useEffect( () => { //to prevent user go to this page unless he fill the signup form
    if ( signUpData === undefined ) {
      navigate( '/auth/signup', { replace: true } )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] )

  return (
    <Stack textAlign='center' mt={6} spacing={3}>
      <Typography variant="h2" > Verify your Email address</Typography>
      <Typography variant='h3'  >We email a security code to <span style={{ fontWeight: 'bold' }}>{email}</span></Typography>
      <Typography variant='h3' mb={4}>
        If you can't find it, check your spam folder
        <Typography component='span' variant='h2' >.</Typography>
        <Typography color='secondary.dark' variant='h3' component='span' fontWeight='bold' onClick={handleWrongEmail} sx={{ cursor: 'pointer' }}>Wrong email?</Typography>
      </Typography>
      <VerifyEmailInput onCodeChange={handleVerificationCodeChange} />
      <SimpleAlertMessage message={verifyAlert.message} severity={verifyAlert.severity} handleClose={handleCloseVerifyAlert} open={verifyAlert.open} />
      <Stack sx={classes.verify_action} direction='column' >
        <Button variant='contained' size='large' onClick={handleVerify} fullWidth>Verify</Button>
        <Button variant='contained' size='large' color='secondary' fullWidth>Continue Without Verify</Button>
      </Stack>
      <Typography variant='h3' mt={8} >
        Still no code?
        <Button variant='text' disableRipple sx={classes.get_another_code} onClick={handleGetAnotherCode} >Get another one</Button>
      </Typography>
      <SimpleAlertMessage message={anotherCodeAlrt.message} severity={anotherCodeAlrt.severity} handleClose={handleCloseAnotherCodeAlrt} open={anotherCodeAlrt.open} />
    </Stack >
  );
};
export default VerifyEmailPage;