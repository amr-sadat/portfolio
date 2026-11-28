import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from './routes';

function renderRoute(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe('portfolio routes', () => {
  it('renders the home route at / with AppShell landmarks and semantic heading', () => {
    renderRoute('/');

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: /amr sadat abou hegab/i }),
    ).toBeInTheDocument();
  });

  it('renders the custom 404 page at /404 with links back to Home and Experience', async () => {
    renderRoute('/404');

    const main = await screen.findByRole('main');
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

  it('renders the custom 404 page for unknown paths including removed case study paths', async () => {
    renderRoute('/experience/siliconexpert');

    expect(await screen.findByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /not found|404/i })).toBeInTheDocument();
  });
});
