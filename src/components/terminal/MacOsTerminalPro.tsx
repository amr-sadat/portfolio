import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';
import { experienceContent } from '../../content/experience';
import { homeContent } from '../../content/home';
import { profile } from '../../content/profile';
import { projectsContent } from '../../content/projects';
import { useCopyEmail } from '../../hooks/useCopyEmail';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import styles from './MacOsTerminalPro.module.css';

type TerminalStep =
  | { readonly kind: 'cmd'; readonly text: string }
  | { readonly kind: 'neofetch' }
  | { readonly kind: 'banner'; readonly num: string; readonly title: string }
  | { readonly kind: 'summary'; readonly text: string }
  | {
      readonly kind: 'role';
      readonly role: string;
      readonly company: string;
      readonly tenure: string;
      readonly system: string;
      readonly stack: string;
    }
  | { readonly kind: 'bullet'; readonly text: string }
  | { readonly kind: 'kv'; readonly label: string; readonly value: string };

const ASCII_AMR = [
  '   █████╗ ███╗   ███╗██████╗ ',
  '  ██╔══██╗████╗ ████║██╔══██╗',
  '  ███████║██╔████╔██║██████╔╝',
  '  ██╔══██║██║╚██╔╝██║██╔══██╗',
  '  ██║  ██║██║ ╚═╝ ██║██║  ██║',
  '  ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝',
].join('\n');

const SWATCH_COLORS = ['#ff453a', '#ff9f0a', '#ffd60a', '#30d158', '#64d2ff', '#0a84ff'] as const;

const NEOFETCH_META_ENTRIES = [
  { key: 'Name', value: profile.fullName },
  { key: 'Role', value: `${profile.role} (7+ Years)` },
  { key: 'Core', value: 'Angular (2–22) · TypeScript · NgRx Signal Store · RxJS' },
  { key: 'AI', value: 'Claude Code · Devin AI (Windsurf) · OpenCode' },
  { key: 'Host', value: `${profile.location} · ${profile.contact.email}` },
] as const;

const NEOFETCH_META = NEOFETCH_META_ENTRIES.reduce<
  readonly { readonly key: string; readonly value: string; readonly offset: number }[]
>((acc, item) => {
  const prev = acc[acc.length - 1];
  const offset = prev ? prev.offset + prev.value.length : 0;
  return [...acc, { ...item, offset }];
}, []);

function buildTerminalScript(): readonly TerminalStep[] {
  const steps: TerminalStep[] = [
    { kind: 'cmd', text: 'neofetch' },
    { kind: 'neofetch' },
    { kind: 'cmd', text: 'cat 01-summary.md' },
    { kind: 'banner', num: '01', title: 'Professional Summary' },
    { kind: 'summary', text: homeContent.hero.thesis },
    { kind: 'cmd', text: 'ls -la 02-experience/' },
    { kind: 'banner', num: '02', title: 'Production Experience' },
  ];

  for (const role of experienceContent.roles) {
    steps.push({
      kind: 'role',
      role: role.role,
      company: role.company,
      tenure: role.tenure,
      system: role.system,
      stack: role.stack.join(' · '),
    });
    for (const highlight of role.highlights) {
      steps.push({ kind: 'bullet', text: highlight });
    }
  }

  steps.push(
    { kind: 'cmd', text: 'gh repo list amr-sadat' },
    { kind: 'banner', num: '03', title: 'Personal Projects' },
  );

  for (const project of projectsContent.items) {
    const status = project.statusBadge ? `[${project.statusBadge}] ` : '';
    steps.push({
      kind: 'kv',
      label: project.name,
      value: `${status}${project.summary}`,
    });
  }

  steps.push(
    { kind: 'cmd', text: 'cat 04-skills-and-education.txt' },
    { kind: 'banner', num: '04', title: 'Skills & Education' },
    {
      kind: 'kv',
      label: 'Core Stack',
      value: 'JavaScript · TypeScript · Angular (2–22) · NgRx Signal Store · RxJS · SSR · Jasmine',
    },
    {
      kind: 'kv',
      label: 'AI Tooling',
      value: 'Claude Code · Devin AI (Windsurf) · OpenCode · Clean Architecture · Code Reviews',
    },
    {
      kind: 'kv',
      label: 'Education',
      value: 'Bachelor of Engineering, Communications — Mansoura University (Sep 2013 – Jul 2017)',
    },
    {
      kind: 'kv',
      label: 'Languages',
      value: 'Arabic (Native) · English (Intermediate)',
    },
    { kind: 'cmd', text: 'echo $CONTACT' },
    { kind: 'banner', num: '05', title: 'Contact' },
    {
      kind: 'kv',
      label: 'Channels',
      value: `${profile.contact.email} · LinkedIn · github.com/amr-sadat · ${profile.location}`,
    },
  );

  return steps;
}

