import type { ExperienceContent } from '../../content';
import styles from './ExperienceSection.module.css';

export interface ExperienceSectionProps {
  readonly experience: ExperienceContent;
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-heading">
      <div className={styles.header}>
        <h2 id="experience-heading">{experience.heading}</h2>
        <p className={styles.subtitle}>{experience.subtitle}</p>
      </div>

      <div className={styles.cardsGrid}>
        {experience.roles.map((entry) => (
          <article key={entry.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.topRow}>
                <p className={styles.companyLine}>
                  <span className={styles.company}>{entry.company}</span>
                  <span className={styles.separator} aria-hidden="true">
                    ·
                  </span>
                  <span className={styles.system}>{entry.system}</span>
                </p>
                <span className={entry.isCurrent ? styles.tenureCurrent : styles.tenure}>
                  {entry.tenure}
                </span>
              </div>

              <h3 className={styles.roleTitle}>{entry.role}</h3>
            </div>

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
          </article>
        ))}
      </div>
    </section>
  );
}
