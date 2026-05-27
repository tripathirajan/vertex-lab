/**
 * Semantic tokens — category.role.variant
 * Each token has a light and dark value.
 */
import { colors } from './primitive';

type Pair = { light: string; dark: string };

function pair(light: string, dark: string): Pair {
  return { light, dark };
}

export const semanticColors = {
  bg: {
    default: pair(colors.white, colors.gray[950]),
    subtle: pair(colors.gray[50], colors.gray[900]),
    muted: pair(colors.gray[100], colors.gray[800]),
    emphasis: pair(colors.gray[900], colors.gray[50]),
    inverse: pair(colors.gray[800], colors.gray[200]),
    interactive: pair(colors.blue[600], colors.blue[500]),
    'interactive-hover': pair(colors.blue[700], colors.blue[400]),
    success: pair(colors.green[50], colors.green[950]),
    'success-emphasis': pair(colors.green[600], colors.green[500]),
    warning: pair(colors.amber[50], colors.amber[950]),
    'warning-emphasis': pair(colors.amber[500], colors.amber[400]),
    danger: pair(colors.red[50], colors.red[950]),
    'danger-emphasis': pair(colors.red[600], colors.red[500]),
    'danger-hover': pair(colors.red[700], colors.red[400]),
  },

  text: {
    default: pair(colors.gray[900], colors.gray[50]),
    subtle: pair(colors.gray[700], colors.gray[300]),
    muted: pair(colors.gray[500], colors.gray[400]),
    'on-emphasis': pair(colors.white, colors.gray[950]),
    interactive: pair(colors.blue[600], colors.blue[400]),
    'interactive-hover': pair(colors.blue[700], colors.blue[300]),
    success: pair(colors.green[700], colors.green[400]),
    warning: pair(colors.amber[700], colors.amber[400]),
    danger: pair(colors.red[600], colors.red[400]),
  },

  border: {
    default: pair(colors.gray[200], colors.gray[800]),
    subtle: pair(colors.gray[100], colors.gray[900]),
    strong: pair(colors.gray[400], colors.gray[600]),
    interactive: pair(colors.blue[600], colors.blue[500]),
    danger: pair(colors.red[500], colors.red[400]),
  },

  ring: {
    default: pair(colors.blue[500], colors.blue[400]),
    danger: pair(colors.red[500], colors.red[400]),
  },

  overlay: {
    default: pair('rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)'),
  },
} as const;
