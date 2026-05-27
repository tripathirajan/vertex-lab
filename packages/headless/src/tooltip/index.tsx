/* eslint-disable react/prop-types */
import * as React from 'react';
import { useId } from '@vertex-lab/hooks';
import { createContext, mergeRefs } from '@vertex-lab/utilities';
import { Portal } from '@vertex-lab/primitives';

interface TooltipContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentId: string;
}

const [TooltipProvider, useTooltipContext] = createContext<TooltipContextValue>('Tooltip');

export { useTooltipContext };

export interface TooltipProps {
  open?: boolean;
  defaultOpen?: boolean;
  delayDuration?: number;
  children?: React.ReactNode;
}

export function Tooltip({ open: openProp, defaultOpen = false, delayDuration = 300, children }: TooltipProps) {
  const [open, setOpen] = React.useState(openProp ?? defaultOpen);
  const triggerRef = React.useRef<HTMLElement>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const id = useId();

  React.useEffect(() => {
    if (openProp !== undefined) setOpen(openProp);
  }, [openProp]);

  const onOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      clearTimeout(timeoutRef.current);
      if (nextOpen) {
        timeoutRef.current = setTimeout(() => setOpen(true), delayDuration);
      } else {
        setOpen(false);
      }
    },
    [delayDuration]
  );

  React.useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <TooltipProvider value={{ open, onOpenChange, triggerRef, contentId: `tooltip-${id}` }}>
      {children}
    </TooltipProvider>
  );
}

export const TooltipTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(
  ({ onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }, ref) => {
    const { onOpenChange, contentId, triggerRef } = useTooltipContext('TooltipTrigger');

    const combinedRef = mergeRefs(ref, triggerRef as React.Ref<HTMLButtonElement>);

    return (
      <button
        ref={combinedRef as React.Ref<HTMLButtonElement>}
        type="button"
        aria-describedby={contentId}
        onMouseEnter={(e) => {
          onOpenChange(true);
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          onOpenChange(false);
          onMouseLeave?.(e);
        }}
        onFocus={(e) => {
          onOpenChange(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          onOpenChange(false);
          onBlur?.(e);
        }}
        {...props}
      />
    );
  }
);

TooltipTrigger.displayName = 'TooltipTrigger';

export type TooltipContentProps = React.HTMLAttributes<HTMLDivElement>;

export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ children, ...props }, ref) => {
    const { open, contentId } = useTooltipContext('TooltipContent');

    if (!open) return null;

    return (
      <Portal>
        <div
          ref={ref}
          id={contentId}
          role="tooltip"
          data-state={open ? 'open' : 'closed'}
          {...props}
        >
          {children}
        </div>
      </Portal>
    );
  }
);

TooltipContent.displayName = 'TooltipContent';
