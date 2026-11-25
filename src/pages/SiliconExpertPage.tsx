import { CaseStudyLayout } from '../components/case-study';
import { siliconExpertCaseStudy } from '../content/case-studies/siliconexpert';
import { profile } from '../content/profile';

export function SiliconExpertPage() {
  return <CaseStudyLayout caseStudy={siliconExpertCaseStudy} profile={profile} />;
}
