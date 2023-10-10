// components
import { SplashScreen } from '../../components/loading-screen';
//
import { AuthContext } from './auth-context';
import { AuthContextType } from '../../components/auth/interfaces';

// ----------------------------------------------------------------------

interface AuthConsumerProps {
  children: React.ReactNode;
}

export function AuthConsumer({ children }: AuthConsumerProps) {
  return (
    <AuthContext.Consumer>
      {(auth?: AuthContextType) => (auth?.loading ? <SplashScreen /> : children)}
    </AuthContext.Consumer>
  );
}
