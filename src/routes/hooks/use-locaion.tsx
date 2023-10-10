import { useMemo } from 'react';
import { useLocation as _useLocation } from 'react-router-dom';

export function useLocation() {
  const location = _useLocation();

  return useMemo(() => location, [location]);
}
