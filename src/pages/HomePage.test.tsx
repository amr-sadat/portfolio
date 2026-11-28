import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { HomePage } from './HomePage';

function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
}

describe('HomePage', () => {
  it('renders the full single-scroll narrative in canonical section order', () => {
    const { container } = renderHomePage();

    const sectionIds = Array.from(container.querySelectorAll('main > section[id]')).map(
      (el) => el.id,
    );
    expect(sectionIds).toEqual(['about', 'experience', 'projects', 'contact']);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Amr Sadat Abou Hegab' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Senior Front End Developer II' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Read case study/i })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Ufuq' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy email/i })).toBeInTheDocument();
  });

  it('passes automated PII guard with zero phone numbers, street addresses, or military-status strings in rendered HTML', () => {
    const { container } = renderHomePage();
    const html = container.innerHTML;

    // Egyptian / international phone patterns and WhatsApp references
    expect(html).not.toMatch(/(?:\+?20|0020)[\s-]?1[0125]\d{8}/);
    expect(html).not.toMatch(/\b01[0125]\d[\s-]?\d{3}[\s-]?\d{4}\b/);
    expect(html).not.toMatch(/\bwhatsapp\b/i);
    expect(html).not.toMatch(/href=["']tel:/i);

    // Street address & date-of-birth markers
    expect(html).not.toMatch(
      /\b(?:street|st\.|apt\.|apartment|building|floor|postal code|zip code|nasr city|maadi|heliopolis|giza|cairo,\s*\d)\b/i,
    );
    expect(html).not.toMatch(/\b(?:date of birth|dob|born on)\b/i);

    // Military status strings
    expect(html).not.toMatch(/\b(?:military status|exempted|completed military|conscription)\b/i);
  });
});
