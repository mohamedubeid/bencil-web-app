import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
// routes
import { paths } from '../../routes/paths';
import { useRouter, useSearchParams } from '../../routes/hooks';
//
import { useAuthContext } from '../hooks';

interface GuestGuardProps {
  children: React.ReactNode;
}

export default function GuestGuard({ children }: GuestGuardProps): JSX.Element {
  const router = useRouter();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo') || paths.root;

  const { authenticated } = useAuthContext();

  const check = useCallback(() => {
    if (authenticated) {
      router.replace(returnTo);
    }
  }, [authenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
