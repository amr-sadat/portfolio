import type { HeroContent } from '../../content';
import styles from './HeroSection.module.css';

export interface HeroSectionProps {
  readonly hero: HeroContent;
  readonly hasCvPdf: boolean;
}

export function HeroSection({ hero, hasCvPdf }: HeroSectionProps) {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.inner}>
        <h1 id="hero-heading" className={styles.name}>
          {hero.name}
        </h1>
        <p className={styles.role}>{hero.role}</p>
        <p className={styles.thesis}>{hero.thesis}</p>
        <p className={styles.capabilities}>{hero.capabilityStrip}</p>
        <p className={styles.availability}>
          <span className={styles.statusDot} aria-hidden="true" />
          <span>{hero.availability}</span>
        </p>
        <div className={styles.actions}>
          <a href={hero.primaryCta.href} className={styles.primaryCta}>
            {hero.primaryCta.label}
          </a>
          {hasCvPdf ? (
            <a href={hero.cvCta.href} className={styles.secondaryCta}>
              {hero.cvCta.label}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
