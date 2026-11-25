import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { NAV_SECTIONS, type NavSectionItem } from './navItems';
import styles from './MobileMenuSheet.module.css';

interface MobileMenuSheetProps {
  isOpen: boolean;
  onClose: () => void;
  isHome: boolean;
  isCaseStudy: boolean;
  activeSection: NavSectionItem['id'] | null;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenuSheet({
  isOpen,
  onClose,
  isHome,
  isCaseStudy,
  activeSection,
}: MobileMenuSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const container = sheetRef.current;
      if (!container) {
        return;
      }

      const focusables = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusables.length === 0) {
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) {
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === first || !container.contains(document.activeElement)) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last || !container.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={sheetRef}
      id="mobile-navigation-sheet"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className={styles.sheet}
    >
      <div className={styles.topBar}>
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          Close
        </button>
      </div>

      <nav aria-label="Mobile navigation" className={styles.nav}>
        {isCaseStudy && (
          <Link to="/#experience" className={styles.backLink} onClick={onClose}>
            ← Experience
          </Link>
        )}

        <ul className={styles.list}>
          {NAV_SECTIONS.map((section) => {
            const isActive = isHome && activeSection === section.id;
            return (
              <li key={section.id}>
                {isHome ? (
                  <a
                    href={`#${section.id}`}
                    className={styles.link}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={onClose}
                  >
                    {section.label}
                  </a>
                ) : (
                  <Link to={`/#${section.id}`} className={styles.link} onClick={onClose}>
                    {section.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
