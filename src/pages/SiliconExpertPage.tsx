import { CaseStudyLayout } from '../components/case-study';
import { profile, siliconExpertCaseStudy } from '../content';

export function SiliconExpertPage() {
  return <CaseStudyLayout caseStudy={siliconExpertCaseStudy} profile={profile} />;
}
