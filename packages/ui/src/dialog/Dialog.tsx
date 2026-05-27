import * as React from 'react';
import * as Headless from '@vertex-lab/headless';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';

export const Dialog = Headless.Dialog;

export const DialogTrigger = Headless.DialogTrigger;

export const DialogOverlay = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof Headless.DialogOverlay>>(
  ({ className, ...props }, ref) => (
    <Headless.DialogOverlay
      {...props}
      ref={ref}
      className={cn('bg-[var(--color-overlay-default)] backdrop-blur-sm', className)}
    />
  )
);
DialogOverlay.displayName = 'DialogOverlay';

export const DialogContent = React.forwardRef<HTMLDivElement, Headless.DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    const { onOpenChange } = Headless.useDialogContext('DialogContent');

    return (
      <>
        <DialogOverlay />
        <Headless.DialogContent
          {...props}
          ref={ref}
          className={cn(
            'w-full max-w-lg p-6 rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)]',
            'bg-[var(--color-bg-default)] border border-[var(--color-border-default)]',
            className
          )}
        >
          {children}
          <button
            onClick={() => onOpenChange(false)}
            className={cn(
              'absolute right-4 top-4 rounded-[var(--radius-sm)] opacity-70 transition-opacity',
              'text-[var(--color-text-muted)] hover:opacity-100',
              'focus:outline-none focus:ring-2 focus:ring-[var(--color-ring-default)] focus:ring-offset-2'
            )}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </Headless.DialogContent>
      </>
    );
  }
);
DialogContent.displayName = 'DialogContent';

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

export const DialogTitle = React.forwardRef<HTMLHeadingElement, Headless.DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <Headless.DialogTitle
      {...props}
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight text-[var(--color-text-default)]', className)}
    />
  )
);
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = React.forwardRef<HTMLParagraphElement, React.ComponentPropsWithoutRef<typeof Headless.DialogDescription>>(
  ({ className, ...props }, ref) => (
    <Headless.DialogDescription
      {...props}
      ref={ref}
      className={cn('text-sm text-[var(--color-text-muted)]', className)}
    />
  )
);
DialogDescription.displayName = 'DialogDescription';
