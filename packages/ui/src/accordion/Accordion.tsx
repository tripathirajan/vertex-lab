import * as React from 'react';
import * as Headless from '@vertex-lab/headless';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

export const Accordion = React.forwardRef<HTMLDivElement, Headless.AccordionProps>(
  ({ className, ...props }, ref) => (
    <Headless.Accordion
      {...props}
      ref={ref}
      className={cn('w-full border-y border-[var(--color-border-default)]', className)}
    />
  )
);
Accordion.displayName = 'Accordion';

export const AccordionItem = React.forwardRef<HTMLDivElement, Headless.AccordionItemProps>(
  ({ className, ...props }, ref) => (
    <Headless.AccordionItem
      {...props}
      ref={ref}
      className={cn('border-b border-[var(--color-border-default)] last:border-0', className)}
    />
  )
);
AccordionItem.displayName = 'AccordionItem';

export const AccordionHeader = React.forwardRef<HTMLButtonElement, Headless.AccordionHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <Headless.AccordionHeader
      {...props}
      ref={ref}
      className={cn(
        'flex w-full items-center justify-between py-4 text-left font-medium transition-all',
        'text-[var(--color-text-default)] hover:text-[var(--color-text-interactive)]',
        '[&[data-state=open]>svg]:rotate-180',
        className
      )}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 text-[var(--color-text-muted)]" />
    </Headless.AccordionHeader>
  )
);
AccordionHeader.displayName = 'AccordionHeader';

export const AccordionPanel = React.forwardRef<HTMLDivElement, Headless.AccordionPanelProps>(
  ({ className, children, ...props }, ref) => (
    <Headless.AccordionPanel
      {...props}
      ref={ref}
      className={cn('overflow-hidden text-sm transition-all pb-4', className)}
    >
      <div className="pt-0">{children}</div>
    </Headless.AccordionPanel>
  )
);
AccordionPanel.displayName = 'AccordionPanel';
