import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TopNav } from './TopNav';

type IntersectionCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;

let observerCallback: IntersectionCallback | null = null;
const observedElements = new Set<Element>();

class MockIntersectionObserver {
  constructor(callback: IntersectionCallback) {
    observerCallback = callback;
  }
  observe(el: Element) {
    observedElements.add(el);
  }
  unobserve(el: Element) {
    observedElements.delete(el);
  }
  disconnect() {
    observedElements.clear();
  }
}

function renderTopNav(initialPath = '/') {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: (
          <>
            <TopNav />
            <main id="main-content">
              <section id="experience">Experience</section>
              <section id="projects">Projects</section>
              <section id="contact">Contact</section>
            </main>
          </>
        ),
      },
      {
        path: '/404',
        element: (
          <>
            <TopNav />
            <main id="main-content">
              <h1>404</h1>
            </main>
          </>
        ),
      },
    ],
    { initialEntries: [initialPath] },
  );

  return render(<RouterProvider router={router} />);
}

describe('TopNav and MobileMenuSheet', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.style.overflow = '';
    observerCallback = null;
    observedElements.clear();
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.style.overflow = '';
  });

  it('renders no logo/monogram and displays desktop anchor links in exact section order', () => {
    renderTopNav('/');

    const header = screen.getByRole('banner');
    expect(within(header).queryByRole('img')).not.toBeInTheDocument();

    const nav = within(header).getByRole('navigation', { name: /primary/i });
    const links = within(nav).getAllByRole('link');
    expect(links.map((l) => l.textContent)).toEqual(['Experience', 'Projects', 'Contact']);
    expect(links.map((l) => l.getAttribute('href'))).toEqual([
      '#experience',
      '#projects',
      '#contact',
    ]);
  });

  it('highlights the active section via IntersectionObserver scroll-spy on /', () => {
    renderTopNav('/');

    const experienceSection = document.getElementById('experience');
    expect(experienceSection).not.toBeNull();
    expect(observedElements.has(experienceSection!)).toBe(true);

    act(() => {
      observerCallback?.([
        {
          target: experienceSection!,
          isIntersecting: true,
          intersectionRatio: 0.6,
        },
      ]);
    });

    const nav = screen.getByRole('navigation', { name: /primary/i });
    expect(within(nav).getByRole('link', { name: 'Experience' })).toHaveAttribute(
      'aria-current',
      'location',
    );
    expect(within(nav).getByRole('link', { name: 'Projects' })).not.toHaveAttribute('aria-current');
  });

  it('links section items back to /#section from non-home routes without a case study back link', () => {
    renderTopNav('/404');

    const header = screen.getByRole('banner');
    expect(within(header).queryByRole('link', { name: /← experience/i })).not.toBeInTheDocument();

    const nav = within(header).getByRole('navigation', { name: /primary/i });
    expect(within(nav).getByRole('link', { name: 'Experience' })).toHaveAttribute(
      'href',
      '/#experience',
    );
  });

  it('opens the mobile menu sheet with focus trap, scroll lock, Esc close, and link auto-close', async () => {
    renderTopNav('/');

    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuButton);

    const dialog = await screen.findByRole('dialog', { name: /navigation/i });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(document.body.style.overflow).toBe('hidden');

    // Focus trap: Tab from last focusable element wraps to first; Shift+Tab from first wraps to last
    const focusables = dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    expect(focusables.length).toBeGreaterThanOrEqual(4);
    const first = focusables[0]!;
    const last = focusables[focusables.length - 1]!;

    last.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(first);

    first.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(last);

    // Escape closes the sheet, restores focus to Menu button, and unlocks body scroll
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.activeElement).toBe(menuButton);
    expect(document.body.style.overflow).toBe('');

    // Re-open and click an anchor link -> auto-closes
    fireEvent.click(menuButton);
    const reopenedDialog = screen.getByRole('dialog', { name: /navigation/i });
    fireEvent.click(within(reopenedDialog).getByRole('link', { name: 'Projects' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });
});
