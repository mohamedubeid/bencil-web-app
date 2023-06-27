import React, { useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface SnackbarComponentProps {
  message: string;
  duration: number;
  open: boolean;
  handleClose: () => void;
}

const SimpleAlertMessage: React.FC<SnackbarComponentProps> = ( { message, duration, open, handleClose } ) => {
  useEffect( () => {
    if ( open ) {
      const timer = setTimeout( () => {
        handleClose();
      }, duration );

      return () => clearTimeout( timer );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ open, duration ] );

  return (
    <>
      {open && (
        <Stack direction='row' alignItems='center' justifyContent='center' color='success.dark'>
          <CheckCircleOutlineIcon fontSize='small' />
          <Typography variant='h5'>{message}</Typography>
        </Stack>
      )}
    </>
  )
}

export default SimpleAlertMessage;