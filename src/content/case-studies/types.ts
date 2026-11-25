import type { FlagshipId } from '../experience';
import type { CvBackedValue } from '../profile';

export type CaseStudySectionId = 'context' | 'problem' | 'architecture' | 'craft' | 'outcomes';

export type CaseStudySectionNumber = '01' | '02' | '03' | '04' | '05';

export type ArchitectureLensId = 'data-flow' | 'structure' | 'resilience' | 'performance';

export const CASE_STUDY_SECTION_ORDER: readonly CaseStudySectionId[] = [
  'context',
  'problem',
  'architecture',
  'craft',
  'outcomes',
] as const;

export const ARCHITECTURE_LENSES: readonly ArchitectureLensId[] = [
  'data-flow',
  'structure',
  'resilience',
  'performance',
] as const;

export const ARCHITECTURE_LENS_LABELS: Readonly<Record<ArchitectureLensId, string>> = {
  'data-flow': 'Data flow',
  structure: 'Structure',
  resilience: 'Resilience',
  performance: 'Performance',
};

export interface SchematicZone {
  readonly id: string;
  readonly label: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export interface SchematicNode {
  readonly id: string;
  readonly label: string;
  readonly sublabel: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly kind?: 'surface' | 'foundation';
}

export interface SchematicEdge {
  readonly id: string;
  readonly from: string;
  readonly to: string;
  readonly path: string;
  readonly label?: string;
  readonly labelX?: number;
  readonly labelY?: number;
}

export interface SchematicCallout {
  readonly number: number;
  readonly nodeId: string;
  readonly title: string;
  readonly detail: string;
  readonly badgeOffset?: {
    readonly dx: number;
    readonly dy: number;
  };
}

export interface ArchitectureLensView {
  readonly id: ArchitectureLensId;
  readonly label: string;
  readonly summary: string;
  readonly activeNodes: readonly string[];
  readonly activeEdges: readonly string[];
  readonly packetEdges?: readonly string[];
  readonly callouts: readonly SchematicCallout[];
}

export interface ArchitectureSchematic {
  readonly id: FlagshipId;
  readonly title: string;
  readonly caption: string;
  readonly viewBox: {
    readonly width: number;
    readonly height: number;
  };
  readonly zones: readonly SchematicZone[];
  readonly nodes: readonly SchematicNode[];
  readonly edges: readonly SchematicEdge[];
  readonly lenses: Readonly<Record<ArchitectureLensId, ArchitectureLensView>>;
}

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
  readonly schematic: ArchitectureSchematic;
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
