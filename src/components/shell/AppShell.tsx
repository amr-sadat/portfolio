import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { syncDocumentMetadata } from '../../seo/metadata';
import { TopNav } from './TopNav';
import styles from './AppShell.module.css';

export function AppShell() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    syncDocumentMetadata(pathname);
  }, [pathname]);

  useEffect(() => {
    if (hash) {
      const targetId = hash.slice(1);
      const target = document.getElementById(targetId);
      if (target && typeof target.scrollIntoView === 'function') {
        target.scrollIntoView();
        return;
      }
    }
    if (typeof window.scrollTo === 'function') {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className={styles.shell}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      <TopNav />
      <div className={styles.content}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
