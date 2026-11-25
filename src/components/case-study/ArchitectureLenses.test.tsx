import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { idemiaSchematic, siliconExpertSchematic, type ArchitectureSchematic } from '../../content';
import { ArchitectureLenses } from './ArchitectureLenses';

function mockReducedMotion(matches: boolean) {
  const mql = {
    matches,
    media: '(prefers-reduced-motion: reduce)',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(() => true),
  } as unknown as MediaQueryList;

  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue(mql));
}

afterEach(() => {
  vi.unstubAllGlobals();
});

const SCHEMATICS: readonly { name: string; schematic: ArchitectureSchematic }[] = [
  { name: 'SiliconExpert (P5 Platform)', schematic: siliconExpertSchematic },
  { name: 'IDEMIA Egypt', schematic: idemiaSchematic },
];

describe('ArchitectureLenses', () => {
  for (const { name, schematic } of SCHEMATICS) {
    it(`selects Data flow by default with active highlights, callout badges, and notes for ${name}`, () => {
      mockReducedMotion(false);
      const { container } = render(<ArchitectureLenses schematic={schematic} />);

      const lensBar = screen.getByRole('group', { name: /architecture lenses/i });
      const dataFlowBtn = within(lensBar).getByRole('button', { name: 'Data flow' });
      const structureBtn = within(lensBar).getByRole('button', { name: 'Structure' });
      const resilienceBtn = within(lensBar).getByRole('button', { name: 'Resilience' });
      const performanceBtn = within(lensBar).getByRole('button', { name: 'Performance' });

      expect(dataFlowBtn).toHaveAttribute('aria-pressed', 'true');
      expect(structureBtn).toHaveAttribute('aria-pressed', 'false');
      expect(resilienceBtn).toHaveAttribute('aria-pressed', 'false');
      expect(performanceBtn).toHaveAttribute('aria-pressed', 'false');

      const dataFlowLens = schematic.lenses['data-flow'];

      for (const node of schematic.nodes) {
        const nodeEl = container.querySelector(`[data-node-id="${node.id}"]`);
        expect(nodeEl).not.toBeNull();
        const expectedState = dataFlowLens.activeNodes.includes(node.id) ? 'active' : 'dimmed';
        expect(nodeEl).toHaveAttribute('data-state', expectedState);
      }

      for (const edge of schematic.edges) {
        const edgeEl = container.querySelector(`[data-edge-id="${edge.id}"]`);
        expect(edgeEl).not.toBeNull();
        const expectedState = dataFlowLens.activeEdges.includes(edge.id) ? 'active' : 'dimmed';
        expect(edgeEl).toHaveAttribute('data-state', expectedState);
      }

      const badges = container.querySelectorAll('[data-callout-badge]');
      expect(badges).toHaveLength(dataFlowLens.callouts.length);

      const notesList = screen.getByRole('list', { name: /architectural notes/i });
      for (const callout of dataFlowLens.callouts) {
        expect(within(notesList).getByText(callout.title)).toBeInTheDocument();
        expect(within(notesList).getByText(callout.detail)).toBeInTheDocument();
      }

      const packetLayer = container.querySelector('[data-packet-layer]');
      expect(packetLayer).toHaveAttribute('data-packets-active', 'true');
      expect(container.querySelectorAll('[data-packet]').length).toBe(
        dataFlowLens.packetEdges?.length ?? 0,
      );
    });
  }

  it('switches lenses via click and keyboard, updating aria-pressed, highlights, badges, and notes', () => {
    mockReducedMotion(false);
    const { container } = render(<ArchitectureLenses schematic={siliconExpertSchematic} />);

    const lensBar = screen.getByRole('group', { name: /architecture lenses/i });

    const targets = [
      { id: 'structure' as const, label: 'Structure', viaKeyboard: false },
      { id: 'resilience' as const, label: 'Resilience', viaKeyboard: true },
      { id: 'performance' as const, label: 'Performance', viaKeyboard: false },
    ];

    for (const target of targets) {
      const button = within(lensBar).getByRole('button', { name: target.label });
      if (target.viaKeyboard) {
        button.focus();
        fireEvent.keyDown(button, { key: 'Enter' });
        fireEvent.click(button);
      } else {
        fireEvent.click(button);
      }

      expect(button).toHaveAttribute('aria-pressed', 'true');
      expect(within(lensBar).getByRole('button', { name: 'Data flow' })).toHaveAttribute(
        'aria-pressed',
        'false',
      );

      const lens = siliconExpertSchematic.lenses[target.id];
      expect(screen.getByText(lens.summary)).toBeInTheDocument();

      for (const node of siliconExpertSchematic.nodes) {
        const nodeEl = container.querySelector(`[data-node-id="${node.id}"]`);
        expect(nodeEl).toHaveAttribute(
          'data-state',
          lens.activeNodes.includes(node.id) ? 'active' : 'dimmed',
        );
      }

      expect(container.querySelectorAll('[data-callout-badge]')).toHaveLength(lens.callouts.length);
      for (const callout of lens.callouts) {
        expect(screen.getByText(callout.title)).toBeInTheDocument();
      }

      const packetLayer = container.querySelector('[data-packet-layer]');
      expect(packetLayer).toHaveAttribute('data-packets-active', 'false');
      expect(container.querySelectorAll('[data-packet]')).toHaveLength(0);
    }

    // Arrow key navigation cycles through lenses
    const perfBtn = within(lensBar).getByRole('button', { name: 'Performance' });
    perfBtn.focus();
    fireEvent.keyDown(perfBtn, { key: 'ArrowRight' });
    expect(within(lensBar).getByRole('button', { name: 'Data flow' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('disables packet animation under prefers-reduced-motion while preserving badges and notes', () => {
    mockReducedMotion(true);
    const { container } = render(<ArchitectureLenses schematic={idemiaSchematic} />);

    const dataFlowLens = idemiaSchematic.lenses['data-flow'];

    const packetLayer = container.querySelector('[data-packet-layer]');
    expect(packetLayer).toHaveAttribute('data-packets-active', 'false');
    expect(container.querySelectorAll('[data-packet]')).toHaveLength(0);

    // Static highlights, badges, and notes remain 100% intact
    expect(container.querySelectorAll('[data-callout-badge]')).toHaveLength(
      dataFlowLens.callouts.length,
    );
    for (const callout of dataFlowLens.callouts) {
      expect(screen.getByText(callout.title)).toBeInTheDocument();
    }
    for (const nodeId of dataFlowLens.activeNodes) {
      expect(container.querySelector(`[data-node-id="${nodeId}"]`)).toHaveAttribute(
        'data-state',
        'active',
      );
    }
  });

  it('uses CSS custom properties exclusively with zero hardcoded hex colors in SVG markup', () => {
    mockReducedMotion(false);
    const { container } = render(<ArchitectureLenses schematic={siliconExpertSchematic} />);

    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg!.outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
