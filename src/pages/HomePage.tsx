import { AboutSection } from '../components/home/AboutSection';
import { ContactSection } from '../components/home/ContactSection';
import { ExperienceSection } from '../components/home/ExperienceSection';
import { HeroSection } from '../components/home/HeroSection';
import { ProjectsSection } from '../components/home/ProjectsSection';
import { experienceContent, homeContent, profile, projectsContent } from '../content';

export function HomePage() {
  return (
    <main id="main-content">
      <HeroSection hero={homeContent.hero} hasCvPdf={profile.hasCvPdf} />
      <AboutSection about={homeContent.about} />
      <ExperienceSection experience={experienceContent} />
      <ProjectsSection projects={projectsContent} />
      <ContactSection profile={profile} />
    </main>
  );
}
