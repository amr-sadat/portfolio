import { Link } from 'react-router';
import { UNVERIFIED_CV_MARKER, type Profile, type SiblingCaseStudyRef } from '../../content';
import { useCopyEmail } from '../../hooks/useCopyEmail';
import styles from './CaseStudyFooter.module.css';

export interface CaseStudyFooterProps {
  readonly sibling: SiblingCaseStudyRef;
  readonly profile: Profile;
}

export function CaseStudyFooter({ sibling, profile }: CaseStudyFooterProps) {
  const { email, linkedin } = profile.contact;
  const { copyState, copyEmail } = useCopyEmail(email);
  const hasVerifiedLinkedin = linkedin.href !== UNVERIFIED_CV_MARKER;

  return (
    <aside aria-label="Continue reading and contact" className={styles.footerFlow}>
      <section aria-labelledby="sibling-case-study-heading" className={styles.siblingSection}>
        <p id="sibling-case-study-heading" className={styles.eyebrow}>
          Sibling Case Study
        </p>

        <Link to={sibling.href} className={styles.siblingCard}>
          <div className={styles.siblingHeader}>
            <span className={styles.siblingCompany}>{sibling.company}</span>
            <span className={styles.siblingSystem}>{sibling.system}</span>
          </div>
          <p className={styles.siblingSummary}>{sibling.summary}</p>
          <span className={styles.siblingCta}>Read case study →</span>
        </Link>
      </section>

      <section aria-labelledby="case-study-contact-heading" className={styles.contactSection}>
        <h2 id="case-study-contact-heading" className={styles.contactHeading}>
          Want to discuss frontend architecture?
        </h2>
        <p className={styles.contactLead}>
          Reach out directly by email or LinkedIn for Senior &amp; Staff Frontend engineering roles
          or technical conversations.
        </p>

        <div className={styles.contactActions}>
          <button
            type="button"
            className={
              copyState === 'copied'
                ? `${styles.copyButton} ${styles.copyButtonCopied}`
                : styles.copyButton
            }
            onClick={copyEmail}
          >
            {copyState === 'copied' ? 'Copied' : 'Copy Email'}
          </button>

          <a href={`mailto:${email}`} className={styles.mailtoLink}>
            {email}
          </a>

          {hasVerifiedLinkedin ? (
            <a
              href={linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkedinLink}
            >
              <span>{linkedin.label}</span>
              <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          ) : (
            <span className={styles.linkedinPlaceholder}>
              <span className={styles.linkedinLabel}>{linkedin.label}</span>
              <span className={styles.linkedinMarker}>{linkedin.href}</span>
            </span>
          )}
        </div>

        <div
          role="status"
          aria-live="polite"
          className={
            copyState === 'copied'
              ? `${styles.liveRegion} ${styles.liveRegionCopied}`
              : copyState === 'fallback'
                ? `${styles.liveRegion} ${styles.liveRegionFallback}`
                : styles.liveRegion
          }
        >
          {copyState === 'copied'
            ? `Copied ${email} to clipboard.`
            : copyState === 'fallback'
              ? `Clipboard access unavailable — use the mailto link or copy ${email}.`
              : ''}
        </div>
      </section>
    </aside>
  );
}
