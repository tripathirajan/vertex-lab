import * as React from 'react';
import { cn } from '../utils/cn';

export type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-[var(--color-bg-emphasis)] text-[var(--color-text-on-emphasis)]',
  secondary: 'bg-[var(--color-bg-muted)] text-[var(--color-text-default)]',
  success: 'bg-[var(--color-bg-success)] text-[var(--color-text-success)]',
  warning: 'bg-[var(--color-bg-warning)] text-[var(--color-text-warning)]',
  danger: 'bg-[var(--color-bg-danger)] text-[var(--color-text-danger)]',
  outline: 'border border-[var(--color-border-default)] text-[var(--color-text-default)] bg-transparent',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-[var(--radius-full)] px-2.5 py-0.5 text-xs font-semibold',
          'transition-colors',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
