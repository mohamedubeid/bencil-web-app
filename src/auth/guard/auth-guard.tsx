import { useEffect, useCallback, useState } from 'react';
// routes
import { paths } from '../../routes/paths';
import { useRouter } from '../../routes/hooks';
//
import { useAuthContext } from '../hooks';


const loginPath = paths.auth.login;


interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps): JSX.Element | null {
  const router = useRouter();

  const { authenticated } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const href = `${loginPath}?${searchParams}`;

      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [authenticated, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}