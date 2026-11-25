export const UNVERIFIED_CV_MARKER = '[Verify from CV at copy pass]' as const;

export type UnverifiedCvMarker = typeof UNVERIFIED_CV_MARKER;

export type CvBackedValue<T extends string = string> = T | UnverifiedCvMarker;

export interface ContactLink {
  readonly label: string;
  readonly href: CvBackedValue<string>;
}

export interface ContactChannels {
  readonly email: string;
  readonly linkedin: ContactLink;
  readonly github: ContactLink;
}

export interface Profile {
  readonly fullName: string;
  readonly role: string;
  readonly location: string;
  readonly cvPath: string;
  readonly hasCvPdf: boolean;
  readonly contact: ContactChannels;
}

export interface ProfileOverrides {
  readonly hasCvPdf?: boolean;
}

const DEFAULT_HAS_CV_PDF: boolean = typeof __HAS_CV_PDF__ === 'boolean' ? __HAS_CV_PDF__ : false;

const BASE_PROFILE: Omit<Profile, 'hasCvPdf'> = {
  fullName: 'Amr Sadat Abou Hegab',
  role: 'Senior Frontend Engineer',
  location: 'Egypt · UTC+2',
  cvPath: '/cv.pdf',
  contact: {
    email: 'amrsadat2017@gmail.com',
    linkedin: {
      label: 'LinkedIn',
      href: UNVERIFIED_CV_MARKER,
    },
    github: {
      label: 'GitHub',
      href: 'https://github.com/amr-sadat',
    },
  },
};

export function createProfile(overrides: ProfileOverrides = {}): Profile {
  return {
    ...BASE_PROFILE,
    hasCvPdf: overrides.hasCvPdf ?? DEFAULT_HAS_CV_PDF,
  };
}

export const profile: Profile = createProfile();
