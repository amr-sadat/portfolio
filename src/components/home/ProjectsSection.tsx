import type { ProjectsContent } from '../../content';
import styles from './ProjectsSection.module.css';

export interface ProjectsSectionProps {
  readonly projects: ProjectsContent;
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-heading">
      <h2 id="projects-heading" className={styles.heading}>
        {projects.heading}
      </h2>
      <div className={styles.rule} aria-hidden="true" />

      <ul className={styles.columns}>
        {projects.items.map((project) => (
          <li key={project.id} className={styles.columnItem}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectLink}
            >
              <div className={styles.cardTop}>
                <div className={styles.titleRow}>
                  <h3 className={styles.name}>{project.name}</h3>
                  {project.statusBadge ? (
                    <span className={styles.statusBadge}>{project.statusBadge}</span>
                  ) : null}
                </div>
                <svg
                  className={styles.externalGlyph}
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5.25 12.75L12.75 5.25M12.75 5.25H6.75M12.75 5.25V11.25"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
