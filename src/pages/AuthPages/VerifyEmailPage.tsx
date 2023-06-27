import { useRef, useState, ChangeEvent, KeyboardEvent } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import AuthPagesStyle from './AuthPages.module';
import SimpleAlertMessage from '../../components/ui/SimpleAlertMessage';
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
          // type='number'
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
  const [ openAlert, setOpenAlert ] = useState( false );
  const email = 'test.test@gmail.com';
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