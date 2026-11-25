import styles from './FooterColophon.module.css';

export function FooterColophon() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.colophon}>
          <p className={styles.eyebrow}>Colophon</p>
          <p className={styles.copy}>
            Built with React 19, TypeScript, React Router SPA, CSS Modules &amp; custom-property
            tokens. Self-hosted typography, zero analytics, static deployment.
          </p>
        </div>
        <div className={styles.meta}>
          <a
            href="https://github.com/amr-sadat/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.repoLink}
          >
            github.com/amr-sadat/portfolio
          </a>
        </div>
      </div>
    </footer>
  );
}
