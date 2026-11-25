import { Link } from 'react-router';
import { AboutSection } from '../components/home/AboutSection';
import { HeroSection } from '../components/home/HeroSection';
import { homeContent, profile } from '../content';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <main id="main-content">
      <HeroSection hero={homeContent.hero} hasCvPdf={profile.hasCvPdf} />
      <AboutSection about={homeContent.about} />
      <section
        id="experience"
        className={styles.placeholderSection}
        aria-labelledby="experience-heading"
      >
        <h2 id="experience-heading">Experience</h2>
        <ul className={styles.caseStudyList}>
          <li>
            <Link to="/experience/siliconexpert">SiliconExpert — P5 Platform Case Study</Link>
          </li>
          <li>
            <Link to="/experience/idemia">
              IDEMIA Egypt — Border Control, e-Visa &amp; Immigration Case Study
            </Link>
          </li>
        </ul>
      </section>
      <section
        id="projects"
        className={styles.placeholderSection}
        aria-labelledby="projects-heading"
      >
        <h2 id="projects-heading">Personal Projects</h2>
      </section>
      <section id="contact" className={styles.placeholderSection} aria-labelledby="contact-heading">
        <h2 id="contact-heading">Contact</h2>
      </section>
    </main>
  );
}
