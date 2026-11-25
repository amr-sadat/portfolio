import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './styles/tokens.css';
import './styles/reset.css';
import './styles/surfaces.css';
import { routes } from './routes/routes';
import { ThemeProvider } from './theme/ThemeProvider';

const router = createBrowserRouter(routes);
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
