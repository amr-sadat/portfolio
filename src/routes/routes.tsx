import { lazy } from 'react';
import { Route, Routes } from 'react-router';
import { AppShell } from '../components/shell/AppShell';
import { HomePage } from '../pages/HomePage';

const SiliconExpertPage = lazy(() =>
  import('../pages/SiliconExpertPage').then((m) => ({ default: m.SiliconExpertPage })),
);
const IdemiaPage = lazy(() =>
  import('../pages/IdemiaPage').then((m) => ({ default: m.IdemiaPage })),
);
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/experience/siliconexpert" element={<SiliconExpertPage />} />
        <Route path="/experience/idemia" element={<IdemiaPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
