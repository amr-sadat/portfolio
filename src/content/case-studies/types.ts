import type { FlagshipId } from '../experience';
import type { CvBackedValue } from '../profile';

export type CaseStudySectionId = 'context' | 'problem' | 'architecture' | 'craft' | 'outcomes';

export type CaseStudySectionNumber = '01' | '02' | '03' | '04' | '05';

export type ArchitectureLensId = 'Data flow' | 'Structure' | 'Resilience' | 'Performance';

export const CASE_STUDY_SECTION_ORDER: readonly CaseStudySectionId[] = [
  'context',
  'problem',
  'architecture',
  'craft',
  'outcomes',
] as const;

export const ARCHITECTURE_LENSES: readonly ArchitectureLensId[] = [
  'Data flow',
  'Structure',
  'Resilience',
  'Performance',
] as const;

export interface ContextStripData {
  readonly role: CvBackedValue<string>;
  readonly tenure: CvBackedValue<string>;
  readonly scaleSignals: readonly string[];
  readonly coreStack: readonly string[];
}

export interface ContextSectionData {
  readonly id: 'context';
  readonly number: '01';
  readonly title: 'Context & System Scope';
  readonly paragraphs: readonly string[];
}

export interface ProblemSectionData {
  readonly id: 'problem';
  readonly number: '02';
  readonly title: 'Problem & Constraints';
  readonly paragraphs: readonly string[];
  readonly constraints: readonly string[];
}

export interface TradeoffBreakdown {
  readonly id: string;
  readonly title: string;
  readonly decision: string;
  readonly tradeoff: string;
}

export interface ArchitectureSectionData {
  readonly id: 'architecture';
  readonly number: '03';
  readonly title: 'Architectural Decisions & Trade-offs';
  readonly intro: string;
  readonly tradeoffs: readonly [TradeoffBreakdown, TradeoffBreakdown, ...TradeoffBreakdown[]];
}

export interface CraftSectionData {
  readonly id: 'craft';
  readonly number: '04';
  readonly title: 'Craft & Execution';
  readonly paragraphs: readonly string[];
  readonly practices: readonly string[];
}

export interface OutcomesSectionData {
  readonly id: 'outcomes';
  readonly number: '05';
  readonly title: 'NDA-Safe Outcomes & Retrospective';
  readonly outcomes: readonly CvBackedValue<string>[];
  readonly retrospective: string;
}

export interface CaseStudySections {
  readonly context: ContextSectionData;
  readonly problem: ProblemSectionData;
  readonly architecture: ArchitectureSectionData;
  readonly craft: CraftSectionData;
  readonly outcomes: OutcomesSectionData;
}

export interface DiagramSlotConfig {
  readonly id: FlagshipId;
  readonly title: string;
  readonly caption: string;
  readonly lenses: readonly ArchitectureLensId[];
}

export interface SiblingCaseStudyRef {
  readonly id: FlagshipId;
  readonly company: string;
  readonly system: string;
  readonly href: `/experience/${FlagshipId}`;
  readonly summary: string;
}

export interface CaseStudy {
  readonly id: FlagshipId;
  readonly company: string;
  readonly system: string;
  readonly title: string;
  readonly subtitle: string;
  readonly ndaNotice: string;
  readonly contextStrip: ContextStripData;
  readonly diagram: DiagramSlotConfig;
  readonly sections: CaseStudySections;
  readonly sibling: SiblingCaseStudyRef;
}

export interface CaseStudyTocItem {
  readonly id: CaseStudySectionId;
  readonly number: CaseStudySectionNumber;
  readonly title: string;
}

export function getCaseStudyTocItems(study: CaseStudy): readonly CaseStudyTocItem[] {
  return CASE_STUDY_SECTION_ORDER.map((id) => {
    const section = study.sections[id];
    return {
      id: section.id,
      number: section.number,
      title: section.title,
    };
  });
}
