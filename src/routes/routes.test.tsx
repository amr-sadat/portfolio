import { render, screen, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '../theme/ThemeProvider';
import { routes } from './routes';

function renderRoute(initialPath: string) {
  const router = createMemoryRouter(routes, { initialEntries: [initialPath] });
  return render(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>,
  );
}

describe('v1 routes', () => {
  it('renders the home route at / with AppShell landmarks and semantic heading', () => {
    renderRoute('/');

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: /amr sadat abou hegab/i }),
    ).toBeInTheDocument();
  });

  it('renders the SiliconExpert Case Study route at /experience/siliconexpert', () => {
    renderRoute('/experience/siliconexpert');

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(
      within(main).getByRole('heading', { level: 1, name: /siliconexpert/i }),
    ).toBeInTheDocument();
    expect(within(main).getByRole('link', { name: /experience/i })).toHaveAttribute(
      'href',
      '/#experience',
    );
  });

  it('renders the IDEMIA Egypt Case Study route at /experience/idemia', () => {
    renderRoute('/experience/idemia');

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(within(main).getByRole('heading', { level: 1, name: /idemia/i })).toBeInTheDocument();
    expect(within(main).getByRole('link', { name: /experience/i })).toHaveAttribute(
      'href',
      '/#experience',
    );
  });

  it('renders the custom 404 page at /404 with links back to Home and Experience', () => {
    renderRoute('/404');

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(
      within(main).getByRole('heading', { level: 1, name: /not found|404/i }),
    ).toBeInTheDocument();
    expect(within(main).getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
    expect(within(main).getByRole('link', { name: /experience/i })).toHaveAttribute(
      'href',
      '/#experience',
    );
  });

  it('renders the custom 404 page for unknown paths', () => {
    renderRoute('/does-not-exist');

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /not found|404/i })).toBeInTheDocument();
  });
});
