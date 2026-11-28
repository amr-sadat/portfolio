export interface NavSectionItem {
  readonly id: 'experience' | 'projects' | 'contact';
  readonly label: string;
}

export const NAV_SECTIONS: readonly NavSectionItem[] = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const;
