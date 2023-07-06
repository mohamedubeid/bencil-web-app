import React, { useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import GppBadIcon from '@mui/icons-material/GppBad';

export interface SimpleAlertMessageProps {
  message: string;
  duration?: number;
  open: boolean;
  severity?: 'success' | 'warning' | 'error';
  handleClose: () => void;
}

const SimpleAlertMessage: React.FC<SimpleAlertMessageProps> = ( { message, duration = 5000, open, severity = 'success', handleClose } ) => {
  let color = 'success.dark';
  let icon = <CheckCircleOutlineIcon fontSize='small' />;

  if ( severity === 'warning' ) {
    color = 'info.main';
    icon = <PriorityHighIcon fontSize='small' />;
  } else if ( severity === 'error' ) {
    color = 'error.main';
    icon = <GppBadIcon fontSize='small' />;
  }
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
        <Stack direction='row' alignItems='center' justifyContent='center' color={color}>
          {icon}
          <Typography variant='h5'>{message}</Typography>
        </Stack>
      )}
    </>
  )
}

export default SimpleAlertMessage;