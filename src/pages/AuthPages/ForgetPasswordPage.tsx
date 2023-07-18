import { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputField from "../../components/auth/InputField";
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { EmailValidation, ResetPasswordSchema } from "../../schema/Auth.schema";
import VerifyEmailInput from '../../components/auth/VerifyEmailInput';
import SimpleAlertMessage, { SimpleAlertMessageProps } from '../../components/ui/SimpleAlertMessage';
import { handleSendingCode } from "./AuthUtils";
import AuthPagesStyle from "./AuthPages.module";
import { ResetPasswordData, INITIAL_RESET_PASSWORD_DATA } from "../../interfaces/auth.interface";



const ForgetPasswordPage: React.FC = () => {
  const [ email, setEmail ] = useState<string>( '' );
  const [ emailValidationError, setEmailValidationError ] = useState<string | undefined>( undefined );
  const [ step, setStep ] = useState<1 | 2 | 3 | 4>( 1 );
  const [ verifyAlert, setVerifyAlert ] = useState<Omit<SimpleAlertMessageProps, 'handleClose' | 'duration'>>( {
    open: false,
    severity: 'success',
    message: 'Verified',
  } );
  const [ resendAlert, setResendAlert ] = useState<Omit<SimpleAlertMessageProps, 'handleClose' | 'duration'>>( {
    open: false,
    severity: 'success',
    message: 'Verified',
  } );
  const [ newPassword, setNewPassword ] = useState<ResetPasswordData>( INITIAL_RESET_PASSWORD_DATA );
  const [ passwordValidationError, setPasswordValidationError ] = useState<{ [ key: string ]: string } | undefined>( undefined );
  const [ verificationCode, setVerificationCode ] = useState<string>( '' );
  console.log( verificationCode, 'verificationCodeverificationCode' )
  const classes = AuthPagesStyle();
  //page 1
  const handleEmailChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const value: string = e.target.value;
    setEmail( value );
  };
  console.log( '******************' )
  const handleResetPassword = () => {
    try {
      const { error } = EmailValidation.validate( email );
      if ( !error ) {
        setEmailValidationError( undefined );
        setStep( 2 );

        return;
      } else {
        console.log( error, 'errorerror' )
        setEmailValidationError( error.details[ 0 ].message )
        return
      }
    } catch ( error ) {
      console.log( error );
    }
  }
  const handleCloseVerifyAlert = () => {
    setVerifyAlert( ( prevState ) => ( {
      ...prevState,
      open: false,
    } ) );
  }
  //page 2
  const handleVerificationCodeChange = ( code: string ) => {
    setVerificationCode( code );
  };
  const handleContinue = () => {
    const isVerify = true;
    if ( isVerify ) {
      setVerifyAlert( ( prevState ) => ( {
        ...prevState,
        open: true,
        severity: 'success',
        message: 'Verified'
      } ) );
      localStorage.removeItem( 'bencil-last-sent-time-stamp' )
      setStep( 3 );
    } else {
      setVerifyAlert( ( prevState ) => ( {
        ...prevState,
        open: true,
        severity: 'error',
        message: 'Error Code'
      } ) );
    }
  };
  const handleResend = () => {
    handleSendingCode( setResendAlert )
  };

  const handleCloseResendAlert = () => {
    setResendAlert( ( prevState ) => ( {
      ...prevState,
      open: false,
    } ) );
  };

  //page 3
  const handleChangePassword = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = e.target;
    setNewPassword( ( prevData ) => ( {
      ...prevData,
      [ name ]: value,
    } ) )
  }

  const handleSubmitNewPassword = () => {
    try {
      const { error } = ResetPasswordSchema.validate( newPassword, {
        abortEarly: false,
      } );
      if ( !error ) {
        setPasswordValidationError( undefined );
        setStep( 4 );
        return;
      } else {
        console.log( error, 'errorerror' )
        const newErrors: { [ key: string ]: string } = {};
        error.details.forEach( ( detail ) => {
          const path = detail.path[ 0 ] as keyof ResetPasswordData;
          const message = detail.message;
          newErrors[ path ] = message;
        } );
        setPasswordValidationError( newErrors );
        return
      }
    } catch ( error ) {
      console.log( error );
    }
  }

  return (
    <Stack direction='column' mt={{ xs: -5, sm: -2 }} justifyContent={{ xs: 'space-between', sm: 'space-between' }} height='100%'>
      {step === 1 &&
        < Stack textAlign='center' mt={10} spacing={4}>
          <Typography><FingerprintIcon fontSize="large" /></Typography>
          <Typography variant="h1">  Forget Password ?</Typography >
          <Typography variant="subtitle1" color='secondary.dark'>Not to worry, we got you! Let's get you a new password.</Typography>
          <InputField
            placeholder='Please enter your registered email.'
            name='email'
            value={email}
            onChange={handleEmailChange}
            error={!!emailValidationError} //check if the email form correct then make sure that the email is exist in out database
            helperText={emailValidationError || ''}
          />
          <Button variant='contained' size='large' type='submit' onClick={handleResetPassword} >Reset password</Button>
          <Link to='/auth/login'>
            <Stack direction='row' justifyContent='center' spacing={0.5} sx={{ color: 'secondary.dark' }} >
              <ArrowBackIcon />
              <Typography > Back to Login</Typography>
            </Stack>
          </Link>
        </Stack >}
      {step === 2 &&
        < Stack textAlign='center' mt={10} spacing={{ xs: 2, sm: 3 }}>
          <Typography><FingerprintIcon fontSize="large" /></Typography>
          <Typography variant="h1">  Password Reset</Typography >
          <Typography variant="subtitle1" color='secondary.dark'>We sent a code to <span style={{ fontWeight: 'bold' }}>{email}</span></Typography>
          <VerifyEmailInput codeLength={4} onCodeChange={handleVerificationCodeChange} />
          <SimpleAlertMessage message={verifyAlert.message} severity={verifyAlert.severity} handleClose={handleCloseVerifyAlert} open={verifyAlert.open} />
          <Button variant='contained' size='large' type='submit' onClick={handleContinue} >Continue</Button>
          <Typography variant="subtitle1" color='secondary.main'>Don't receive the email? <Typography color='primary.main' display='inline' sx={{ cursor: 'pointer' }} onClick={handleResend} >Click to resend</Typography></Typography>
          <SimpleAlertMessage message={resendAlert.message} severity={resendAlert.severity} handleClose={handleCloseResendAlert} open={resendAlert.open} />
          <Link to='/auth/login'>
            <Stack direction='row' justifyContent='center' spacing={0.5} sx={{ color: 'secondary.dark' }} mb={2} >
              <ArrowBackIcon />
              <Typography > Back to Login</Typography>
            </Stack>
          </Link>
        </Stack >}
      {step === 3 &&
        < Stack textAlign='center' mt={10} spacing={{ xs: 2, sm: 3 }}>
          <Typography><PendingOutlinedIcon fontSize="large" /></Typography>
          <Typography variant="h1">  Set new password</Typography >
          <Typography variant="subtitle1" color='secondary.dark'>Must be at least 8 characters.</Typography>
          <InputField
            placeholder='Password'
            name='password'
            value={newPassword.password}
            onChange={handleChangePassword}
            error={!!passwordValidationError?.password}
            helperText={passwordValidationError?.password || ''}
          />
          <InputField
            placeholder='Confirm Password'
            name='confirm_password'
            value={newPassword.confirm_password}
            onChange={handleChangePassword}
            error={!!passwordValidationError?.confirm_password}
            helperText={passwordValidationError?.confirm_password || ''}
          />
          <Button variant='contained' size='large' type='submit' onClick={handleSubmitNewPassword} >Reset Password</Button>
          <Link to='/auth/login'>
            <Stack direction='row' justifyContent='center' spacing={0.5} sx={{ color: 'secondary.dark' }} mb={2} >
              <ArrowBackIcon />
              <Typography > Back to Login</Typography>
            </Stack>
          </Link>
        </Stack >}
      {step === 4 &&
        < Stack textAlign='center' mt={10} spacing={{ xs: 2, sm: 3 }}>
          <Typography><VerifiedOutlinedIcon fontSize="large" /></Typography>
          <Typography variant="h1">  All done!</Typography >
          <Typography variant="subtitle1" color='secondary.dark'>Your password has been reset successfully. Please login using your new password.</Typography>
          <Link to='/auth/login'> <Button variant='contained' size='large' type='submit' onClick={handleSubmitNewPassword} >Done</Button></Link>
          <Link to='/auth/login'>
            <Stack direction='row' justifyContent='center' spacing={0.5} sx={{ color: 'secondary.dark' }} mb={2} >
              <ArrowBackIcon />
              <Typography > Back to Login</Typography>
            </Stack>
          </Link>
        </Stack >}
      <Stack direction='row' spacing={1} mb={2} justifyContent='center'>
        <Box sx={step >= 1 ? classes.activated_stepper : classes.disabled_stepper}></Box>
        <Box sx={step >= 2 ? classes.activated_stepper : classes.disabled_stepper}></Box>
        <Box sx={step >= 3 ? classes.activated_stepper : classes.disabled_stepper}></Box>
        <Box sx={step >= 4 ? classes.activated_stepper : classes.disabled_stepper}></Box >
      </Stack >
    </Stack >

  )
}

export default ForgetPasswordPage