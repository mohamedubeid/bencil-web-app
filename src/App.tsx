import { Route, Routes, Navigate } from 'react-router-dom'
import SignUpPage from "./pages/AuthPages/SignUpPage";
import LoginPage from './pages/AuthPages/LoginPage';
import HomePage from './pages/homePage/HomePage';
import VerifyEmailPage from './pages/AuthPages/VerifyEmailPage';
import ForgotPasswordPage from './pages/AuthPages/ForgotPasswordPage';
import AuthLayout from './components/auth/AuthLayout';
import NotFound from './pages/NotFound/NotFound';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/auth' element={<AuthLayout />}>
        <Route path='/auth' element={<Navigate to={'/auth/login'} />} />
        <Route path='/auth/login' element={<LoginPage />} />
        <Route path='/auth/signup' element={<SignUpPage />} />
        <Route path='/auth/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/auth/verify-email' element={<VerifyEmailPage />} />
      </Route>
      {/* if the user loged in the the button will be go to the home page and if not then the message will be go to the login page */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
