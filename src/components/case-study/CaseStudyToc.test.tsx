import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getCaseStudyTocItems, siliconExpertCaseStudy } from '../../content';
import { CaseStudyToc } from './CaseStudyToc';

describe('CaseStudyToc', () => {
  const originalIntersectionObserver = globalThis.IntersectionObserver;

  afterEach(() => {
    globalThis.IntersectionObserver = originalIntersectionObserver;
    vi.restoreAllMocks();
  });

  it('toggles the mobile "On this page" disclosure and closes it when jumping to a section', () => {
    const items = getCaseStudyTocItems(siliconExpertCaseStudy);
    render(<CaseStudyToc items={items} />);

    const toggle = screen.getByRole('button', { name: /on this page/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    const archLink = screen.getByRole('link', { name: /03.*architectural decisions/i });
    expect(archLink).toHaveAttribute('href', '#architecture');

    fireEvent.click(archLink);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(archLink).toHaveAttribute('aria-current', 'location');
  });

  it('highlights the active section via IntersectionObserver scroll-spy', () => {
    let observerCallback: IntersectionObserverCallback | null = null;

    class MockIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = '';
      readonly scrollMargin = '';
      readonly thresholds = [];
      constructor(cb: IntersectionObserverCallback) {
        observerCallback = cb;
      }
      disconnect() {}
      observe() {}
      takeRecords() {
        return [];
      }
      unobserve() {}
    }

    globalThis.IntersectionObserver = MockIntersectionObserver;

    const items = getCaseStudyTocItems(siliconExpertCaseStudy);
    render(
      <div>
        <CaseStudyToc items={items} />
        {items.map((item) => (
          <section key={item.id} id={item.id} />
        ))}
      </div>,
    );

    const problemEl = document.getElementById('problem')!;
    act(() => {
      observerCallback?.(
        [
          {
            target: problemEl,
            isIntersecting: true,
            intersectionRatio: 0.6,
            intersectionRect: { height: 240 } as DOMRectReadOnly,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });

    expect(screen.getByRole('link', { name: /02.*problem & constraints/i })).toHaveAttribute(
      'aria-current',
      'location',
    );
  });
});
