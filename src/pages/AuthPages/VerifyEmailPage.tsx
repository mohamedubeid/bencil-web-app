import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Snackbar,
} from '@mui/material';

const VerifyEmailPage = () => {
  const [ verificationCode, setVerificationCode ] = useState( '' );
  const [ isVerified, setIsVerified ] = useState( false );
  const [ isSnackbarOpen, setIsSnackbarOpen ] = useState( false );

  const handleVerificationCodeChange = ( event: any ) => {
    setVerificationCode( event.target.value );
  };

  const handleVerifyEmail = () => {
    // Simulate server-side verification
    // Replace this with your actual verification logic

    // For demo purposes, we'll consider '123456' as the valid verification code
    if ( verificationCode === '123456' ) {
      setIsVerified( true );
      setIsSnackbarOpen( true );
    } else {
      setIsVerified( false );
      setIsSnackbarOpen( true );
    }
  };

  const handleContinueWithoutVerify = () => {
    // Handle the case where the user chooses to continue without verification
    // Replace this with your desired logic
    setIsVerified( true );
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen( false );
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Verify Email
      </Typography>
      {!isVerified ? (
        <>
          <Typography variant="body1" align="center">
            Please enter the verification code you received:
          </Typography>
          <Grid container spacing={2} justifyContent="center" mt={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="verificationCode"
                label="Verification Code"
                variant="outlined"
                fullWidth
                value={verificationCode}
                onChange={handleVerificationCodeChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleVerifyEmail}
              >
                Verify
              </Button>
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleContinueWithoutVerify}
          // mt={2}
          >
            Continue without verification
          </Button>
        </>
      ) : (
        <Typography variant="body1" align="center" mt={2}>
          Email verified successfully!
        </Typography>
      )}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={
          isVerified
            ? 'Email verified successfully!'
            : 'Invalid verification code. Please try again.'
        }
      />
    </Container>
  );
};

export default VerifyEmailPage;
