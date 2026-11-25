import { useTheme } from '../../theme/useTheme';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDaylight = theme === 'daylight';
  const nextLabel = isDaylight ? 'Obsidian' : 'Daylight';

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${nextLabel}`}
      aria-pressed={!isDaylight}
    >
      <span className={styles.icon} aria-hidden="true">
        {isDaylight ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>
      <span className={styles.label}>{nextLabel}</span>
    </button>
  );
}
