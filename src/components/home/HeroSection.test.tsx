import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { homeContent } from '../../content';
import { HeroSection } from './HeroSection';

describe('HeroSection', () => {
  it('renders the centered name centerpiece as h1 with no logo or eyebrow above it', () => {
    const { container } = render(<HeroSection hero={homeContent.hero} hasCvPdf={false} />);

    const heading = screen.getByRole('heading', { level: 1, name: 'Amr Sadat Abou Hegab' });
    expect(heading).toBeInTheDocument();
    expect(container.querySelector('img')).toBeNull();
    expect(heading.previousElementSibling).toBeNull();
  });

  it('renders role anchor, systems thesis, capability strip, and availability status', () => {
    render(<HeroSection hero={homeContent.hero} hasCvPdf={false} />);

    expect(screen.getByText('Senior Frontend Engineer')).toBeInTheDocument();
    expect(screen.getByText(/IDEMIA/i)).toBeInTheDocument();
    expect(screen.getByText(/SiliconExpert/i)).toBeInTheDocument();
    expect(
      screen.getByText('7+ years · TypeScript, Angular (2–22), React · AI-Augmented Engineering'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Open to select Senior & Staff Frontend roles · Egypt or Remote (UTC+2)'),
    ).toBeInTheDocument();
  });

  it('renders View Experience linking to #experience and omits Download CV when hasCvPdf is false', () => {
    render(<HeroSection hero={homeContent.hero} hasCvPdf={false} />);

    const primaryCta = screen.getByRole('link', { name: 'View Experience' });
    expect(primaryCta).toHaveAttribute('href', '#experience');
    expect(screen.queryByRole('link', { name: 'Download CV' })).not.toBeInTheDocument();
  });

  it('renders Download CV linking to /cv.pdf when hasCvPdf is true', () => {
    render(<HeroSection hero={homeContent.hero} hasCvPdf={true} />);

    const cvCta = screen.getByRole('link', { name: 'Download CV' });
    expect(cvCta).toHaveAttribute('href', '/cv.pdf');
  });
});
