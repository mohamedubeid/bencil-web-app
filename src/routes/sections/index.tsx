import { Navigate, useRoutes } from 'react-router-dom';
import { mainRoutes, HomePage } from './main';
import { authRoutes } from './auth';


export default function Router() {
  return useRoutes([

    {
      path: '/',
      element: (
          <HomePage />
      ),
    },

    ...authRoutes,
    ...mainRoutes,
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
