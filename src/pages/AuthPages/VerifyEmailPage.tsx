import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthPagesStyle from './AuthPages.module';
import SimpleAlertMessage, { SimpleAlertMessageProps } from '../../components/ui/SimpleAlertMessage';
import VerifyEmailInput from '../../components/auth/VerifyEmailInput';
import { SignUpData, LocationState } from '../../interfaces/auth.interface';
import { TIME_TO_SENT_ANOTHER_CODE } from '../../components/config/variables';

const VerifyEmailPage = () => {
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

  const handleVerify = () => {
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
    const getLastSentTimestamp: string = localStorage.getItem( 'bencil-last-sent-time-stamp' ) || '0';
    const lastSentTimestamp: number = parseInt( getLastSentTimestamp, 10 )
    if ( lastSentTimestamp !== 0 ) {
      const timeDifference = Date.now() - lastSentTimestamp;
      if ( timeDifference >= TIME_TO_SENT_ANOTHER_CODE ) {
        //sent another code
        const currentTimeStamp: string = Date.now().toString();
        localStorage.setItem( 'bencil-last-sent-time-stamp', currentTimeStamp );
        setAnotherCodeAlrt( ( prevState ) => ( {
          ...prevState,
          open: true,
          severity: 'success',
          message: 'Another code sent successfully'
        } ) );
      } else {
        const leftTimeToSentAnotherCode = TIME_TO_SENT_ANOTHER_CODE - timeDifference;
        const leftMin = Math.floor( leftTimeToSentAnotherCode / ( 60000 ) );
        const leftSec = Math.floor( ( leftTimeToSentAnotherCode % 60000 ) / 1000 );
        setAnotherCodeAlrt( ( prevState ) => ( {
          ...prevState,
          open: true,
          severity: 'warning',
          message: `You need to wait ${leftMin}:${leftSec} before sending another code`
        } ) );
      }
    } else {
      //sent code
      setAnotherCodeAlrt( ( prevState ) => ( {
        ...prevState,
        open: true,
        severity: 'success',
        message: 'Another code sent successfully'
      } ) );
      const currentTimeStamp: string = Date.now().toString();
      localStorage.setItem( 'bencil-last-sent-time-stamp', currentTimeStamp );
    }
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
    <Box sx={classes.verify_outer_container}>
      <img src="/images/logo.svg" alt="bencil-logo" style={classes.logo} />
      <Box sx={classes.verify_page_container}>
        <Typography variant='h2' sx={classes.verify_title}>Verify your Email address</Typography>
        <Typography variant='h3' >We email a security code to </Typography>
        <Typography variant='h3' fontWeight='700'>{email}</Typography>
        <Typography variant='h3' mb={4}>
          If you can't find it, check your spam folder
          <Typography component='span' variant='h2' >.</Typography>
          <Typography color='secondary.dark' variant='h3' component='span' fontWeight='bold' onClick={handleWrongEmail} sx={{ cursor: 'pointer' }}>Wrong email?</Typography>
        </Typography>
        <VerifyEmailInput codeLength={6} />
        <SimpleAlertMessage message={verifyAlert.message} severity={verifyAlert.severity} handleClose={handleCloseVerifyAlert} open={verifyAlert.open} />
        <Stack sx={classes.verify_action}>
          <Button variant='contained' size='medium' color='secondary' sx={classes.continue_button}>Continue Without Verify</Button>
          <Button variant='contained' size='medium' sx={classes.verify_button} onClick={handleVerify}>Verify</Button>
        </Stack>
        <Typography variant='h3' mt={8} >
          Still no code?
          <Button variant='text' disableRipple sx={classes.get_another_code} onClick={handleGetAnotherCode} >Get another one</Button>
        </Typography>
        <SimpleAlertMessage message={anotherCodeAlrt.message} severity={anotherCodeAlrt.severity} handleClose={handleCloseAnotherCodeAlrt} open={anotherCodeAlrt.open} />
      </Box >
    </Box >
  );
};
export default VerifyEmailPage;