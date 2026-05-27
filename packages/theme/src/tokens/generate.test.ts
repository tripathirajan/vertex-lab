import { describe, it, expect } from 'vitest';
import { generateTokenCSS } from './generate';

describe('generateTokenCSS', () => {
  const css = generateTokenCSS();

  it('outputs @theme block with primitive tokens', () => {
    expect(css).toContain('@theme {');
    expect(css).toContain('--color-white: #ffffff;');
    expect(css).toContain('--color-blue-500:');
    expect(css).toContain('--spacing-4: 1rem;');
    expect(css).toContain('--radius-md:');
    expect(css).toContain('--shadow-sm:');
    expect(css).toContain('--duration-fast: 100ms;');
    expect(css).toContain('--easing-default:');
    expect(css).toContain('--z-index-modal:');
    expect(css).toContain('--font-sans:');
  });

  it('outputs :root block with light semantic tokens', () => {
    expect(css).toContain(':root {');
    expect(css).toContain('--color-bg-default:');
    expect(css).toContain('--color-text-default:');
    expect(css).toContain('--color-border-default:');
  });

  it('outputs [data-theme="dark"] block', () => {
    expect(css).toContain('[data-theme="dark"] {');
  });

  it('outputs @media prefers-color-scheme block', () => {
    expect(css).toContain('@media (prefers-color-scheme: dark)');
    expect(css).toContain(':root:not([data-theme="light"])');
  });

  it('dark tokens differ from light tokens for bg-default', () => {
    const rootMatch = css.match(/:root \{[\s\S]*?\n\}/);
    const darkMatch = css.match(/\[data-theme="dark"\] \{[\s\S]*?\n\}/);
    expect(rootMatch).not.toBeNull();
    expect(darkMatch).not.toBeNull();

    const lightBg = rootMatch![0].match(/--color-bg-default: ([^;]+);/)?.[1];
    const darkBg = darkMatch![0].match(/--color-bg-default: ([^;]+);/)?.[1];
    expect(lightBg).toBeDefined();
    expect(darkBg).toBeDefined();
    expect(lightBg).not.toBe(darkBg);
  });
});
