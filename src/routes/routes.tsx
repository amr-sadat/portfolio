import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { AppShell } from '../components/shell/AppShell';
import { HomePage } from '../pages/HomePage';

const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);

const TerminalPage = lazy(() =>
  import('../pages/TerminalPage').then((m) => ({ default: m.TerminalPage })),
);

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/terminal"
        element={
          <Suspense fallback={null}>
            <TerminalPage />
          </Suspense>
        }
      />
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
