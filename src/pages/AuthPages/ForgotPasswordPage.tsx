import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { RefInputField } from "../../components/ui/InputField";
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { EmailValidation, ResetPasswordSchema } from "../../schema/Auth.schema";
import VerifyEmailInput from '../../components/auth/VerifyEmailInput';
import SimpleAlertMessage, { SimpleAlertMessageProps } from '../../components/ui/SimpleAlertMessage';
import { handleSendingCode } from "./AuthUtils";
import AuthPagesStyle from "./AuthPages.module";
import { ResetPasswordData } from "../../interfaces/auth.interface";
import { RefPasswordTextField } from "../../components/ui/PasswordTextField";
import { VERIFY_EMAIL_CODE_LENGTH } from "../../components/config/variables";


const ForgotPasswordPage: React.FC = () => {
  const emailInputRef = useRef<HTMLInputElement>( null );
  const enteredEmail = emailInputRef.current?.value;
  const passwordInputRef = useRef<HTMLInputElement>( null );
  const confirmPasswordInputRef = useRef<HTMLInputElement>( null );
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
  const [ passwordValidationError, setPasswordValidationError ] = useState<{ [ key: string ]: string } | undefined>( undefined );
  const [ verificationCode, setVerificationCode ] = useState<string>( '' );
  const classes = AuthPagesStyle();
  console.log( '******************' )
  //page 1
  const handleResetPassword = () => {
    const enteredEmail = emailInputRef.current?.value;
    console.log( enteredEmail, 'enteredEmail' )
    try {
      const { error } = EmailValidation.validate( enteredEmail );
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
    console.log( verificationCode, 'verificationCodeverificationCode' )
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
      localStorage.removeItem( 'bencil-last-sent-time-stamp' )
      setStep( 3 );
      return;
    } else {
      setVerifyAlert( ( prevState ) => ( {
        ...prevState,
        open: true,
        severity: 'error',
        message: 'Error Code'
      } ) );
      return;
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
  const handleSubmitNewPassword = () => {
    const enteredPassword = passwordInputRef.current?.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current?.value;
    const newPassword = { password: enteredPassword, confirm_password: enteredConfirmPassword }
    console.log( newPassword, 'newPasswordnewPassword' )
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
          <Typography variant="h1">  Forgot Password ?</Typography >
          <Typography variant="subtitle1" color='secondary.dark'>Not to worry, we got you! Let's get you a new password.</Typography>
          <RefInputField
            placeholder='Please enter your registered email.'
            inputRef={emailInputRef}
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
          <Typography variant="subtitle1" color='secondary.dark'>We sent a code to <span style={{ fontWeight: 'bold' }}>{enteredEmail}</span></Typography>
          <VerifyEmailInput onCodeChange={handleVerificationCodeChange} />
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
          <RefPasswordTextField
            placeholder='Password'
            inputRef={passwordInputRef}
            error={!!passwordValidationError?.password}
            helperText={passwordValidationError?.password || ''}
          />
          <RefPasswordTextField
            placeholder='Confirm Password'
            inputRef={confirmPasswordInputRef}
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

export default ForgotPasswordPage