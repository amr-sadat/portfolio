import type { ReactNode } from 'react';
import { Link } from 'react-router';
import {
  getCaseStudyTocItems,
  type CaseStudy,
  type DiagramSlotConfig,
  type Profile,
} from '../../content';
import { CaseStudyFooter } from './CaseStudyFooter';
import { CaseStudyToc } from './CaseStudyToc';
import { ContextStrip } from './ContextStrip';
import styles from './CaseStudyLayout.module.css';

export interface CaseStudyLayoutProps {
  readonly caseStudy: CaseStudy;
  readonly profile: Profile;
  readonly renderDiagram?: (diagram: DiagramSlotConfig) => ReactNode;
}

export function CaseStudyLayout({ caseStudy, profile, renderDiagram }: CaseStudyLayoutProps) {
  const { sections } = caseStudy;
  const tocItems = getCaseStudyTocItems(caseStudy);

  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.container}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link to="/#experience" className={styles.backLink}>
            ← Experience
          </Link>
        </nav>

        <header className={styles.header}>
          <p className={styles.eyebrow}>{caseStudy.company}</p>
          <h1 className={styles.title}>{caseStudy.title}</h1>
          <p className={styles.subtitle}>{caseStudy.subtitle}</p>
          <p className={styles.ndaNotice}>{caseStudy.ndaNotice}</p>
        </header>

        <div className={styles.contextStripWrap}>
          <ContextStrip data={caseStudy.contextStrip} />
        </div>

        <div className={styles.bodyGrid}>
          <div className={styles.tocColumn}>
            <CaseStudyToc items={tocItems} />
          </div>

          <article className={styles.article}>
            <section
              id={sections.context.id}
              aria-labelledby={`${sections.context.id}-heading`}
              className={styles.section}
            >
              <h2 id={`${sections.context.id}-heading`} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>{sections.context.number}</span>
                <span>{sections.context.title}</span>
              </h2>
              <div className={styles.proseGroup}>
                {sections.context.paragraphs.map((paragraph) => (
                  <p key={paragraph} className={styles.prose}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <section
              id={sections.problem.id}
              aria-labelledby={`${sections.problem.id}-heading`}
              className={styles.section}
            >
              <h2 id={`${sections.problem.id}-heading`} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>{sections.problem.number}</span>
                <span>{sections.problem.title}</span>
              </h2>
              <div className={styles.proseGroup}>
                {sections.problem.paragraphs.map((paragraph) => (
                  <p key={paragraph} className={styles.prose}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <ul className={styles.bulletList}>
                {sections.problem.constraints.map((constraint) => (
                  <li key={constraint} className={styles.bulletItem}>
                    {constraint}
                  </li>
                ))}
              </ul>
            </section>

            <section
              id={sections.architecture.id}
              aria-labelledby={`${sections.architecture.id}-heading`}
              className={styles.section}
            >
              <h2 id={`${sections.architecture.id}-heading`} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>{sections.architecture.number}</span>
                <span>{sections.architecture.title}</span>
              </h2>
              <p className={styles.prose}>{sections.architecture.intro}</p>

              <figure
                className={`surface-stage ${styles.diagramStage}`}
                data-diagram-slot={caseStudy.diagram.id}
                aria-label={caseStudy.diagram.title}
              >
                {renderDiagram ? (
                  renderDiagram(caseStudy.diagram)
                ) : (
                  <>
                    <div className={styles.diagramPlaceholder}>
                      <div className={styles.diagramHeader}>
                        <span className={styles.diagramBadge}>Architecture Lens Stage</span>
                        <p className={styles.diagramTitle}>{caseStudy.diagram.title}</p>
                      </div>
                      <ul className={styles.lensList} aria-label="Planned Architecture Lenses">
                        {caseStudy.diagram.lenses.map((lens) => (
                          <li key={lens} className={styles.lensPill}>
                            {lens}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <figcaption className={styles.diagramCaption}>
                      {caseStudy.diagram.caption}
                    </figcaption>
                  </>
                )}
              </figure>

              <div className={styles.tradeoffList}>
                {sections.architecture.tradeoffs.map((item) => (
                  <div key={item.id} className={styles.tradeoffCard}>
                    <h3 className={styles.tradeoffTitle}>{item.title}</h3>
                    <dl className={styles.tradeoffMeta}>
                      <div className={styles.tradeoffRow}>
                        <dt className={styles.tradeoffLabel}>Decision</dt>
                        <dd className={styles.tradeoffBody}>{item.decision}</dd>
                      </div>
                      <div className={styles.tradeoffRow}>
                        <dt className={styles.tradeoffLabel}>Trade-off</dt>
                        <dd className={styles.tradeoffBody}>{item.tradeoff}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </section>

            <section
              id={sections.craft.id}
              aria-labelledby={`${sections.craft.id}-heading`}
              className={styles.section}
            >
              <h2 id={`${sections.craft.id}-heading`} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>{sections.craft.number}</span>
                <span>{sections.craft.title}</span>
              </h2>
              <div className={styles.proseGroup}>
                {sections.craft.paragraphs.map((paragraph) => (
                  <p key={paragraph} className={styles.prose}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <ul className={styles.bulletList}>
                {sections.craft.practices.map((practice) => (
                  <li key={practice} className={styles.bulletItem}>
                    {practice}
                  </li>
                ))}
              </ul>
            </section>

            <section
              id={sections.outcomes.id}
              aria-labelledby={`${sections.outcomes.id}-heading`}
              className={styles.section}
            >
              <h2 id={`${sections.outcomes.id}-heading`} className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>{sections.outcomes.number}</span>
                <span>{sections.outcomes.title}</span>
              </h2>
              <ul className={styles.bulletList}>
                {sections.outcomes.outcomes.map((outcome) => (
                  <li key={outcome} className={styles.bulletItem}>
                    {outcome}
                  </li>
                ))}
              </ul>
              <div className={styles.retrospectiveBlock}>
                <h3 className={styles.retrospectiveHeading}>Retrospective</h3>
                <p className={styles.prose}>{sections.outcomes.retrospective}</p>
              </div>
            </section>
          </article>
        </div>

        <CaseStudyFooter sibling={caseStudy.sibling} profile={profile} />
      </div>
    </main>
  );
}
