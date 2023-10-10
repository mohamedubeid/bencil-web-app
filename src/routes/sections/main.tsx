import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SplashScreen } from '../../components/loading-screen';


export const HomePage = lazy(() => import('../../pages/homePage/HomePage'));
const Page404 = lazy(() => import('../../pages/NotFound/NotFound'));

export const mainRoutes = [
  {
    element: (
    <Suspense fallback={<SplashScreen />}>
      <Outlet />
     </Suspense>
  ),
  children:[
    { path: '/404', element: <Page404 />},
  ]
  },
]
