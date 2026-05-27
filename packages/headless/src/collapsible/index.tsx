import * as React from 'react';
import { useControllableState, useId } from '@vertex-lab/hooks';
import { createContext } from '@vertex-lab/utilities';

interface CollapsibleContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentId: string;
  triggerId: string;
}

const [CollapsibleProvider, useCollapsibleContext] = createContext<CollapsibleContextValue>('Collapsible');

export { useCollapsibleContext };

export interface CollapsibleProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  className?: string;
}

export const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ open: openProp, defaultOpen = false, onOpenChange, children, ...props }, ref) => {
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    });
    const id = useId();

    return (
      <CollapsibleProvider value={{ open: !!open, onOpenChange: setOpen, contentId: `collapsible-content-${id}`, triggerId: `collapsible-trigger-${id}` }}>
        <div ref={ref} data-state={open ? 'open' : 'closed'} {...props}>
          {children}
        </div>
      </CollapsibleProvider>
    );
  }
);

Collapsible.displayName = 'Collapsible';

export interface CollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ onClick, children, ...props }, ref) => {
    const { open, onOpenChange, contentId, triggerId } = useCollapsibleContext('CollapsibleTrigger');

    return (
      <button
        ref={ref}
        id={triggerId}
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        data-state={open ? 'open' : 'closed'}
        onClick={(e) => {
          onOpenChange(!open);
          onClick?.(e);
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

CollapsibleTrigger.displayName = 'CollapsibleTrigger';

export interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ children, ...props }, ref) => {
    const { open, contentId, triggerId } = useCollapsibleContext('CollapsibleContent');

    if (!open) return null;

    return (
      <div
        ref={ref}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        data-state={open ? 'open' : 'closed'}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CollapsibleContent.displayName = 'CollapsibleContent';
