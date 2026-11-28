import { UNVERIFIED_CV_MARKER, type Profile } from '../../content/profile';
import { useCopyEmail } from '../../hooks/useCopyEmail';
import styles from './ContactSection.module.css';

export interface ContactSectionProps {
  readonly profile: Profile;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const { email, github, linkedin } = profile.contact;
  const { copyState, copyEmail } = useCopyEmail(email);
  const hasVerifiedLinkedin = linkedin.href !== UNVERIFIED_CV_MARKER;

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <h2 id="contact-heading" className={styles.title}>
        Contact
      </h2>
      <p className={styles.lead}>
        Best reached directly by email for Senior &amp; Staff Frontend engineering roles,
        architecture advisory, or technical conversations.
      </p>
      <div className={styles.rule} aria-hidden="true" />

      <div className={styles.bar}>
        <div className={styles.primaryActions}>
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
        </div>

        <ul className={styles.channelList} aria-label="Public links and details">
          <li className={styles.channelItem}>
            {hasVerifiedLinkedin ? (
              <a
                href={linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.channelLink}
              >
                <span>{linkedin.label}</span>
                <svg
                  className={styles.externalGlyph}
                  width="15"
                  height="15"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5.25 12.75L12.75 5.25M12.75 5.25H6.75M12.75 5.25V11.25"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            ) : (
              <span className={styles.channelPlaceholder}>
                <span className={styles.channelLabel}>{linkedin.label}</span>
                <span className={styles.channelMarker}>{linkedin.href}</span>
              </span>
            )}
          </li>

          <li className={styles.channelItem}>
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.channelLink}
            >
              <span>{github.label}</span>
              <svg
                className={styles.externalGlyph}
                width="15"
                height="15"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5.25 12.75L12.75 5.25M12.75 5.25H6.75M12.75 5.25V11.25"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </li>

          <li className={styles.channelItem}>
            <span className={styles.location}>{profile.location}</span>
          </li>

          {profile.hasCvPdf ? (
            <li className={styles.channelItem}>
              <a href={profile.cvPath} className={styles.cvLink}>
                Download CV
              </a>
            </li>
          ) : null}
        </ul>
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
  );
}
