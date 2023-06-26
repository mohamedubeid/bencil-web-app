import React, { useRef, ChangeEvent, KeyboardEvent } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthPagesStyle from './AuthPages.module';

interface VerificationCodeInputProps {
  codeLength: number;
}

const VerifyEmailInput: React.FC<VerificationCodeInputProps> = ( {
  codeLength,
} ) => {
  const classes = AuthPagesStyle();
  const codeInputRefs = useRef<HTMLInputElement[]>( [] );

  const handleCodeChange = ( index: number, event: ChangeEvent<HTMLInputElement> ) => {
    const input = event.target;
    const nextInput = codeInputRefs.current[ index + 1 ];

    // Auto-advance to the next input
    if ( input.value && nextInput ) {
      nextInput.focus();
    }
  };

  const handleCodeKeyDown = ( index: number, event: KeyboardEvent<HTMLInputElement> ) => {
    const input = event.target as HTMLInputElement;
    const previousInput = codeInputRefs.current[ index - 1 ];

    // Move to the previous input if the current input is empty and Backspace key is pressed
    if ( !input.value && previousInput && event.key === 'Backspace' ) {
      previousInput.focus();
    }
  };

  const renderCodeInputs = () => {
    const codeInputs: JSX.Element[] = [];

    for ( let i = 0; i < codeLength; i++ ) {
      codeInputs.push(
        <TextField
          sx={classes.verify_input}
          key={i}
          inputRef={( ref: HTMLInputElement ) => ( codeInputRefs.current[ i ] = ref )}
          inputProps={{
            maxLength: 1,
          }}
          onChange={( e: ChangeEvent<HTMLInputElement> ) => handleCodeChange( i, e )}
          onKeyDown={( e: KeyboardEvent<HTMLInputElement> ) => handleCodeKeyDown( i, e )}
        />
      );
    }

    return codeInputs;
  };

  return <div>{renderCodeInputs()}</div>;
};


const VerifyEmailPage = () => {
  const email = 'test.test@gmail.com'
  return (
    <Box textAlign='center' m='auto' p={10} maxWidth='800px' >
      <Typography variant='h2' color='primary'>Verify your Email address</Typography>
      <Typography variant='h3' mt={8} >We email a security code to </Typography>
      <Typography variant='h3' fontWeight='700'>{email}</Typography>
      <Typography variant='h3' mb={4}>
        If you can't find it, check your spam folder
        <Typography component='span' variant='h2' >.</Typography>
        <Link to='/signup'><Typography color='secondary.dark' variant='h3' component='span' fontWeight='bold'>Wrong email?</Typography></Link>
      </Typography>
      <VerifyEmailInput codeLength={6} />
      <Stack direction='row' justifyContent='space-between' mt={6}>
        <Button variant='contained' size='medium'>Verify</Button>
        <Button variant='contained' size='medium'>Continue without verify</Button>
      </Stack>
    </Box>
  );
};

export default VerifyEmailPage