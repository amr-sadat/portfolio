import type { AboutContent } from '../../content';
import styles from './AboutSection.module.css';

export interface AboutSectionProps {
  readonly about: AboutContent;
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.grid}>
        <h2 id="about-heading">{about.heading}</h2>
        <div className={styles.beats}>
          {about.beats.map((beat) => (
            <article key={beat.id} className={styles.beat}>
              <h3>{beat.title}</h3>
              <p className={styles.beatBody}>{beat.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
