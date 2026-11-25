import type { FlagshipId } from '../experience';
import { idemiaCaseStudy } from './idemia';
import { siliconExpertCaseStudy } from './siliconexpert';
import type { CaseStudy } from './types';

export { idemiaCaseStudy } from './idemia';
export { siliconExpertCaseStudy } from './siliconexpert';
export { ARCHITECTURE_LENSES, CASE_STUDY_SECTION_ORDER, getCaseStudyTocItems } from './types';
export type {
  ArchitectureLensId,
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
  SiblingCaseStudyRef,
  TradeoffBreakdown,
} from './types';

export const caseStudies: Readonly<Record<FlagshipId, CaseStudy>> = {
  siliconexpert: siliconExpertCaseStudy,
  idemia: idemiaCaseStudy,
};
