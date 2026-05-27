/**
 * Generates theme.css from token definitions.
 *
 * Usage: npx tsx packages/theme/src/tokens/generate.ts
 */
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { colors, spacing, radii, fontSizes, fontWeights, lineHeights, shadows, durations, easings, zIndices } from './primitive';
import { semanticColors } from './semantic';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function flattenObject(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}-${key}` : key;
    if (typeof value === 'object' && value !== null && !('light' in value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, newKey));
    } else if (typeof value === 'string') {
      result[newKey] = value;
    }
  }
  return result;
}

export function generateTokenCSS(): string {
  const lines: string[] = [];

  // @theme block with static primitive tokens
  lines.push('@theme {');
  lines.push('  /* Fonts */');
  lines.push('  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;');
  lines.push('  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;');
  lines.push('');

  // Colors (primitive)
  lines.push('  /* Primitive Colors */');
  const flatColors = flattenObject(colors, 'color');
  for (const [key, value] of Object.entries(flatColors)) {
    lines.push(`  --${key}: ${value};`);
  }
  lines.push('');

  // Spacing
  lines.push('  /* Spacing */');
  for (const [key, value] of Object.entries(spacing)) {
    lines.push(`  --spacing-${key}: ${value};`);
  }
  lines.push('');

  // Radii
  lines.push('  /* Radius */');
  for (const [key, value] of Object.entries(radii)) {
    lines.push(`  --radius-${key}: ${value};`);
  }
  lines.push('');

  // Font sizes
  lines.push('  /* Font Sizes */');
  for (const [key, value] of Object.entries(fontSizes)) {
    lines.push(`  --font-size-${key}: ${value};`);
  }
  lines.push('');

  // Font weights
  lines.push('  /* Font Weights */');
  for (const [key, value] of Object.entries(fontWeights)) {
    lines.push(`  --font-weight-${key}: ${value};`);
  }
  lines.push('');

  // Line heights
  lines.push('  /* Line Heights */');
  for (const [key, value] of Object.entries(lineHeights)) {
    lines.push(`  --line-height-${key}: ${value};`);
  }
  lines.push('');

  // Shadows
  lines.push('  /* Shadows */');
  for (const [key, value] of Object.entries(shadows)) {
    lines.push(`  --shadow-${key}: ${value};`);
  }
  lines.push('');

  // Durations
  lines.push('  /* Durations */');
  for (const [key, value] of Object.entries(durations)) {
    lines.push(`  --duration-${key}: ${value};`);
  }
  lines.push('');

  // Easings
  lines.push('  /* Easings */');
  for (const [key, value] of Object.entries(easings)) {
    lines.push(`  --easing-${key}: ${value};`);
  }
  lines.push('');

  // Z-Index
  lines.push('  /* Z-Index */');
  for (const [key, value] of Object.entries(zIndices)) {
    lines.push(`  --z-index-${key}: ${value};`);
  }

  lines.push('}');
  lines.push('');

  // :root block with light semantic tokens
  lines.push(':root {');
  for (const [category, roles] of Object.entries(semanticColors)) {
    for (const [role, pair] of Object.entries(roles)) {
      const varName = `--color-${category}-${role}`;
      lines.push(`  ${varName}: ${(pair as { light: string; dark: string }).light};`);
    }
  }
  lines.push('}');
  lines.push('');

  // [data-theme="dark"] block
  lines.push('[data-theme="dark"] {');
  for (const [category, roles] of Object.entries(semanticColors)) {
    for (const [role, pair] of Object.entries(roles)) {
      const varName = `--color-${category}-${role}`;
      lines.push(`  ${varName}: ${(pair as { light: string; dark: string }).dark};`);
    }
  }
  lines.push('}');
  lines.push('');

  // @media prefers-color-scheme: dark (auto-detect)
  lines.push('@media (prefers-color-scheme: dark) {');
  lines.push('  :root:not([data-theme="light"]) {');
  for (const [category, roles] of Object.entries(semanticColors)) {
    for (const [role, pair] of Object.entries(roles)) {
      const varName = `--color-${category}-${role}`;
      lines.push(`    ${varName}: ${(pair as { light: string; dark: string }).dark};`);
    }
  }
  lines.push('  }');
  lines.push('}');

  return lines.join('\n');
}

// Run as script
const css = generateTokenCSS();
const outPath = join(__dirname, '..', 'theme.css');
writeFileSync(outPath, css, 'utf-8');
console.log(`Generated ${outPath}`);
