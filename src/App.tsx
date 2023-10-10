// import { Amplify } from 'aws-amplify';
// import awsconfig from './aws-exports';
import { AuthConsumer, AuthProvider } from './auth/context';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { createTheme } from './components/theme/theme';
import Router from './routes/sections';

// Amplify.configure(awsconfig);

const theme = createTheme();


const App = () => {

  const charAt = `  
  ██████  
  ██    ██
  ██    ██
  ██████  
  ██    ██
  ██    ██
  ██████  
  `;
  
  console.info(`%c${charAt}`, 'color: #0A66C2');

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <AuthConsumer>
            <Router />
          </AuthConsumer>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
