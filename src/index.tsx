import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { createTheme } from './components/theme/theme';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { BrowserRouter } from 'react-router-dom';
Amplify.configure( awsExports );

const root = ReactDOM.createRoot(
  document.getElementById( 'root' ) as HTMLElement
);
const theme = createTheme();
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);