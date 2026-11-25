import { useId, useMemo, useState } from 'react';
import type { CaseStudySectionId, CaseStudyTocItem } from '../../content';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import styles from './CaseStudyToc.module.css';

export interface CaseStudyTocProps {
  readonly items: readonly CaseStudyTocItem[];
}

export function CaseStudyToc({ items }: CaseStudyTocProps) {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const { activeId, setActiveId } = useScrollSpy<CaseStudySectionId>({
    ids,
    initialId: items[0]?.id ?? null,
  });
  const [isOpen, setIsOpen] = useState(false);
  const listId = useId();

  const handleSelectSection = (id: CaseStudySectionId) => {
    setActiveId(id);
    setIsOpen(false);
  };

  return (
    <nav aria-label="On this page" className={styles.toc}>
      <p className={styles.desktopHeading} aria-hidden="true">
        On this page
      </p>

      <button
        type="button"
        className={styles.mobileToggle}
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>On this page</span>
        <span
          aria-hidden="true"
          className={isOpen ? `${styles.chevron} ${styles.chevronOpen}` : styles.chevron}
        >
          ▾
        </span>
      </button>

      <ol id={listId} className={isOpen ? `${styles.list} ${styles.listOpen}` : styles.list}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className={styles.item}>
              <a
                href={`#${item.id}`}
                className={isActive ? `${styles.link} ${styles.linkActive}` : styles.link}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => handleSelectSection(item.id)}
              >
                <span className={styles.number}>{item.number}</span>
                <span>{item.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
