export {
  ARCHITECTURE_LENSES,
  CASE_STUDY_SECTION_ORDER,
  caseStudies,
  getCaseStudyTocItems,
  idemiaCaseStudy,
  siliconExpertCaseStudy,
} from './case-studies';
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
} from './case-studies';
export { experienceContent } from './experience';
export type {
  CaseStudyTeaser,
  EarlierRoleEntry,
  ExperienceContent,
  FlagshipId,
} from './experience';
export { homeContent } from './home';
export type { AboutBeat, AboutContent, CtaLink, HeroContent, HomeContent } from './home';
export { projectsContent } from './projects';
export type { PersonalProject, ProjectsContent } from './projects';
export { createProfile, profile, UNVERIFIED_CV_MARKER } from './profile';
export type {
  ContactChannels,
  ContactLink,
  CvBackedValue,
  Profile,
  ProfileOverrides,
  UnverifiedCvMarker,
} from './profile';
