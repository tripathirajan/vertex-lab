import { describe, it, expect } from 'vitest';
import { semanticColors } from './semantic';

describe('Semantic Tokens', () => {
  it('has bg, text, border, ring, overlay categories', () => {
    expect(semanticColors.bg).toBeDefined();
    expect(semanticColors.text).toBeDefined();
    expect(semanticColors.border).toBeDefined();
    expect(semanticColors.ring).toBeDefined();
    expect(semanticColors.overlay).toBeDefined();
  });

  it('every token has light and dark values', () => {
    for (const [category, roles] of Object.entries(semanticColors)) {
      for (const [role, pair] of Object.entries(roles)) {
        expect(pair).toHaveProperty('light');
        expect(pair).toHaveProperty('dark');
        expect(typeof (pair as { light: string }).light).toBe('string');
        expect(typeof (pair as { dark: string }).dark).toBe('string');
      }
    }
  });

  it('bg has required roles', () => {
    const requiredRoles = ['default', 'subtle', 'muted', 'emphasis', 'interactive', 'success', 'warning', 'danger'];
    for (const role of requiredRoles) {
      expect(semanticColors.bg).toHaveProperty(role);
    }
  });

  it('text has required roles', () => {
    const requiredRoles = ['default', 'subtle', 'muted', 'on-emphasis', 'interactive', 'success', 'warning', 'danger'];
    for (const role of requiredRoles) {
      expect(semanticColors.text).toHaveProperty(role);
    }
  });

  it('border has required roles', () => {
    const requiredRoles = ['default', 'subtle', 'strong', 'interactive', 'danger'];
    for (const role of requiredRoles) {
      expect(semanticColors.border).toHaveProperty(role);
    }
  });

  it('light and dark values differ for bg.default', () => {
    expect(semanticColors.bg.default.light).not.toBe(semanticColors.bg.default.dark);
  });
});
