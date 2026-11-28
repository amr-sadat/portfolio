import type { AboutContent } from '../../content';
import styles from './AboutSection.module.css';

export interface AboutSectionProps {
  readonly about: AboutContent;
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <h2 id="about-heading" className={styles.heading}>
        {about.heading}
      </h2>
      <div className={styles.rule} aria-hidden="true" />
      <div className={styles.columns}>
        {about.beats.map((beat) => (
          <article key={beat.id} className={styles.beat}>
            <h3 className={styles.beatTitle}>{beat.title}</h3>
            <p className={styles.beatBody}>{beat.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
