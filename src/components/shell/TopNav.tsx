import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { MobileMenuSheet } from './MobileMenuSheet';
import { NAV_SECTIONS, type NavSectionItem } from './navItems';
import { ThemeToggle } from './ThemeToggle';
import styles from './TopNav.module.css';

const CASE_STUDY_PATHS = new Set(['/experience/siliconexpert', '/experience/idemia']);

export function TopNav() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isCaseStudy = CASE_STUDY_PATHS.has(pathname);

  const [activeSection, setActiveSection] = useState<NavSectionItem['id'] | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isHome || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const elements = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    if (elements.length === 0) {
      return;
    }

    const visibleRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleRatios.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleRatios.delete(entry.target.id);
          }
        }

        let topId: NavSectionItem['id'] | null = null;
        let maxRatio = -1;
        for (const section of NAV_SECTIONS) {
          const ratio = visibleRatios.get(section.id);
          if (ratio !== undefined && ratio > maxRatio) {
            maxRatio = ratio;
            topId = section.id;
          }
        }

        if (topId !== null) {
          setActiveSection(topId);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, [isHome]);

  const handleCloseMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.leftSlot}>
            {isCaseStudy && (
              <Link to="/#experience" className={styles.backLink}>
                ← Experience
              </Link>
            )}
          </div>

          <nav aria-label="Primary navigation" className={styles.desktopNav}>
            <ul className={styles.navList}>
              {NAV_SECTIONS.map((section) => {
                const isActive = isHome && activeSection === section.id;
                return (
                  <li key={section.id}>
                    {isHome ? (
                      <a
                        href={`#${section.id}`}
                        className={styles.navLink}
                        aria-current={isActive ? 'location' : undefined}
                      >
                        {section.label}
                      </a>
                    ) : (
                      <Link to={`/#${section.id}`} className={styles.navLink}>
                        {section.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.actions}>
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              className={styles.menuButton}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation-sheet"
              onClick={() => setMenuOpen(true)}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <MobileMenuSheet
        isOpen={menuOpen}
        onClose={handleCloseMenu}
        isHome={isHome}
        isCaseStudy={isCaseStudy}
        activeSection={activeSection}
      />
    </>
  );
}
