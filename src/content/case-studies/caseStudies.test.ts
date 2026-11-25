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

  it('keeps unverified CV facts marked and includes typed ArchitectureSchematic data for both case studies', () => {
    expect(siliconExpertCaseStudy.contextStrip.role).toBe('Senior Front End Developer II');
    expect(siliconExpertCaseStudy.contextStrip.tenure).toBe(UNVERIFIED_CV_MARKER);

    expect(idemiaCaseStudy.contextStrip.role).toBe(UNVERIFIED_CV_MARKER);
    expect(idemiaCaseStudy.contextStrip.tenure).toBe(UNVERIFIED_CV_MARKER);

    const expectedLensIds = ['data-flow', 'structure', 'resilience', 'performance'] as const;

    for (const study of allStudies) {
      expect(study.diagram.id).toBe(study.id);
      expect(study.diagram.lenses).toEqual(expectedLensIds);

      const { schematic } = study;
      expect(schematic.id).toBe(study.id);
      expect(schematic.nodes.length).toBeGreaterThanOrEqual(5);
      expect(schematic.nodes.length).toBeLessThanOrEqual(7);
      expect(schematic.edges.length).toBeGreaterThanOrEqual(4);
      expect(schematic.zones.length).toBeGreaterThanOrEqual(1);

      const nodeIds = new Set(schematic.nodes.map((node) => node.id));
      const edgeIds = new Set(schematic.edges.map((edge) => edge.id));

      for (const edge of schematic.edges) {
        expect(nodeIds.has(edge.from)).toBe(true);
        expect(nodeIds.has(edge.to)).toBe(true);
      }

      for (const lensId of expectedLensIds) {
        const lens = schematic.lenses[lensId];
        expect(lens.id).toBe(lensId);
        expect(lens.callouts.length).toBeGreaterThanOrEqual(3);
        expect(lens.callouts.length).toBeLessThanOrEqual(4);

        for (const activeNodeId of lens.activeNodes) {
          expect(nodeIds.has(activeNodeId)).toBe(true);
        }
        for (const activeEdgeId of lens.activeEdges) {
          expect(edgeIds.has(activeEdgeId)).toBe(true);
        }
        for (const [index, callout] of lens.callouts.entries()) {
          expect(callout.number).toBe(index + 1);
          expect(nodeIds.has(callout.nodeId)).toBe(true);
        }
      }

      expect(schematic.lenses['data-flow'].packetEdges?.length).toBeGreaterThan(0);
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
