import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SplashScreen } from '../../components/loading-screen';
// auth
import { GuestGuard } from '../../auth/guard';
// layouts
import { AuthLayout } from '../../components/auth';


const LoginPage = lazy(() => import('../../pages/AuthPages/LoginPage'));
const RegisterPage = lazy(() => import('../../pages/AuthPages/RegisterPage')); //change to register
const VerifyEmailPage = lazy(() => import('../../pages/AuthPages/VerifyEmailPage'));
// const ForgotPasswordPage = lazy(() => import('../../pages/AuthPages/ForgotPasswordPage'));



export const authRoutes = [{
  path: 'auth',
  element: (
    <AuthLayout>
      <GuestGuard>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </GuestGuard>
    </AuthLayout>
  ),
  children: [
    { element: <LoginPage />, index: true },
    {
      path: 'login',
      element: (
          <LoginPage />
      ),
    },
    {
      path: 'register',
      element: (
          <RegisterPage />
      ),
    },
    // {
    //   path: 'forgot-password',
    //   element: (
    //     <ForgotPasswordPage />
    //   ),
    // },
    {
      path: 'verify-email',
      element: (
        <VerifyEmailPage />
      ),
    }
  ],
}];
