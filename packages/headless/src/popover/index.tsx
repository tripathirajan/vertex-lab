import * as React from 'react';
import { useControllableState, useId, useClickOutside } from '@vertex-lab/hooks';
import { createContext, mergeRefs } from '@vertex-lab/utilities';
import { Portal } from '@vertex-lab/primitives';

interface PopoverContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentId: string;
  triggerId: string;
}

const [PopoverProvider, usePopoverContext] = createContext<PopoverContextValue>('Popover');

export { usePopoverContext };

export interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function Popover({ open: openProp, defaultOpen, onOpenChange, children }: PopoverProps) {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  const triggerRef = React.useRef<HTMLElement>(null);
  const id = useId();

  return (
    <PopoverProvider value={{ open: !!open, onOpenChange: setOpen, triggerRef, contentId: `popover-content-${id}`, triggerId: `popover-trigger-${id}` }}>
      {children}
    </PopoverProvider>
  );
}

export interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ onClick, ...props }, ref) => {
    const { open, onOpenChange, triggerId, contentId, triggerRef } = usePopoverContext('PopoverTrigger');

    return (
      <button
        ref={(node) => {
          (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        type="button"
        id={triggerId}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? contentId : undefined}
        data-state={open ? 'open' : 'closed'}
        onClick={(e) => {
          onOpenChange(!open);
          onClick?.(e);
        }}
        {...props}
      />
    );
  }
);

PopoverTrigger.displayName = 'PopoverTrigger';

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, ...props }, ref) => {
    const { open, onOpenChange, contentId, triggerId } = usePopoverContext('PopoverContent');
    const internalRef = React.useRef<HTMLDivElement>(null);
    const combinedRef = mergeRefs(ref, internalRef);

    useClickOutside(internalRef, () => onOpenChange(false));

    React.useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onOpenChange(false);
      };
      if (open) {
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
      }
    }, [open, onOpenChange]);

    if (!open) return null;

    return (
      <Portal>
        <div
          ref={combinedRef as React.Ref<HTMLDivElement>}
          id={contentId}
          role="dialog"
          aria-labelledby={triggerId}
          data-state={open ? 'open' : 'closed'}
          {...props}
        >
          {children}
        </div>
      </Portal>
    );
  }
);

PopoverContent.displayName = 'PopoverContent';
