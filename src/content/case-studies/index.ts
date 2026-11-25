import type { FlagshipId } from '../experience';
import { idemiaCaseStudy } from './idemia';
import { siliconExpertCaseStudy } from './siliconexpert';
import type { CaseStudy } from './types';

export { idemiaCaseStudy } from './idemia';
export { idemiaSchematic, siliconExpertSchematic } from './schematics';
export { siliconExpertCaseStudy } from './siliconexpert';
export {
  ARCHITECTURE_LENS_LABELS,
  ARCHITECTURE_LENSES,
  CASE_STUDY_SECTION_ORDER,
  getCaseStudyTocItems,
} from './types';
export type {
  ArchitectureLensId,
  ArchitectureLensView,
  ArchitectureSchematic,
  ArchitectureSectionData,
  CaseStudy,
  CaseStudySectionId,
  CaseStudySectionNumber,
  CaseStudySections,
  CaseStudyTocItem,
  ContextSectionData,
  ContextStripData,
  CraftSectionData,
  DiagramSlotConfig,
  OutcomesSectionData,
  ProblemSectionData,
  SchematicCallout,
  SchematicEdge,
  SchematicNode,
  SchematicZone,
  SiblingCaseStudyRef,
  TradeoffBreakdown,
} from './types';

export const caseStudies: Readonly<Record<FlagshipId, CaseStudy>> = {
  siliconexpert: siliconExpertCaseStudy,
  idemia: idemiaCaseStudy,
};
