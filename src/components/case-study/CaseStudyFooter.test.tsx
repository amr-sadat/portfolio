import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createProfile, siliconExpertCaseStudy } from '../../content';
import { CaseStudyFooter } from './CaseStudyFooter';

describe('CaseStudyFooter', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the sibling Case Study cross-link and contact actions (Copy Email, mailto, LinkedIn)', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    const profile = createProfile();
    render(
      <MemoryRouter>
        <CaseStudyFooter sibling={siliconExpertCaseStudy.sibling} profile={profile} />
      </MemoryRouter>,
    );

    const siblingLink = screen.getByRole('link', { name: /idemia egypt/i });
    expect(siblingLink).toHaveAttribute('href', '/experience/idemia');

    const mailtoLink = screen.getByRole('link', { name: profile.contact.email });
    expect(mailtoLink).toHaveAttribute('href', `mailto:${profile.contact.email}`);

    expect(screen.getByText('LinkedIn')).toBeInTheDocument();

    const copyButton = screen.getByRole('button', { name: /copy email/i });
    await act(async () => {
      fireEvent.click(copyButton);
    });

    expect(writeText).toHaveBeenCalledWith(profile.contact.email);
    expect(screen.getByRole('button', { name: /copied/i })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(profile.contact.email);
  });
});
