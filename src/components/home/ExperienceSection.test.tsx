import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { experienceContent } from '../../content';
import { ExperienceSection } from './ExperienceSection';

function renderExperience() {
  return render(<ExperienceSection experience={experienceContent} />);
}

describe('ExperienceSection', () => {
  it('renders #experience landmark with 4 reverse-chronological role cards', () => {
    const { container } = renderExperience();

    const section = container.querySelector('section#experience');
    expect(section).not.toBeNull();
    expect(screen.getByRole('heading', { level: 2, name: 'Experience' })).toBeInTheDocument();

    const roleCards = screen.getAllByRole('article');
    expect(roleCards).toHaveLength(4);

    const headings = roleCards.map((card) => within(card).getByRole('heading', { level: 3 }));
    expect(headings.map((h) => h.textContent)).toEqual([
      'Senior Front End Developer II',
      'Senior Front End Developer I',
      'Senior Software Engineer',
      'Junior Front End Developer',
    ]);
  });

  it('renders company, tenure, highlights, and stack tags on every role card without case study links', () => {
    const { container } = renderExperience();

    const roleCards = screen.getAllByRole('article');
    expect(roleCards).toHaveLength(4);

    expect(within(roleCards[0]!).getByText('SiliconExpert')).toBeInTheDocument();
    expect(within(roleCards[0]!).getByText('Apr 2025 – Present')).toBeInTheDocument();

    expect(within(roleCards[1]!).getByText('SiliconExpert')).toBeInTheDocument();
    expect(within(roleCards[1]!).getByText('Jun 2022 – Mar 2025')).toBeInTheDocument();

    expect(within(roleCards[2]!).getByText('IDEMIA Egypt')).toBeInTheDocument();
    expect(within(roleCards[2]!).getByText('May 2021 – May 2022')).toBeInTheDocument();

    expect(within(roleCards[3]!).getByText('IDEMIA Egypt')).toBeInTheDocument();
    expect(within(roleCards[3]!).getByText('Jul 2018 – Apr 2021')).toBeInTheDocument();

    for (const card of roleCards) {
      expect(within(card).queryByRole('link')).toBeNull();
      const lists = within(card).getAllByRole('list');
      expect(lists).toHaveLength(2);
      expect(within(lists[0]!).getAllByRole('listitem')).toHaveLength(3);
      expect(within(lists[1]!).getAllByRole('listitem').length).toBeGreaterThanOrEqual(3);
    }

    expect(container.querySelector('svg')).toBeNull();
    expect(container.querySelector('img')).toBeNull();
  });
});
