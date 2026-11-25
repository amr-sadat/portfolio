import type { ContextStripData } from '../../content';
import styles from './ContextStrip.module.css';

export interface ContextStripProps {
  readonly data: ContextStripData;
}

export function ContextStrip({ data }: ContextStripProps) {
  return (
    <section aria-label="Context Strip" className={styles.strip}>
      <dl className={styles.grid}>
        <div className={styles.item}>
          <dt className={styles.label}>Role</dt>
          <dd className={styles.value}>{data.role}</dd>
        </div>

        <div className={styles.item}>
          <dt className={styles.label}>Tenure</dt>
          <dd className={`${styles.value} ${styles.mono}`}>{data.tenure}</dd>
        </div>

        <div className={styles.item}>
          <dt className={styles.label}>NDA-Safe Scale Signals</dt>
          <dd className={styles.value}>
            <ul className={styles.signalList}>
              {data.scaleSignals.map((signal) => (
                <li key={signal} className={styles.signalItem}>
                  {signal}
                </li>
              ))}
            </ul>
          </dd>
        </div>

        <div className={styles.item}>
          <dt className={styles.label}>Core Stack</dt>
          <dd className={styles.value}>
            <ul className={styles.stackList} aria-label="Core Stack">
              {data.coreStack.map((tech) => (
                <li key={tech} className={styles.stackToken}>
                  {tech}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </section>
  );
}
