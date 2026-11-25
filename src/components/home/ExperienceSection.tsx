import { Link } from 'react-router';
import type { ExperienceContent } from '../../content';
import styles from './ExperienceSection.module.css';

export interface ExperienceSectionProps {
  readonly experience: ExperienceContent;
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-heading">
      <div className={styles.grid}>
        <h2 id="experience-heading">{experience.heading}</h2>

        <div className={styles.content}>
          <div className={styles.flagships}>
            {experience.flagships.map((teaser) => (
              <article key={teaser.id} className={styles.teaser}>
                <div className={styles.teaserHeader}>
                  <h3 className={styles.teaserTitle}>
                    <span>{teaser.company}</span>
                    <span className={styles.systemSeparator} aria-hidden="true">
                      {' '}
                      —{' '}
                    </span>
                    <span className={styles.systemName}>{teaser.system}</span>
                  </h3>
                  <p className={styles.meta}>
                    <span>{teaser.role}</span>
                    <span className={styles.metaDivider} aria-hidden="true">
                      ·
                    </span>
                    <span className={styles.tenure}>{teaser.tenure}</span>
                  </p>
                </div>

                <p className={styles.problem}>{teaser.problemStatement}</p>

                <div className={styles.teaserFooter}>
                  <ul className={styles.stackList} aria-label={`${teaser.company} core stack`}>
                    {teaser.stack.map((tag) => (
                      <li key={tag} className={styles.stackTag}>
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <Link to={teaser.href} className={styles.caseStudyLink}>
                    {teaser.ctaLabel}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.earlierBlock}>
            <h3 className={styles.earlierHeading}>{experience.earlierRolesHeading}</h3>
            <ul className={styles.earlierList}>
              {experience.earlierRoles.map((entry) => (
                <li key={entry.id} className={styles.earlierRow}>
                  <span className={styles.earlierCompany}>{entry.company}</span>
                  <span className={styles.earlierRole}>{entry.role}</span>
                  <span className={styles.earlierTenure}>{entry.tenure}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
