import type { RouteObject } from 'react-router';
import { AppShell } from '../components/shell/AppShell';
import { HomePage } from '../pages/HomePage';
import { IdemiaPage } from '../pages/IdemiaPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { SiliconExpertPage } from '../pages/SiliconExpertPage';

export const routes: RouteObject[] = [
  {
    element: <AppShell />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/experience/siliconexpert',
        element: <SiliconExpertPage />,
      },
      {
        path: '/experience/idemia',
        element: <IdemiaPage />,
      },
      {
        path: '/404',
        element: <NotFoundPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];
