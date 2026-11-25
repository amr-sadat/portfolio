import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { profile, siliconExpertCaseStudy } from '../../content';
import { CaseStudyLayout } from './CaseStudyLayout';

function renderCaseStudy() {
  return render(
    <MemoryRouter initialEntries={['/experience/siliconexpert']}>
      <CaseStudyLayout caseStudy={siliconExpertCaseStudy} profile={profile} />
    </MemoryRouter>,
  );
}

describe('CaseStudyLayout', () => {
  it('renders the back link, Context Strip, all 5 numbered sections, and the diagram stage slot', () => {
    renderCaseStudy();

    const main = screen.getByRole('main');
    expect(within(main).getByRole('link', { name: /← experience/i })).toHaveAttribute(
      'href',
      '/#experience',
    );

    expect(
      within(main).getByRole('heading', { level: 1, name: /siliconexpert — p5 platform/i }),
    ).toBeInTheDocument();

    const contextStrip = within(main).getByRole('region', { name: /context strip/i });
    expect(within(contextStrip).getByText('Senior Front End Developer II')).toBeInTheDocument();
    expect(within(contextStrip).getByText('[Verify from CV at copy pass]')).toBeInTheDocument();
    expect(within(contextStrip).getByText(/global electronics supply-chain/i)).toBeInTheDocument();
    expect(within(contextStrip).getByText('NgRx Signal Store')).toBeInTheDocument();

    expect(
      within(main).getByRole('heading', { level: 2, name: /01.*context & system scope/i }),
    ).toBeInTheDocument();
    expect(
      within(main).getByRole('heading', { level: 2, name: /02.*problem & constraints/i }),
    ).toBeInTheDocument();
    expect(
      within(main).getByRole('heading', {
        level: 2,
        name: /03.*architectural decisions & trade-offs/i,
      }),
    ).toBeInTheDocument();
    expect(
      within(main).getByRole('heading', { level: 2, name: /04.*craft & execution/i }),
    ).toBeInTheDocument();
    expect(
      within(main).getByRole('heading', {
        level: 2,
        name: /05.*nda-safe outcomes & retrospective/i,
      }),
    ).toBeInTheDocument();

    const diagramSlot = main.querySelector('[data-diagram-slot="siliconexpert"]');
    expect(diagramSlot).not.toBeNull();
    expect(diagramSlot).toHaveTextContent(/p5 platform frontend architecture schematic/i);
    expect(
      within(diagramSlot as HTMLElement).getByRole('button', { name: 'Data flow' }),
    ).toHaveAttribute('aria-pressed', 'true');
    expect(diagramSlot!.querySelector('svg')).not.toBeNull();
  });
});
