import { ContactSection } from '../components/home/ContactSection';
import { ExperienceSection } from '../components/home/ExperienceSection';
import { HeroSection } from '../components/home/HeroSection';
import { ProjectsSection } from '../components/home/ProjectsSection';
import { experienceContent } from '../content/experience';
import { homeContent } from '../content/home';
import { profile } from '../content/profile';
import { projectsContent } from '../content/projects';

export function HomePage() {
  return (
    <main id="main-content">
      <HeroSection hero={homeContent.hero} hasCvPdf={profile.hasCvPdf} />
      <ExperienceSection experience={experienceContent} />
      <ProjectsSection projects={projectsContent} />
      <ContactSection profile={profile} />
    </main>
  );
}
