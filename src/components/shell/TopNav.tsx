import { lazy, Suspense, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { NAV_SECTIONS, type NavSectionItem } from './navItems';
import styles from './TopNav.module.css';

const MobileMenuSheet = lazy(() =>
  import('./MobileMenuSheet').then((m) => ({ default: m.MobileMenuSheet })),
);

const NAV_SECTION_IDS: readonly NavSectionItem['id'][] = NAV_SECTIONS.map((s) => s.id);

export function TopNav() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const { activeId: activeSection } = useScrollSpy<NavSectionItem['id']>({
    ids: NAV_SECTION_IDS,
    enabled: isHome,
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleCloseMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.leftSlot} />

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

      {menuOpen && (
        <Suspense fallback={null}>
          <MobileMenuSheet
            isOpen={menuOpen}
            onClose={handleCloseMenu}
            isHome={isHome}
            activeSection={activeSection}
          />
        </Suspense>
      )}
    </>
  );
}