function getStepCharCount(step: TerminalStep): number {
  switch (step.kind) {
    case 'cmd':
    case 'summary':
    case 'bullet':
      return step.text.length;
    case 'banner':
      return step.title.length;
    case 'role':
      return (
        `${step.role} — ${step.company}`.length +
        `[${step.tenure}]`.length +
        `${step.system} | ${step.stack}`.length
      );
    case 'kv':
      return step.value.length;
    case 'neofetch':
      return NEOFETCH_META.reduce((acc, item) => acc + item.value.length, 0);
  }
}

export function MacOsTerminalPro() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { copyState, copyEmail } = useCopyEmail(profile.contact.email);
  const { entries, totalChars } = useMemo(() => {
    const steps = buildTerminalScript();
    const list: {
      readonly step: TerminalStep;
      readonly offset: number;
      readonly length: number;
    }[] = [];
    let cursor = 0;
    for (const step of steps) {
      const length = getStepCharCount(step);
      list.push({ step, offset: cursor, length });
      cursor += length;
    }
    return { entries: list, totalChars: cursor };
  }, []);

  const [typedChars, setTypedChars] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  const effectiveTypedChars = prefersReducedMotion ? totalChars : typedChars;
  const isComplete = effectiveTypedChars >= totalChars;

  useEffect(() => {
    if (isComplete || prefersReducedMotion) {
      return;
    }

    const charsPerTick = 4;
    const stepMs = 14;

    timerRef.current = window.setInterval(() => {
      setTypedChars((prev) => {
        const next = prev + charsPerTick;
        return next >= totalChars ? totalChars : next;
      });
    }, stepMs);

    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isComplete, totalChars, prefersReducedMotion]);

  const handleShowAll = () => {
    setTypedChars(totalChars);
  };

  return (
    <main id="main-content" className={styles.wrapper}>
      <section aria-label="macOS Terminal Pro portfolio view" className={styles.terminalWindow}>
        <div className={styles.titleBar}>
          <div className={styles.trafficLights} aria-hidden="true">
            <span className={styles.dotRed} />
            <span className={styles.dotYellow} />
            <span className={styles.dotGreen} />
          </div>

          <div className={styles.windowTitle}>@amr-sadat: ~ — Terminal Pro (OS)</div>

          <div className={styles.controls}>
            <button
              type="button"
              className={`${styles.controlBtn} ${styles.controlBtnPrimary}`}
              onClick={handleShowAll}
            >
              ⚡ Show All
            </button>
          </div>
        </div>

        <div className={styles.body}>
          {entries.map(({ step, offset, length: stepLen }, index) => {
            const remaining = effectiveTypedChars - offset;
            if (remaining <= 0 && index > 0) {
              return null;
            }

            const shown = Math.min(stepLen, Math.max(0, remaining));
            const isActiveLine = !isComplete && remaining > 0 && remaining <= stepLen;

            if (step.kind === 'cmd') {
              return (
                <div key={`cmd-${index}`} className={styles.cmdLine}>
                  <span className={styles.promptUser}>@amr-sadat</span>{' '}
                  <span className={styles.promptPath}>~ % </span>
                  <span className={styles.promptCmd}>{step.text.slice(0, shown)}</span>
                  {isActiveLine && <span className={styles.cursor} aria-hidden="true" />}
                </div>
              );
            }

            if (step.kind === 'neofetch') {
              return (
                <div key={`nf-${index}`} className={styles.neofetchCard}>
                  <pre className={styles.asciiArt} aria-hidden="true">
                    {ASCII_AMR}
                  </pre>
                  <div className={styles.metaList}>
                    <h1 className={styles.metaTitle}>{profile.fullName}</h1>
                    {NEOFETCH_META.map((item) => {
                      const len = item.value.length;
                      const metaRem = shown - item.offset;
                      const sliceLen = Math.min(len, Math.max(0, metaRem));
                      const activeMeta = isActiveLine && metaRem > 0 && metaRem <= len;
                      if (sliceLen === 0 && !activeMeta) {
                        return null;
                      }
                      return (
                        <div key={item.key}>
                          <span className={styles.metaKey}>{item.key}: </span>
                          <span className={styles.metaVal}>{item.value.slice(0, sliceLen)}</span>
                          {activeMeta && <span className={styles.cursor} aria-hidden="true" />}
                        </div>
                      );
                    })}
                    {shown >= stepLen && (
                      <div className={styles.swatches} aria-hidden="true">
                        {SWATCH_COLORS.map((hex) => (
                          <span
                            key={hex}
                            className={styles.swatch}
                            style={{ backgroundColor: hex }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            if (step.kind === 'banner') {
              return (
                <div key={`banner-${step.num}`} className={styles.sectionBanner}>
                  <span className={styles.sectionNum}>{step.num}</span>
                  <h2 className={styles.sectionTitle}>
                    {step.title.slice(0, shown)}
                    {isActiveLine && <span className={styles.cursor} aria-hidden="true" />}
                  </h2>
                </div>
              );
            }

            if (step.kind === 'summary') {
              return (
                <p key={`summary-${index}`} className={styles.summaryBox}>
                  {step.text.slice(0, shown)}
                  {isActiveLine && <span className={styles.cursor} aria-hidden="true" />}
                </p>
              );
            }

            if (step.kind === 'role') {
              const headText = `${step.role} — ${step.company}`;
              const periodText = `[${step.tenure}]`;
              const subText = `${step.system} | ${step.stack}`;

              const headShown = Math.min(headText.length, shown);
              const afterHead = Math.max(0, shown - headText.length);
              const periodShown = Math.min(periodText.length, afterHead);
              const afterPeriod = Math.max(0, afterHead - periodText.length);
              const subShown = Math.min(subText.length, afterPeriod);

              return (
                <div key={`role-${index}`} className={styles.roleBlock}>
                  <div className={styles.roleHeader}>
                    <span className={styles.roleName}>
                      {headText.slice(0, headShown)}
                      {isActiveLine && shown <= headText.length && (
                        <span className={styles.cursor} aria-hidden="true" />
                      )}
                    </span>
                    {periodShown > 0 && (
                      <span className={styles.rolePeriod}>
                        {periodText.slice(0, periodShown)}
                        {isActiveLine &&
                          shown > headText.length &&
                          shown <= headText.length + periodText.length && (
                            <span className={styles.cursor} aria-hidden="true" />
                          )}
                      </span>
                    )}
                  </div>
                  {subShown > 0 && (
                    <div className={styles.roleSub}>
                      {subText.slice(0, subShown)}
                      {isActiveLine && shown > headText.length + periodText.length && (
                        <span className={styles.cursor} aria-hidden="true" />
                      )}
                    </div>
                  )}
                </div>
              );
            }

            if (step.kind === 'bullet') {
              return (
                <div key={`bullet-${index}`} className={styles.bulletLine}>
                  <span className={styles.bulletMark} aria-hidden="true">
                    ▸{' '}
                  </span>
                  {step.text.slice(0, shown)}
                  {isActiveLine && <span className={styles.cursor} aria-hidden="true" />}
                </div>
              );
            }

            return (
              <div key={`kv-${index}`} className={styles.kvLine}>
                <span className={styles.kvKey}>{step.label}: </span>
                <span className={styles.kvVal}>{step.value.slice(0, shown)}</span>
                {isActiveLine && <span className={styles.cursor} aria-hidden="true" />}
              </div>
            );
          })}

          {isComplete && (
            <>
              <div className={styles.cmdLine}>
                <span className={styles.promptUser}>@amr-sadat</span>{' '}
                <span className={styles.promptPath}>~ % </span>
                <span className={styles.cursor} aria-hidden="true" />
              </div>

              <div className={styles.actionRow}>
                <button type="button" className={styles.actionBtn} onClick={() => void copyEmail()}>
                  {copyState === 'copied' ? '✓ Email Copied' : `Copy ${profile.contact.email}`}
                </button>
                <a
                  href={profile.contact.github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionLink}
                >
                  GitHub ↗
                </a>
                <a
                  href={profile.contact.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionLink}
                >
                  LinkedIn ↗
                </a>
                <Link to="/" className={styles.actionLink}>
                  ← Classic View
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
