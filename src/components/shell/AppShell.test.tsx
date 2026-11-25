import { render, screen, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';
import { AppShell } from './AppShell';

function renderShell(initialPath = '/') {
  const router = createMemoryRouter(
    [
      {
        element: <AppShell />,
        children: [
          {
            path: '/',
            element: (
              <main id="main-content">
                <h1>Home</h1>
              </main>
            ),
          },
        ],
      },
    ],
    { initialEntries: [initialPath] },
  );

  return render(<RouterProvider router={router} />);
}

describe('AppShell and FooterColophon', () => {
  it('renders skip link, banner, main outlet, and Footer Colophon with source repo link', () => {
    renderShell('/');

    expect(screen.getByRole('link', { name: /skip to main content/i })).toHaveAttribute(
      'href',
      '#main-content',
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveTextContent(/colophon/i);
    expect(footer).toHaveTextContent(/react 19/i);
    expect(footer).toHaveTextContent(/typescript/i);
    expect(footer).toHaveTextContent(/react router/i);
    expect(footer).toHaveTextContent(/css modules/i);

    const repoLink = within(footer).getByRole('link', {
      name: /github\.com\/amr-sadat\/portfolio|view source/i,
    });
    expect(repoLink).toHaveAttribute('href', 'https://github.com/amr-sadat/portfolio');
    expect(repoLink).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });
});
