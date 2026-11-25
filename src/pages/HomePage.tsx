import { Link } from 'react-router';

export function HomePage() {
  return (
    <main id="main-content">
      <h1>Amr Sadat Abou Hegab</h1>
      <section id="about" aria-labelledby="about-heading">
        <h2 id="about-heading">About</h2>
      </section>
      <section id="experience" aria-labelledby="experience-heading">
        <h2 id="experience-heading">Experience</h2>
        <ul>
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
      <section id="projects" aria-labelledby="projects-heading">
        <h2 id="projects-heading">Personal Projects</h2>
      </section>
      <section id="contact" aria-labelledby="contact-heading">
        <h2 id="contact-heading">Contact</h2>
      </section>
    </main>
  );
}
