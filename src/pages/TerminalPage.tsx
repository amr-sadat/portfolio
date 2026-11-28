import { useEffect } from 'react';
import { MacOsTerminalPro } from '../components/terminal/MacOsTerminalPro';
import { syncDocumentMetadata } from '../seo/metadata';

export function TerminalPage() {
  useEffect(() => {
    syncDocumentMetadata('/terminal');
    if (typeof window.scrollTo === 'function') {
      window.scrollTo(0, 0);
    }
  }, []);

  return <MacOsTerminalPro />;
}
