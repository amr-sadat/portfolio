import type { ProjectsContent } from '../../content';
import styles from './ProjectsSection.module.css';

export interface ProjectsSectionProps {
  readonly projects: ProjectsContent;
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-heading">
      <div className={styles.header}>
        <h2 id="projects-heading">{projects.heading}</h2>
      </div>

      <ul className={styles.grid}>
        {projects.items.map((project) => (
          <li key={project.id} className={styles.cardItem}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <div className={styles.cardTop}>
                <div className={styles.titleRow}>
                  <h3 className={styles.name}>{project.name}</h3>
                  {project.statusBadge ? (
                    <span className={styles.statusBadge}>{project.statusBadge}</span>
                  ) : null}
                </div>
                <span className={styles.externalGlyph} aria-hidden="true">
                  ↗
                </span>
              </div>

              <p className={styles.summary}>{project.summary}</p>

              <div className={styles.cardBottom}>
                <ul className={styles.stackList} aria-label={`${project.name} stack`}>
                  {project.stack.map((tech) => (
                    <li key={tech} className={styles.stackTag}>
                      {tech}
                    </li>
                  ))}
                </ul>
                <span className={styles.repoLabel}>
                  {project.repoLabel}
                  <span className="sr-only"> (opens in new tab)</span>
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
