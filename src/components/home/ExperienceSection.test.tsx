import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { experienceContent } from '../../content';
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

  it('renders text-only teasers with verified role, tenure, 3 stack tags, and Read case study links', () => {
    const { container } = renderExperience();

    const flagshipArticles = screen.getAllByRole('article');
    const [siliconExpert, idemia] = flagshipArticles;
    if (!siliconExpert || !idemia) {
      throw new Error('Expected two flagship articles');
    }

    expect(within(siliconExpert).getByText('Senior Front End Developer II')).toBeInTheDocument();
    expect(within(siliconExpert).getByText('Jun 2022 – Present')).toBeInTheDocument();
    const siliconExpertLink = within(siliconExpert).getByRole('link', {
      name: /Read case study/i,
    });
    expect(siliconExpertLink).toHaveAttribute('href', '/experience/siliconexpert');

    expect(within(idemia).getByText('Senior Software Engineer')).toBeInTheDocument();
    expect(within(idemia).getByText('Jul 2018 – May 2022')).toBeInTheDocument();
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

  it('renders always-visible, non-expandable compact rows for earlier role progression', () => {
    const { container } = renderExperience();

    const earlierHeading = screen.getByRole('heading', { level: 3, name: /Role Progression/i });
    expect(earlierHeading).toBeInTheDocument();

    const earlierList = earlierHeading.nextElementSibling;
    expect(earlierList?.tagName).toBe('UL');
    const rows = within(earlierList as HTMLElement).getAllByRole('listitem');
    expect(rows).toHaveLength(2);

    expect(rows[0]).toHaveTextContent(/SiliconExpert/);
    expect(rows[0]).toHaveTextContent(/Senior Front End Developer I/);
    expect(rows[0]).toHaveTextContent(/Jun 2022 – Mar 2025/);

    expect(rows[1]).toHaveTextContent(/IDEMIA Egypt/);
    expect(rows[1]).toHaveTextContent(/Junior Front End Developer/);
    expect(rows[1]).toHaveTextContent(/Jul 2018 – Apr 2021/);

    for (const row of rows) {
      expect(row).toBeVisible();
      expect(within(row).queryByRole('button')).toBeNull();
      expect(within(row).queryByRole('link')).toBeNull();
    }

    expect(container.querySelector('details')).toBeNull();
  });
});
