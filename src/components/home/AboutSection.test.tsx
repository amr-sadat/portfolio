import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { homeContent } from '../../content';
import { AboutSection } from './AboutSection';

describe('AboutSection', () => {
  it('renders the #about landmark with About h2 heading and no eyebrow above it', () => {
    const { container } = render(<AboutSection about={homeContent.about} />);

    const section = container.querySelector('section#about');
    expect(section).not.toBeNull();

    const heading = screen.getByRole('heading', { level: 2, name: 'About' });
    expect(heading).toBeInTheDocument();
    expect(heading.previousElementSibling).toBeNull();
  });

  it('renders both architectural beats with canonical engineering positioning', () => {
    render(<AboutSection about={homeContent.about} />);

    const beatHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(beatHeadings).toHaveLength(2);

    expect(screen.getByText(/IDEMIA Egypt/i)).toBeInTheDocument();
    expect(screen.getByText(/SiliconExpert/i)).toBeInTheDocument();
    expect(screen.getByText(/Signals and RxJS/i)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { level: 3, name: /AI-Augmented Engineering/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Claude Code, Devin AI, and OpenCode/i)).toBeInTheDocument();
  });
});
