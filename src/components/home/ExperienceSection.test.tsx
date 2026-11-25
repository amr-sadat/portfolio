import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { experienceContent, UNVERIFIED_CV_MARKER } from '../../content';
import { ExperienceSection } from './ExperienceSection';

function renderExperience() {
  return render(
    <MemoryRouter>
      <ExperienceSection experience={experienceContent} />
    </MemoryRouter>,
  );
}

describe('ExperienceSection', () => {
  it('renders #experience landmark with reverse-chronological flagships (SiliconExpert before IDEMIA Egypt)', () => {
    const { container } = renderExperience();

    const section = container.querySelector('section#experience');
    expect(section).not.toBeNull();
    expect(screen.getByRole('heading', { level: 2, name: 'Experience' })).toBeInTheDocument();

    const flagshipArticles = screen.getAllByRole('article');
    expect(flagshipArticles).toHaveLength(2);
    const [first, second] = flagshipArticles;
    if (!first || !second) {
      throw new Error('Expected two flagship articles');
    }

    const firstHeading = within(first).getByRole('heading', { level: 3 });
    const secondHeading = within(second).getByRole('heading', { level: 3 });

    expect(firstHeading).toHaveTextContent(/SiliconExpert/i);
    expect(firstHeading).toHaveTextContent(/P5 Platform/i);
    expect(secondHeading).toHaveTextContent(/IDEMIA Egypt/i);
    expect(secondHeading).toHaveTextContent(/Border Control, e-Visa & Immigration System/i);
  });

  it('renders text-only teasers with role, tenure marker, 3 stack tags, and Read case study links', () => {
    const { container } = renderExperience();

    const flagshipArticles = screen.getAllByRole('article');
    const [siliconExpert, idemia] = flagshipArticles;
    if (!siliconExpert || !idemia) {
      throw new Error('Expected two flagship articles');
    }

    expect(within(siliconExpert).getByText('Senior Front End Developer II')).toBeInTheDocument();
    expect(within(siliconExpert).getByText(UNVERIFIED_CV_MARKER)).toBeInTheDocument();
    const siliconExpertLink = within(siliconExpert).getByRole('link', {
      name: /Read case study/i,
    });
    expect(siliconExpertLink).toHaveAttribute('href', '/experience/siliconexpert');

    expect(within(idemia).getAllByText(UNVERIFIED_CV_MARKER).length).toBeGreaterThanOrEqual(2);
    const idemiaLink = within(idemia).getByRole('link', {
      name: /Read case study/i,
    });
    expect(idemiaLink).toHaveAttribute('href', '/experience/idemia');

    // Exactly 3 stack tags per flagship teaser
    expect(within(siliconExpert).getAllByRole('listitem')).toHaveLength(3);
    expect(within(idemia).getAllByRole('listitem')).toHaveLength(3);

    // Strictly text-only teasers: no schematic SVGs or product screenshots on /
    expect(container.querySelector('svg')).toBeNull();
    expect(container.querySelector('img')).toBeNull();
  });

  it('renders always-visible, non-expandable compact rows for earlier pre-IDEMIA roles', () => {
    const { container } = renderExperience();

    const earlierHeading = screen.getByRole('heading', { level: 3, name: /Earlier Roles/i });
    expect(earlierHeading).toBeInTheDocument();

    const earlierList = earlierHeading.nextElementSibling;
    expect(earlierList?.tagName).toBe('UL');
    const rows = within(earlierList as HTMLElement).getAllByRole('listitem');
    expect(rows.length).toBeGreaterThanOrEqual(2);

    for (const row of rows) {
      expect(row).toBeVisible();
      expect(row).toHaveTextContent(UNVERIFIED_CV_MARKER);
      expect(within(row).queryByRole('button')).toBeNull();
      expect(within(row).queryByRole('link')).toBeNull();
    }

    expect(container.querySelector('details')).toBeNull();
  });
});
