import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { projectsContent } from '../../content';
import { ProjectsSection } from './ProjectsSection';

describe('ProjectsSection', () => {
  it('renders #projects landmark with Personal Projects heading and the curated 3-repository lineup', () => {
    const { container } = render(<ProjectsSection projects={projectsContent} />);

    const section = container.querySelector('section#projects');
    expect(section).not.toBeNull();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Personal Projects' }),
    ).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);

    expect(links[0]).toHaveAttribute('href', 'https://github.com/amr-sadat/ufuq');
    expect(links[1]).toHaveAttribute('href', 'https://github.com/amr-sadat/angular-expert');
    expect(links[2]).toHaveAttribute(
      'href',
      'https://github.com/amr-sadat/frontend-interview-prep',
    );

    for (const link of links) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAccessibleName(/opens in new tab/i);
    }
  });

  it('displays the In Progress status badge on Ufuq and exact stack tags across all projects', () => {
    render(<ProjectsSection projects={projectsContent} />);

    const links = screen.getAllByRole('link');
    const [ufuq, angularExpert, interviewPrep] = links;
    if (!ufuq || !angularExpert || !interviewPrep) {
      throw new Error('Expected three project links');
    }

    expect(within(ufuq).getByRole('heading', { level: 3, name: 'Ufuq' })).toBeInTheDocument();
    expect(within(ufuq).getByText('In Progress')).toBeInTheDocument();
    expect(within(ufuq).getByText('Angular 22')).toBeInTheDocument();
    expect(within(ufuq).getByText('NestJS 11')).toBeInTheDocument();
    expect(within(ufuq).getByText('Playwright')).toBeInTheDocument();

    expect(
      within(angularExpert).getByRole('heading', { level: 3, name: 'angular-expert' }),
    ).toBeInTheDocument();
    expect(within(angularExpert).queryByText('In Progress')).not.toBeInTheDocument();
    expect(within(angularExpert).getByText('Angular 20')).toBeInTheDocument();
    expect(within(angularExpert).getByText('AI Agent Skill')).toBeInTheDocument();

    expect(
      within(interviewPrep).getByRole('heading', { level: 3, name: 'frontend-interview-prep' }),
    ).toBeInTheDocument();
    expect(within(interviewPrep).queryByText('In Progress')).not.toBeInTheDocument();
    expect(within(interviewPrep).getByText('Frontend Architecture')).toBeInTheDocument();
  });

  it('excludes out-of-scope repositories from Personal Projects', () => {
    const { container } = render(<ProjectsSection projects={projectsContent} />);
    const text = container.textContent ?? '';

    expect(text).not.toMatch(/shared-ui-angular|raunaq|ng-libs/i);
    expect(container.innerHTML).not.toContain('github.com/amr-sadat/portfolio');
  });
});
