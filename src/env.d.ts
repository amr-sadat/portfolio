/// <reference types="vite/client" />

declare const __HAS_CV_PDF__: boolean;

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
