import { useEffect, useRef, useState } from 'react';
import { UNVERIFIED_CV_MARKER, type Profile } from '../../content';
import styles from './ContactSection.module.css';

export interface ContactSectionProps {
  readonly profile: Profile;
}

type CopyState = 'idle' | 'copied' | 'fallback';

const COPY_RESET_MS = 2500;

export function ContactSection({ profile }: ContactSectionProps) {
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const scheduleReset = () => {
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }
    resetTimerRef.current = window.setTimeout(() => {
      setCopyState('idle');
      resetTimerRef.current = null;
    }, COPY_RESET_MS);
  };

  const handleCopyEmail = async () => {
    const email = profile.contact.email;
    if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
      setCopyState('fallback');
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      setCopyState('copied');
      scheduleReset();
    } catch {
      setCopyState('fallback');
    }
  };

  const { email, github, linkedin } = profile.contact;
  const hasVerifiedLinkedin = linkedin.href !== UNVERIFIED_CV_MARKER;

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.grid}>
        <h2 id="contact-heading">Contact</h2>

        <div className={styles.content}>
          <p className={styles.lead}>
            Best reached directly by email for Senior &amp; Staff Frontend engineering roles,
            architecture advisory, or technical conversations.
          </p>

          <div className={styles.primaryActions}>
            <button
              type="button"
              className={
                copyState === 'copied'
                  ? `${styles.copyButton} ${styles.copyButtonCopied}`
                  : styles.copyButton
              }
              onClick={handleCopyEmail}
            >
              {copyState === 'copied' ? 'Copied' : 'Copy Email'}
            </button>

            <a href={`mailto:${email}`} className={styles.mailtoLink}>
              {email}
            </a>
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
                  <span aria-hidden="true">↗</span>
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
                <span aria-hidden="true">↗</span>
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
      </div>
    </section>
  );
}
