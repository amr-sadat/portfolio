import type { ExperienceContent } from '../../content';
import styles from './ExperienceSection.module.css';

export interface ExperienceSectionProps {
  readonly experience: ExperienceContent;
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-heading">
      <div className={styles.header}>
        <h2 id="experience-heading" className={styles.heading}>
          {experience.heading}
        </h2>
        <p className={styles.subtitle}>{experience.subtitle}</p>
      </div>

      <div className={styles.ledger}>
        {experience.roles.map((entry) => (
          <article key={entry.id} className={styles.row}>
            <div className={styles.rail}>
              <span className={entry.isCurrent ? styles.tenureCurrent : styles.tenure}>
                {entry.tenure}
              </span>
              <p className={styles.company}>{entry.company}</p>
              <p className={styles.system}>{entry.system}</p>
            </div>

            <div className={styles.detail}>
              <h3 className={styles.roleTitle}>{entry.role}</h3>
              <p className={styles.summary}>{entry.summary}</p>

              <ul className={styles.highlights} aria-label={`${entry.role} key responsibilities`}>
                {entry.highlights.map((item) => (
                  <li key={item} className={styles.highlightItem}>
                    {item}
                  </li>
                ))}
              </ul>

              <ul
                className={styles.stackList}
                aria-label={`${entry.role} at ${entry.company} core stack`}
              >
                {entry.stack.map((tag) => (
                  <li key={tag} className={styles.stackTag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
