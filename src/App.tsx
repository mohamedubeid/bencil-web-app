import { Route, Routes, Navigate } from 'react-router-dom'
import SignUpPage from "./pages/AuthPages/SignUpPage";
import LoginPage from './pages/AuthPages/LoginPage';
import HomePage from './pages/homePage/HomePage';
import VerifyEmailPage from './pages/AuthPages/VerifyEmailPage';
import ForgetPasswordPage from './pages/AuthPages/ForgetPasswordPage';
import AuthLayout from './components/auth/AuthLayout';
import NotFound from './pages/NotFound/NotFound';

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/auth' element={<AuthLayout />}>
        <Route path='/auth' element={<Navigate to={'/auth/login'} />} />
        <Route path='/auth/login' element={<LoginPage />} />
        <Route path='/auth/signup' element={<SignUpPage />} />
        <Route path='/auth/forget-password' element={<ForgetPasswordPage />} />
      </Route>
      <Route path='/auth/verify-email' element={<VerifyEmailPage />} />
      {/* if the user loged in the the button will be go to the home page and if not then the message will be go to the login page */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
