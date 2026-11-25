export interface NavSectionItem {
  readonly id: 'about' | 'experience' | 'projects' | 'contact';
  readonly label: string;
}

export const NAV_SECTIONS: readonly NavSectionItem[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const;
