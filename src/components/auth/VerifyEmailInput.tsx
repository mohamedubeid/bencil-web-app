import { useRef, ChangeEvent, KeyboardEvent } from 'react';
import TextField from '@mui/material/TextField';

interface VerificationCodeInputProps {
  codeLength: number;
}

const VerifyEmailInput: React.FC<VerificationCodeInputProps> = ( {
  codeLength,
} ) => {
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
          sx={{
            width: '65px',
            margin: 0.8,
            '& input': {
              textAlign: 'center',
              fontSize: '1.5rem',
              zIndex: 1,
            },
            ' .MuiOutlinedInput-notchedOutline': {
              borderRadius: '25px',
            }
          }}
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

export default VerifyEmailInput;