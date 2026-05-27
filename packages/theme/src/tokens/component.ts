/**
 * Component-level tokens.
 * Reference semantic CSS vars so they auto-switch with theme.
 */

export const buttonTokens = {
  primary: {
    bg: 'var(--color-bg-interactive)',
    bgHover: 'var(--color-bg-interactive-hover)',
    text: 'var(--color-text-on-emphasis)',
    border: 'transparent',
  },
  secondary: {
    bg: 'var(--color-bg-muted)',
    bgHover: 'var(--color-bg-subtle)',
    text: 'var(--color-text-default)',
    border: 'var(--color-border-default)',
  },
  destructive: {
    bg: 'var(--color-bg-danger-emphasis)',
    bgHover: 'var(--color-bg-danger-hover)',
    text: 'var(--color-text-on-emphasis)',
    border: 'transparent',
  },
  outline: {
    bg: 'transparent',
    bgHover: 'var(--color-bg-subtle)',
    text: 'var(--color-text-default)',
    border: 'var(--color-border-default)',
  },
  ghost: {
    bg: 'transparent',
    bgHover: 'var(--color-bg-subtle)',
    text: 'var(--color-text-default)',
    border: 'transparent',
  },
  link: {
    bg: 'transparent',
    bgHover: 'transparent',
    text: 'var(--color-text-interactive)',
    border: 'transparent',
  },
} as const;

export const buttonSizes = {
  sm: { height: '2rem', px: '0.75rem', fontSize: '0.75rem', radius: 'var(--radius-md)' },
  md: { height: '2.5rem', px: '1rem', fontSize: '0.875rem', radius: 'var(--radius-md)' },
  lg: { height: '3rem', px: '1.5rem', fontSize: '1rem', radius: 'var(--radius-md)' },
  icon: { height: '2.5rem', px: '0', fontSize: '0.875rem', radius: 'var(--radius-md)' },
} as const;

export const inputTokens = {
  bg: 'var(--color-bg-default)',
  border: 'var(--color-border-default)',
  borderFocus: 'var(--color-border-interactive)',
  text: 'var(--color-text-default)',
  placeholder: 'var(--color-text-muted)',
  borderError: 'var(--color-border-danger)',
} as const;

export const cardTokens = {
  bg: 'var(--color-bg-default)',
  border: 'var(--color-border-default)',
  shadow: 'var(--shadow-base)',
} as const;
