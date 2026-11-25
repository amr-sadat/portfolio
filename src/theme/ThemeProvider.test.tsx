import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './useTheme';

function ThemeConsumer() {
  const { theme, toggleTheme, setTheme } = useTheme();
  return (
    <div>
      <output data-testid="current-theme">{theme}</output>
      <button type="button" onClick={toggleTheme}>
        Toggle theme
      </button>
      <button type="button" onClick={() => setTheme('daylight')}>
        Set daylight
      </button>
      <button type="button" onClick={() => setTheme('obsidian')}>
        Set obsidian
      </button>
    </div>
  );
}

describe('ThemeProvider & useTheme', () => {
  beforeEach(() => {
    delete document.documentElement.dataset.theme;
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('defaults to daylight on first visit even when prefers-color-scheme: dark is active', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        matches: true,
        media: '(prefers-color-scheme: dark)',
      }),
    );

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('daylight');
    expect(document.documentElement.dataset.theme).toBe('daylight');
  });

  it('restores obsidian when persisted in localStorage', () => {
    localStorage.setItem('theme', 'obsidian');

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('obsidian');
    expect(document.documentElement.dataset.theme).toBe('obsidian');
  });

  it('toggles between daylight and obsidian and persists to localStorage', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(screen.getByTestId('current-theme')).toHaveTextContent('obsidian');
    expect(document.documentElement.dataset.theme).toBe('obsidian');
    expect(localStorage.getItem('theme')).toBe('obsidian');

    fireEvent.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(screen.getByTestId('current-theme')).toHaveTextContent('daylight');
    expect(document.documentElement.dataset.theme).toBe('daylight');
    expect(localStorage.getItem('theme')).toBe('daylight');
  });

  it('does not throw when localStorage read or write fails', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('daylight');
    expect(() =>
      fireEvent.click(screen.getByRole('button', { name: /toggle theme/i })),
    ).not.toThrow();
    expect(screen.getByTestId('current-theme')).toHaveTextContent('obsidian');
    expect(document.documentElement.dataset.theme).toBe('obsidian');
  });
});
