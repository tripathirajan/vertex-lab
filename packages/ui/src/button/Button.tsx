import * as React from 'react';
import { Button as PrimitiveButton } from '@vertex-lab/primitives';
import { cn } from '../utils/cn';

export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
export type Size = 'sm' | 'md' | 'lg' | 'icon';
export interface ButtonProps extends React.ComponentPropsWithoutRef<typeof PrimitiveButton> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-[var(--color-bg-interactive)] text-[var(--color-text-on-emphasis)] hover:bg-[var(--color-bg-interactive-hover)] shadow-sm',
  secondary: 'bg-[var(--color-bg-muted)] text-[var(--color-text-default)] border border-[var(--color-border-default)] hover:bg-[var(--color-bg-subtle)]',
  outline: 'border border-[var(--color-border-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-subtle)]',
  ghost: 'bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-subtle)]',
  danger: 'bg-[var(--color-bg-danger-emphasis)] text-[var(--color-text-on-emphasis)] hover:bg-[var(--color-bg-danger-hover)] shadow-sm',
  link: 'bg-transparent text-[var(--color-text-interactive)] underline-offset-4 hover:underline',
};

const sizeStyles: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs rounded-[var(--radius-sm)]',
  md: 'h-10 px-4 text-sm rounded-[var(--radius-md)]',
  lg: 'h-12 px-6 text-base rounded-[var(--radius-lg)]',
  icon: 'h-10 w-10 rounded-[var(--radius-md)]',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <PrimitiveButton
        {...props}
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring-default)] focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant as Variant],
          sizeStyles[size as Size],
          className
        )}
      />
    );
  }
);

Button.displayName = 'Button';
