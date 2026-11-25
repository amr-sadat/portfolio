import { CaseStudyLayout } from '../components/case-study';
import { idemiaCaseStudy, profile } from '../content';

export function IdemiaPage() {
  return <CaseStudyLayout caseStudy={idemiaCaseStudy} profile={profile} />;
}
