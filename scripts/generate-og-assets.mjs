import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const fontsDir = resolve(rootDir, 'public', 'fonts');
const ogDir = resolve(rootDir, 'public', 'og');

function loadFontDataUri(filename) {
  const bytes = readFileSync(resolve(fontsDir, filename));
  return `data:font/woff2;base64,${bytes.toString('base64')}`;
}

const instrumentSansUri = loadFontDataUri('instrument-sans-latin.woff2');
const jetBrainsMonoUri = loadFontDataUri('jetbrains-mono-latin.woff2');

const CARDS = [
  {
    filename: 'home.png',
    kicker: 'PORTFOLIO · SYSTEMS-FIRST FRONTEND ARCHITECTURE',
    title: 'Amr Sadat Abou Hegab',
    subtitle: 'Senior Frontend Engineer',
    description:
      'National-scale border control & e-Visa systems at IDEMIA Egypt and global electronics supply-chain workflows at SiliconExpert.',
    footerLeft: '7+ YEARS · ANGULAR (2–22) · REACT · TYPESCRIPT',
    footerRight: 'EGYPT · UTC+2 · REMOTE',
    variant: 'home',
  },
  {
    filename: 'siliconexpert.png',
    kicker: 'ARCHITECTURAL CASE STUDY · 01',
    title: 'SiliconExpert (P5 Platform)',
    subtitle: 'Architectural Case Study',
    description:
      'Deterministic Signals & NgRx Signal Store state, Clean Architecture boundaries, and sustained high-density render performance.',
    footerLeft: 'AMR SADAT ABOU HEGAB · SENIOR FRONTEND ENGINEER',
    footerRight: 'ARCHITECTURE-PUBLIC · INTERNALS-REDACTED',
    variant: 'case-study',
  },
  {
    filename: 'idemia.png',
    kicker: 'ARCHITECTURAL CASE STUDY · 02',
    title: 'IDEMIA Egypt',
    subtitle: 'Architectural Case Study',
    description:
      'Zero-ambiguity operator & citizen web architecture for national-scale border control, e-Visa, and immigration platforms.',
    footerLeft: 'AMR SADAT ABOU HEGAB · SENIOR FRONTEND ENGINEER',
    footerRight: 'ARCHITECTURE-PUBLIC · INTERNALS-REDACTED',
    variant: 'case-study',
  },
];

