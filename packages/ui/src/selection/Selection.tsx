import * as React from 'react';
import * as Headless from '@vertex-lab/headless';
import { cn } from '../utils/cn';

export const Switch = React.forwardRef<HTMLButtonElement, Headless.SwitchProps>(
  ({ className, ...props }, ref) => (
    <Headless.Switch
      {...props}
      ref={ref}
      className={cn(
        'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-[var(--radius-full)]',
        'border-2 border-transparent transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring-default)] focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-[var(--color-bg-interactive)] data-[state=unchecked]:bg-[var(--color-bg-muted)]',
        className
      )}
    >
      <span
        className="pointer-events-none block h-5 w-5 rounded-[var(--radius-full)] bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        data-state={props.checked ? 'checked' : 'unchecked'}
      />
    </Headless.Switch>
  )
);
Switch.displayName = 'Switch';

export const Checkbox = React.forwardRef<HTMLButtonElement, Headless.CheckboxProps>(
  ({ className, ...props }, ref) => (
    <Headless.Checkbox
      {...props}
      ref={ref}
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring-default)] focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-[var(--color-bg-interactive)] data-[state=checked]:text-white data-[state=checked]:border-[var(--color-bg-interactive)]',
        className
      )}
    >
      <span className="flex items-center justify-center text-current">
        {props.checked && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
    </Headless.Checkbox>
  )
);
Checkbox.displayName = 'Checkbox';
