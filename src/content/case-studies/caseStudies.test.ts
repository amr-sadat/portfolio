import { describe, expect, it } from 'vitest';
import { UNVERIFIED_CV_MARKER } from '../profile';
import {
  CASE_STUDY_SECTION_ORDER,
  caseStudies,
  idemiaCaseStudy,
  siliconExpertCaseStudy,
  type CaseStudy,
} from './index';

describe('case study content contract', () => {
  const allStudies: readonly CaseStudy[] = [siliconExpertCaseStudy, idemiaCaseStudy];

  it('exposes both flagship case studies keyed by flagship id', () => {
    expect(caseStudies.siliconexpert).toBe(siliconExpertCaseStudy);
    expect(caseStudies.idemia).toBe(idemiaCaseStudy);
  });

  it('enforces the numbered 5-part Staff engineering anatomy for every case study', () => {
    expect(CASE_STUDY_SECTION_ORDER).toEqual([
      'context',
      'problem',
      'architecture',
      'craft',
      'outcomes',
    ]);

    for (const study of allStudies) {
      expect(study.sections.context.number).toBe('01');
      expect(study.sections.context.title).toBe('Context & System Scope');
      expect(study.sections.context.paragraphs.length).toBeGreaterThanOrEqual(1);

      expect(study.sections.problem.number).toBe('02');
      expect(study.sections.problem.title).toBe('Problem & Constraints');
      expect(study.sections.problem.constraints.length).toBeGreaterThanOrEqual(2);

      expect(study.sections.architecture.number).toBe('03');
      expect(study.sections.architecture.title).toBe('Architectural Decisions & Trade-offs');
      expect(study.sections.architecture.tradeoffs.length).toBeGreaterThanOrEqual(2);
      expect(study.sections.architecture.tradeoffs.length).toBeLessThanOrEqual(3);

      expect(study.sections.craft.number).toBe('04');
      expect(study.sections.craft.title).toBe('Craft & Execution');
      expect(study.sections.craft.practices.length).toBeGreaterThanOrEqual(2);

      expect(study.sections.outcomes.number).toBe('05');
      expect(study.sections.outcomes.title).toBe('NDA-Safe Outcomes & Retrospective');
      expect(study.sections.outcomes.outcomes.length).toBeGreaterThanOrEqual(2);
      expect(study.sections.outcomes.retrospective.trim().length).toBeGreaterThan(20);
    }
  });

  it('wires symmetric sibling cross-links between SiliconExpert and IDEMIA Egypt', () => {
    expect(siliconExpertCaseStudy.sibling.id).toBe('idemia');
    expect(siliconExpertCaseStudy.sibling.href).toBe('/experience/idemia');

    expect(idemiaCaseStudy.sibling.id).toBe('siliconexpert');
    expect(idemiaCaseStudy.sibling.href).toBe('/experience/siliconexpert');
  });

  it('keeps unverified CV facts marked and includes typed diagram slots for #14', () => {
    expect(siliconExpertCaseStudy.contextStrip.role).toBe('Senior Front End Developer II');
    expect(siliconExpertCaseStudy.contextStrip.tenure).toBe(UNVERIFIED_CV_MARKER);

    expect(idemiaCaseStudy.contextStrip.role).toBe(UNVERIFIED_CV_MARKER);
    expect(idemiaCaseStudy.contextStrip.tenure).toBe(UNVERIFIED_CV_MARKER);

    for (const study of allStudies) {
      expect(study.diagram.id).toBe(study.id);
      expect(study.diagram.lenses).toEqual(['Data flow', 'Structure', 'Resilience', 'Performance']);
    }
  });

  it('includes AI-Augmented Engineering tooling in SiliconExpert craft without forbidden terms', () => {
    const serialized = JSON.stringify(siliconExpertCaseStudy);
    expect(serialized).toContain('AI-Augmented Engineering');
    expect(serialized).toContain('Claude Code');
    expect(serialized).toContain('Devin AI');
    expect(serialized).toContain('OpenCode');
  });
});