function renderCardHtml(card) {
  const schematicSvg =
    card.variant === 'case-study'
      ? `
      <svg class="schematic" viewBox="0 0 260 220" width="260" height="220" aria-hidden="true">
        <rect x="8" y="12" width="244" height="52" rx="10" fill="#f5f6f8" stroke="#d1d5db" stroke-width="1.5" />
        <rect x="24" y="28" width="110" height="8" rx="4" fill="#0f1012" fill-opacity="0.82" />
        <rect x="24" y="44" width="160" height="6" rx="3" fill="#525760" fill-opacity="0.45" />
        <circle cx="226" cy="38" r="6" fill="#c8461b" />

        <path d="M 130 64 L 130 88" stroke="#c8461b" stroke-width="2" stroke-dasharray="4 4" />

        <rect x="8" y="88" width="112" height="52" rx="10" fill="#fdf0eb" stroke="#c8461b" stroke-opacity="0.45" stroke-width="1.5" />
        <rect x="22" y="104" width="68" height="7" rx="3.5" fill="#a83712" />
        <rect x="22" y="119" width="82" height="5" rx="2.5" fill="#a83712" fill-opacity="0.45" />

        <rect x="140" y="88" width="112" height="52" rx="10" fill="#ffffff" stroke="#d1d5db" stroke-width="1.5" />
        <rect x="154" y="104" width="68" height="7" rx="3.5" fill="#0f1012" fill-opacity="0.82" />
        <rect x="154" y="119" width="82" height="5" rx="2.5" fill="#525760" fill-opacity="0.45" />

        <path d="M 64 140 L 64 164 L 196 164 L 196 140" fill="none" stroke="#c8461b" stroke-width="2" />

        <rect x="8" y="164" width="244" height="44" rx="10" fill="#f5f6f8" stroke="#d1d5db" stroke-width="1.5" />
        <rect x="24" y="182" width="144" height="7" rx="3.5" fill="#0f1012" fill-opacity="0.72" />
        <rect x="190" y="179" width="44" height="13" rx="6" fill="#c8461b" fill-opacity="0.16" />
      </svg>`
      : '';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    @font-face {
      font-family: 'Instrument Sans';
      font-style: normal;
      font-weight: 400 700;
      src: url('${instrumentSansUri}') format('woff2');
    }
    @font-face {
      font-family: 'JetBrains Mono';
      font-style: normal;
      font-weight: 400 700;
      src: url('${jetBrainsMonoUri}') format('woff2');
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      font-family: 'Instrument Sans', system-ui, sans-serif;
      background: linear-gradient(180deg, #f5f6f8 0%, #eceef2 100%);
      color: #0f1012;
      -webkit-font-smoothing: antialiased;
    }
    .canvas {
      width: 1200px;
      height: 630px;
      padding: 40px;
      display: flex;
    }
    .card {
      position: relative;
      flex: 1;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 24px;
      box-shadow:
        0 1px 2px rgba(15, 16, 18, 0.04),
        0 12px 32px -6px rgba(15, 16, 18, 0.07);
      padding: 56px 64px 48px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }
    .accent-bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: #c8461b;
    }
    .kicker {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      align-self: flex-start;
      padding: 8px 16px;
      border-radius: 8px;
      background: #fdf0eb;
      color: #a83712;
      font-family: 'JetBrains Mono', monospace;
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 0.06em;
    }
    .kicker-dot {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: #c8461b;
    }
    .body-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 48px;
    }
    .copy {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .title {
      font-size: ${card.variant === 'home' ? '64px' : '48px'};
      font-weight: 700;
      line-height: 1.08;
      letter-spacing: -0.03em;
      color: #0f1012;
    }
    .subtitle {
      font-size: 30px;
      font-weight: 600;
      letter-spacing: -0.015em;
      color: #b83d14;
    }
    .description {
      font-size: 23px;
      font-weight: 400;
      line-height: 1.48;
      color: #525760;
      max-width: ${card.variant === 'home' ? '880px' : '640px'};
    }
    .schematic {
      flex-shrink: 0;
    }
    .footer {
      padding-top: 24px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.04em;
      color: #525760;
    }
    .footer-right {
      color: #0f1012;
    }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="card">
      <div class="accent-bar"></div>
      <div class="kicker"><span class="kicker-dot"></span>${card.kicker}</div>
      <div class="body-row">
        <div class="copy">
          <h1 class="title">${card.title}</h1>
          <div class="subtitle">${card.subtitle}</div>
          <p class="description">${card.description}</p>
        </div>
        ${schematicSvg}
      </div>
      <div class="footer">
        <span>${card.footerLeft}</span>
        <span class="footer-right">${card.footerRight}</span>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function renderAppleTouchIconHtml() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 180px;
      height: 180px;
      overflow: hidden;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>
</head>
<body>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
    <rect x="0" y="0" width="180" height="180" fill="#ffffff" />
    <rect x="18" y="18" width="144" height="144" rx="28" fill="#f5f6f8" stroke="#e5e7eb" stroke-width="3" />
    <rect x="40" y="48" width="100" height="16" rx="8" fill="#c8461b" />
    <rect x="40" y="82" width="64" height="13" rx="6.5" fill="#0f1012" />
    <rect x="114" y="82" width="26" height="13" rx="6.5" fill="#d1d5db" />
    <rect x="40" y="114" width="38" height="13" rx="6.5" fill="#525760" />
    <rect x="88" y="114" width="52" height="13" rx="6.5" fill="#c8461b" fill-opacity="0.32" />
  </svg>
</body>
</html>`;
}

async function main() {
  mkdirSync(ogDir, { recursive: true });
  const browser = await chromium.launch();

  try {
    const context = await browser.newContext({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    for (const card of CARDS) {
      await page.setContent(renderCardHtml(card), { waitUntil: 'load' });
      await page.evaluate(() => globalThis.document.fonts.ready);
      const outputPath = resolve(ogDir, card.filename);
      await page.screenshot({ path: outputPath, type: 'png' });
      console.log(`Generated ${outputPath}`);
    }

    await page.setViewportSize({ width: 180, height: 180 });
    await page.setContent(renderAppleTouchIconHtml(), { waitUntil: 'load' });
    const touchIconPath = resolve(rootDir, 'public', 'apple-touch-icon.png');
    await page.screenshot({ path: touchIconPath, type: 'png' });
    console.log(`Generated ${touchIconPath}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
