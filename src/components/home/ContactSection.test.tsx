import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createProfile, UNVERIFIED_CV_MARKER, type Profile } from '../../content';
import { ContactSection } from './ContactSection';

describe('ContactSection', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders #contact landmark, mailto link, public channels, location, and no contact form', () => {
    const profileWithoutCv = createProfile({ hasCvPdf: false });
    const { container } = render(<ContactSection profile={profileWithoutCv} />);

    expect(container.querySelector('section#contact')).not.toBeNull();
    expect(screen.getByRole('heading', { level: 2, name: 'Contact' })).toBeInTheDocument();
    expect(container.querySelector('form')).toBeNull();

    const mailtoLink = screen.getByRole('link', { name: 'amrsadat2017@gmail.com' });
    expect(mailtoLink).toHaveAttribute('href', 'mailto:amrsadat2017@gmail.com');

    const githubLink = screen.getByRole('link', { name: /GitHub/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/amr-sadat');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    expect(screen.getByText('Egypt · UTC+2')).toBeInTheDocument();
    expect(screen.getByText(/LinkedIn/i)).toBeInTheDocument();
    expect(screen.getByText(UNVERIFIED_CV_MARKER)).toBeInTheDocument();

    expect(screen.queryByRole('link', { name: 'Download CV' })).not.toBeInTheDocument();
  });

  it('copies the tokenized email to clipboard and announces Copied in an aria-live polite region', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    render(<ContactSection profile={createProfile({ hasCvPdf: false })} />);

    const copyButton = screen.getByRole('button', { name: /copy email/i });
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith('amrsadat2017@gmail.com');
    });

    const liveRegion = screen.getByRole('status');
    expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    expect(liveRegion).toHaveTextContent(/copied/i);
  });

  it('handles clipboard unavailability or rejection gracefully with a polite fallback message', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('Clipboard denied'));
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    render(<ContactSection profile={createProfile({ hasCvPdf: false })} />);

    fireEvent.click(screen.getByRole('button', { name: /copy email/i }));

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/amrsadat2017@gmail\.com/i);
    });
  });

  it('renders Download CV when hasCvPdf is true and renders LinkedIn as a link when verified', () => {
    const verifiedProfile: Profile = {
      ...createProfile({ hasCvPdf: true }),
      contact: {
        ...createProfile({ hasCvPdf: true }).contact,
        linkedin: {
          label: 'LinkedIn',
          href: 'https://www.linkedin.com/in/amr-sadat',
        },
      },
    };

    render(<ContactSection profile={verifiedProfile} />);

    const cvLink = screen.getByRole('link', { name: 'Download CV' });
    expect(cvLink).toHaveAttribute('href', '/cv.pdf');

    const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i });
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/amr-sadat');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
