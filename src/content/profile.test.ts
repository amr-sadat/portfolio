import { describe, expect, it } from 'vitest';
import { homeContent } from './home';
import {
  createProfile,
  profile,
  UNVERIFIED_CV_MARKER,
  type ContactChannels,
  type Profile,
} from './profile';

describe('typed content contract', () => {
  it('exposes canonical public identity, tokenized contact channels, and unverified CV marker', () => {
    expect(profile.fullName).toBe('Amr Sadat Abou Hegab');
    expect(profile.role).toBe('Senior Frontend Engineer');
    expect(profile.location).toBe('Egypt · UTC+2');
    expect(profile.cvPath).toBe('/cv.pdf');
    expect(UNVERIFIED_CV_MARKER).toBe('[Verify from CV at copy pass]');

    const contact: ContactChannels = profile.contact;
    expect(contact.email).toBe('amrsadat2017@gmail.com');
    expect(contact.github.href).toBe('https://github.com/amr-sadat');
    expect(contact.linkedin.href).toBe('https://www.linkedin.com/in/amrsadat/');
    expect(Object.keys(contact).sort()).toEqual(['email', 'github', 'linkedin']);
  });

  it('defaults hasCvPdf from build-time detection (false when public/cv.pdf is absent) and allows override', () => {
    expect(profile.hasCvPdf).toBe(false);

    const withCv: Profile = createProfile({ hasCvPdf: true });
    const withoutCv: Profile = createProfile({ hasCvPdf: false });

    expect(withCv.hasCvPdf).toBe(true);
    expect(withoutCv.hasCvPdf).toBe(false);
  });

  it('provides Hero copy with architecture and AI-Augmented Engineering summary', () => {
    expect(homeContent.hero.name).toBe('Amr Sadat Abou Hegab');
    expect(homeContent.hero.role).toBe('Senior Frontend Engineer');
    expect(homeContent.hero.thesis).toMatch(/Clean Architecture/i);
    expect(homeContent.hero.thesis).toMatch(/Claude Code/i);
    expect(homeContent.hero.primaryCta).toEqual({
      label: 'View Experience',
      href: '#experience',
    });
    expect(homeContent.hero.cvCta).toEqual({
      label: 'Download CV',
      href: '/cv.pdf',
    });
  });
});
