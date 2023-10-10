import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

type LoadingScreenProps = {
  sx?: Record<string, unknown>;
};

export default function LoadingScreen({ sx, ...other }: LoadingScreenProps) {
  return (
    <Box
      sx={{
        px: 5,
        width: 1,
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        ...sx,
      }}
    >
      <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360 }} />
    </Box>
  );
};