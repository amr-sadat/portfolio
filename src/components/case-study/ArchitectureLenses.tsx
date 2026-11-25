import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import {
  ARCHITECTURE_LENS_LABELS,
  ARCHITECTURE_LENSES,
  type ArchitectureLensId,
  type ArchitectureSchematic,
  type SchematicNode,
} from '../../content';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import styles from './ArchitectureLenses.module.css';

export interface ArchitectureLensesProps {
  readonly schematic: ArchitectureSchematic;
}

const PACKET_DURATION_MS = 1400;
const PACKET_GAP_MS = 220;

function getCalloutPosition(
  node: SchematicNode,
  offset?: { readonly dx: number; readonly dy: number },
): { cx: number; cy: number } {
  if (offset) {
    return {
      cx: node.x + node.width + offset.dx,
      cy: node.y + offset.dy,
    };
  }
  if (node.kind === 'foundation') {
    return {
      cx: node.x + node.width - 24,
      cy: node.y + 16,
    };
  }
  return {
    cx: node.x + node.width - 6,
    cy: node.y + 4,
  };
}

export function ArchitectureLenses({ schematic }: ArchitectureLensesProps) {
  const [activeLensId, setActiveLensId] = useState<ArchitectureLensId>('data-flow');
  const prefersReducedMotion = usePrefersReducedMotion();
  const rawId = useId();
  const scopeId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');

  const buttonRefs = useRef<Partial<Record<ArchitectureLensId, HTMLButtonElement | null>>>({});
  const edgePathRefs = useRef<Partial<Record<string, SVGPathElement | null>>>({});
  const packetCircleRefs = useRef<Partial<Record<string, SVGCircleElement | null>>>({});

  const activeLens = schematic.lenses[activeLensId];
  const activeNodeSet = new Set(activeLens.activeNodes);
  const activeEdgeSet = new Set(activeLens.activeEdges);
  const packetEdgeIds = useMemo(
    () =>
      activeLensId === 'data-flow' && !prefersReducedMotion ? (activeLens.packetEdges ?? []) : [],
    [activeLens.packetEdges, activeLensId, prefersReducedMotion],
  );
  const packetsActive = packetEdgeIds.length > 0;

  const nodesById = new Map(schematic.nodes.map((node) => [node.id, node]));

  const defaultArrowId = `arrow-muted-${scopeId}`;
  const activeArrowId = `arrow-active-${scopeId}`;

  useEffect(() => {
    if (!packetsActive) {
      return;
    }

    let rafId = 0;
    const startTime = performance.now();
    const stepCycle = PACKET_DURATION_MS + PACKET_GAP_MS;
    const totalCycle = stepCycle * packetEdgeIds.length;

    const frame = (now: number) => {
      const elapsed = (now - startTime) % totalCycle;

      packetEdgeIds.forEach((edgeId, index) => {
        const circle = packetCircleRefs.current[edgeId];
        const path = edgePathRefs.current[edgeId];
        if (!circle || !path || typeof path.getTotalLength !== 'function') {
          return;
        }

        const local = elapsed - index * stepCycle;
        if (local < 0 || local > PACKET_DURATION_MS) {
          circle.setAttribute('opacity', '0');
          return;
        }

        const progress = local / PACKET_DURATION_MS;
        const length = path.getTotalLength();
        const point = path.getPointAtLength(progress * length);
        circle.setAttribute('cx', point.x.toFixed(1));
        circle.setAttribute('cy', point.y.toFixed(1));

        const fade =
          progress < 0.12 ? progress / 0.12 : progress > 0.88 ? (1 - progress) / 0.12 : 1;
        circle.setAttribute('opacity', fade.toFixed(2));
      });

      rafId = window.requestAnimationFrame(frame);
    };

    rafId = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [packetsActive, packetEdgeIds]);

  const handleLensKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % ARCHITECTURE_LENSES.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + ARCHITECTURE_LENSES.length) % ARCHITECTURE_LENSES.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = ARCHITECTURE_LENSES.length - 1;
    }

    if (nextIndex !== null) {
      const nextLens = ARCHITECTURE_LENSES[nextIndex];
      if (!nextLens) {
        return;
      }
      event.preventDefault();
      setActiveLensId(nextLens);
      buttonRefs.current[nextLens]?.focus();
    }
  };

  return (
    <div className={styles.root} data-active-lens={activeLensId}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={styles.eyebrow}>Architecture Lens</span>
          <p className={styles.title}>{schematic.title}</p>
        </div>

        <div className={styles.lensBar} role="group" aria-label="Architecture Lenses">
          {ARCHITECTURE_LENSES.map((lensId, index) => {
            const isSelected = activeLensId === lensId;
            return (
              <button
                key={lensId}
                ref={(el) => {
                  buttonRefs.current[lensId] = el;
                }}
                type="button"
                aria-pressed={isSelected}
                className={styles.lensButton}
                data-lens={lensId}
                onClick={() => setActiveLensId(lensId)}
                onKeyDown={(event) => handleLensKeyDown(event, index)}
              >
                {ARCHITECTURE_LENS_LABELS[lensId]}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={styles.svgViewport}
        tabIndex={0}
        role="region"
        aria-label={`${schematic.title} diagram stage`}
      >
        <svg
          className={styles.svg}
          viewBox={`0 0 ${schematic.viewBox.width} ${schematic.viewBox.height}`}
          role="img"
          aria-label={`${schematic.title} — ${activeLens.label} lens`}
        >
          <defs>
            <marker
              id={defaultArrowId}
              viewBox="0 0 10 10"
              refX="8.5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8.5 5 L 0 8.5 Z" className={styles.arrowMuted} />
            </marker>
            <marker
              id={activeArrowId}
              viewBox="0 0 10 10"
              refX="8.5"
              refY="5"
              markerWidth="6.5"
              markerHeight="6.5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8.5 5 L 0 8.5 Z" className={styles.arrowActive} />
            </marker>
          </defs>

          <g aria-hidden="true">
            {schematic.zones.map((zone) => (
              <g key={zone.id} className={styles.zone}>
                <rect
                  x={zone.x}
                  y={zone.y}
                  width={zone.width}
                  height={zone.height}
                  rx="12"
                  className={styles.zoneRect}
                />
                <text x={zone.x + 14} y={zone.y + 18} className={styles.zoneLabel}>
                  {zone.label}
                </text>
              </g>
            ))}
          </g>

          <g>
            {schematic.edges.map((edge) => {
              const isActive = activeEdgeSet.has(edge.id);
              return (
                <g
                  key={edge.id}
                  data-edge-id={edge.id}
                  data-state={isActive ? 'active' : 'dimmed'}
                  className={isActive ? styles.edgeActive : styles.edgeDimmed}
                >
                  <path
                    ref={(el) => {
                      edgePathRefs.current[edge.id] = el;
                    }}
                    d={edge.path}
                    fill="none"
                    markerEnd={`url(#${isActive ? activeArrowId : defaultArrowId})`}
                    className={styles.edgePath}
                  />
                  {edge.label && edge.labelX !== undefined && edge.labelY !== undefined ? (
                    <text
                      x={edge.labelX}
                      y={edge.labelY}
                      textAnchor="middle"
                      className={styles.edgeLabel}
                    >
                      {edge.label}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </g>

          <g>
            {schematic.nodes.map((node) => {
              const isActive = activeNodeSet.has(node.id);
              const isFoundation = node.kind === 'foundation';
              const centerX = node.x + node.width / 2;
              const titleY = isFoundation ? node.y + 26 : node.y + 28;
              const sublabelY = isFoundation ? node.y + 44 : node.y + 46;

              return (
                <g
                  key={node.id}
                  data-node-id={node.id}
                  data-state={isActive ? 'active' : 'dimmed'}
                  className={[
                    styles.node,
                    isFoundation ? styles.nodeFoundation : '',
                    isActive ? styles.nodeActive : styles.nodeDimmed,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.width}
                    height={node.height}
                    rx="8"
                    className={styles.nodeRect}
                  />
                  <text x={centerX} y={titleY} textAnchor="middle" className={styles.nodeTitle}>
                    {node.label}
                  </text>
                  <text
                    x={centerX}
                    y={sublabelY}
                    textAnchor="middle"
                    className={styles.nodeSublabel}
                  >
                    {node.sublabel}
                  </text>
                </g>
              );
            })}
          </g>

          <g
            data-packet-layer=""
            data-packets-active={packetsActive ? 'true' : 'false'}
            aria-hidden="true"
          >
            {packetEdgeIds.map((edgeId) => (
              <circle
                key={edgeId}
                ref={(el) => {
                  packetCircleRefs.current[edgeId] = el;
                }}
                data-packet={edgeId}
                r="4.5"
                cx="0"
                cy="0"
                opacity="0"
                className={styles.packet}
              />
            ))}
          </g>

          <g aria-hidden="true">
            {activeLens.callouts.map((callout, index) => {
              const targetNode = nodesById.get(callout.nodeId);
              if (!targetNode) {
                return null;
              }
              const { cx, cy } = getCalloutPosition(targetNode, callout.badgeOffset);

              return (
                <g
                  key={`${activeLensId}-${callout.number}`}
                  data-callout-badge={callout.number}
                  className={styles.calloutBadge}
                  style={{ animationDelay: `${index * 55}ms` }}
                >
                  <circle cx={cx} cy={cy} r="11" className={styles.calloutCircle} />
                  <text x={cx} y={cy + 4} textAnchor="middle" className={styles.calloutNumber}>
                    {callout.number}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <div className={styles.notesPanel} aria-live="polite">
        <p className={styles.lensSummary}>{activeLens.summary}</p>
        <ol className={styles.notesList} aria-label="Architectural notes">
          {activeLens.callouts.map((callout) => (
            <li key={`${activeLensId}-note-${callout.number}`} className={styles.noteItem}>
              <span className={styles.noteBadge} aria-hidden="true">
                {callout.number}
              </span>
              <div className={styles.noteBody}>
                <strong className={styles.noteTitle}>{callout.title}</strong>
                <span className={styles.noteDetail}>{callout.detail}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className={styles.caption}>{schematic.caption}</p>
    </div>
  );
}
