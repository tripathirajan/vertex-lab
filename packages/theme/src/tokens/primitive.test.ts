import { describe, it, expect } from 'vitest';
import { colors, spacing, radii, fontSizes, fontWeights, lineHeights, shadows, durations, easings, zIndices } from './primitive';

describe('Primitive Tokens', () => {
  describe('colors', () => {
    it('includes white and black', () => {
      expect(colors.white).toBe('#ffffff');
      expect(colors.black).toBe('#000000');
    });

    it('has full gray scale (50-950)', () => {
      const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
      for (const step of steps) {
        expect(colors.gray[step]).toBeDefined();
        expect(colors.gray[step]).toMatch(/^#[0-9a-f]{6}$/);
      }
    });

    it('has all 6 color palettes', () => {
      const palettes = ['gray', 'blue', 'red', 'green', 'amber', 'violet'] as const;
      for (const palette of palettes) {
        expect(colors[palette]).toBeDefined();
        expect(Object.keys(colors[palette])).toHaveLength(11);
      }
    });
  });

  describe('spacing', () => {
    it('includes common spacing values', () => {
      expect(spacing[0]).toBe('0px');
      expect(spacing[1]).toBe('0.25rem');
      expect(spacing[4]).toBe('1rem');
      expect(spacing[8]).toBe('2rem');
    });

    it('has rem-based values (except 0)', () => {
      const entries = Object.entries(spacing).filter(([k]) => k !== '0');
      for (const [, value] of entries) {
        expect(value).toMatch(/rem$/);
      }
    });
  });

  describe('radii', () => {
    it('ranges from none to full', () => {
      expect(radii.none).toBe('0px');
      expect(radii.full).toBe('9999px');
    });

    it('has intermediate values', () => {
      expect(radii.sm).toBeDefined();
      expect(radii.md).toBeDefined();
      expect(radii.lg).toBeDefined();
      expect(radii.xl).toBeDefined();
    });
  });

  describe('fontSizes', () => {
    it('has standard sizes', () => {
      expect(fontSizes.xs).toBe('0.75rem');
      expect(fontSizes.base).toBe('1rem');
      expect(fontSizes['5xl']).toBe('3rem');
    });
  });

  describe('fontWeights', () => {
    it('has numeric string values', () => {
      expect(fontWeights.normal).toBe('400');
      expect(fontWeights.bold).toBe('700');
    });
  });

  describe('lineHeights', () => {
    it('has standard values', () => {
      expect(lineHeights.none).toBe('1');
      expect(lineHeights.normal).toBe('1.5');
    });
  });

  describe('shadows', () => {
    it('includes none and standard sizes', () => {
      expect(shadows.none).toBe('none');
      expect(shadows.sm).toBeDefined();
      expect(shadows.lg).toBeDefined();
    });
  });

  describe('durations', () => {
    it('has ms values', () => {
      expect(durations.fast).toBe('100ms');
      expect(durations.normal).toBe('200ms');
      expect(durations.slow).toBe('300ms');
    });
  });

  describe('easings', () => {
    it('has cubic-bezier values', () => {
      expect(easings.default).toMatch(/^cubic-bezier/);
      expect(easings.in).toMatch(/^cubic-bezier/);
    });
  });

  describe('zIndices', () => {
    it('has ordered z-index values', () => {
      expect(Number(zIndices.dropdown)).toBeLessThan(Number(zIndices.modal));
      expect(Number(zIndices.modal)).toBeLessThan(Number(zIndices.tooltip));
    });
  });
});
