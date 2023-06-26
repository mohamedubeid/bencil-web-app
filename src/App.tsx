import { Route, Routes } from 'react-router-dom'
import SignUpPage from "./pages/AuthPages/SignUpPage";
import LoginPage from './pages/AuthPages/LoginPage';
import HomePage from './pages/homePage/HomePage';
import VerifyEmailPage from './pages/AuthPages/VerifyEmailPage';
import ForgetPasswordPage from './pages/AuthPages/ForgetPasswordPage';

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/verify-email' element={<VerifyEmailPage />} />
      <Route path='/forget-password' element={<ForgetPasswordPage />} />


    </Routes>
  );
}

export default App;
