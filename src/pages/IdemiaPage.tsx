import { CaseStudyLayout } from '../components/case-study';
import { idemiaCaseStudy } from '../content/case-studies/idemia';
import { profile } from '../content/profile';

export function IdemiaPage() {
  return <CaseStudyLayout caseStudy={idemiaCaseStudy} profile={profile} />;
}
