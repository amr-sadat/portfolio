import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from '../../routes/routes';

describe('macOS Terminal Pro /terminal route', () => {
  it('renders full-screen macOS Terminal Pro without the classic top nav or footer', async () => {
    render(
      <MemoryRouter initialEntries={['/terminal']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    const terminalSection = await screen.findByRole(
      'region',
      {
        name: /macos terminal pro portfolio view/i,
      },
      { timeout: 3000 },
    );
    expect(terminalSection).toBeInTheDocument();

    // Classic AppShell top nav (banner) and footer (contentinfo) are not rendered
    expect(screen.queryByRole('banner')).not.toBeInTheDocument();
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();

    // Click Show All to reveal all typed sections immediately
    fireEvent.click(screen.getByRole('button', { name: /show all/i }));

    expect(screen.getByRole('heading', { level: 2, name: /professional summary/i })).toBeVisible();
    expect(screen.getByRole('heading', { level: 2, name: /production experience/i })).toBeVisible();
    expect(screen.getByRole('heading', { level: 2, name: /personal projects/i })).toBeVisible();
    expect(screen.getByRole('heading', { level: 2, name: /skills & education/i })).toBeVisible();
    expect(screen.getByRole('heading', { level: 2, name: /contact/i })).toBeVisible();

    // Verify PII guard inside Terminal view
    const html = terminalSection.innerHTML;
    expect(html).not.toMatch(/\b01[0125]\d[\s-]?\d{3}[\s-]?\d{4}\b/);
    expect(html).not.toMatch(/\bmilitary status|exempted\b/i);

    // Link back to classic view route
    expect(screen.getByRole('link', { name: /classic view/i })).toHaveAttribute('href', '/');
  });
});
