import { Link } from 'react-router';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <main id="main-content" className={styles.main}>
      <section className={`surface-card ${styles.card}`} aria-labelledby="not-found-heading">
        <span className={styles.code}>404</span>
        <h1 id="not-found-heading" className={styles.heading}>
          404 — Page Not Found
        </h1>
        <p className={styles.copy}>
          The route you requested is not part of this portfolio. Return to the home page or jump
          straight to the Experience Case Studies.
        </p>
        <nav aria-label="Recovery links" className={styles.actions}>
          <Link to="/" className={styles.primaryAction}>
            Return Home
          </Link>
          <Link to="/#experience" className={styles.secondaryAction}>
            View Experience
          </Link>
        </nav>
      </section>
    </main>
  );
}
