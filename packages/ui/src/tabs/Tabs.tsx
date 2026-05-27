import * as React from 'react';
import * as Headless from '@vertex-lab/headless';
import { cn } from '../utils/cn';

export const Tabs = React.forwardRef<HTMLDivElement, Headless.TabsProps>(
  ({ className, ...props }, ref) => (
    <Headless.Tabs
      {...props}
      ref={ref}
      className={cn('w-full', className)}
    />
  )
);
Tabs.displayName = 'Tabs';

export const TabList = React.forwardRef<HTMLDivElement, Headless.TabListProps>(
  ({ className, ...props }, ref) => (
    <Headless.TabList
      {...props}
      ref={ref}
      className={cn('flex border-b border-[var(--color-border-default)]', className)}
    />
  )
);
TabList.displayName = 'TabList';

export const Tab = React.forwardRef<HTMLButtonElement, Headless.TabProps>(
  ({ className, ...props }, ref) => (
    <Headless.Tab
      {...props}
      ref={ref}
      className={cn(
        'px-4 py-2 text-sm font-medium transition-colors',
        'border-b-2 border-transparent',
        'text-[var(--color-text-muted)] hover:text-[var(--color-text-interactive)]',
        'data-[state=active]:border-[var(--color-border-interactive)] data-[state=active]:text-[var(--color-text-interactive)]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    />
  )
);
Tab.displayName = 'Tab';

export const TabPanel = React.forwardRef<HTMLDivElement, Headless.TabPanelProps>(
  ({ className, ...props }, ref) => (
    <Headless.TabPanel
      {...props}
      ref={ref}
      className={cn('py-4 focus:outline-none', className)}
    />
  )
);
TabPanel.displayName = 'TabPanel';
