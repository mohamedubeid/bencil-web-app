import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocationState } from '../../components/auth/interfaces';


interface Router {
  back: () => void;
  forward: () => void;
  reload: () => void;
  push: (href: string, state?: LocationState) => void;
  replace: (href: string) => void;
}

export function useRouter(): Router {
  const navigate = useNavigate();

  const router = useMemo(
    () => ({
      back: () => navigate(-1),
      forward: () => navigate(1),
      reload: () => window.location.reload(),
      push: (href: string, state?: LocationState) => navigate(href, state),
      replace: (href: string) => navigate(href, { replace: true }),
    }),
    [navigate]
  );

  return router;
}
