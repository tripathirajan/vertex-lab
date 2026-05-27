import * as React from 'react';
import { useControllableState } from '@vertex-lab/hooks';
import { createContext } from '@vertex-lab/utilities';

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ pressed: pressedProp, defaultPressed = false, onPressedChange, onClick, ...props }, ref) => {
    const [pressed, setPressed] = useControllableState({
      prop: pressedProp,
      defaultProp: defaultPressed,
      onChange: onPressedChange,
    });

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-pressed={!!pressed}
        data-state={pressed ? 'on' : 'off'}
        onClick={(e) => {
          setPressed(!pressed);
          onClick?.(e);
        }}
        {...props}
      />
    );
  }
);

Toggle.displayName = 'Toggle';

export type ToggleGroupType = 'single' | 'multiple';

interface ToggleGroupContextValue {
  type: ToggleGroupType;
  value: string[];
  onItemToggle: (itemValue: string) => void;
}

const [ToggleGroupProvider, useToggleGroupContext] = createContext<ToggleGroupContextValue>('ToggleGroup');

export { useToggleGroupContext };

export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: ToggleGroupType;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ type = 'single', value: valueProp, defaultValue, onValueChange, children, ...props }, ref) => {
    const normalizeValue = React.useCallback((v: string | string[] | undefined): string[] => {
      if (v === undefined) return [];
      return Array.isArray(v) ? v : [v];
    }, []);

    const [value, setValue] = useControllableState({
      prop: valueProp !== undefined ? normalizeValue(valueProp) : undefined,
      defaultProp: normalizeValue(defaultValue),
      onChange: (val: string[]) => {
        onValueChange?.(type === 'single' ? (val[0] ?? '') : val);
      },
    });

    const onItemToggle = React.useCallback(
      (itemValue: string) => {
        const current = value ?? [];
        if (type === 'single') {
          setValue(current.includes(itemValue) ? [] : [itemValue]);
        } else {
          setValue(
            current.includes(itemValue)
              ? current.filter((v) => v !== itemValue)
              : [...current, itemValue]
          );
        }
      },
      [type, value, setValue]
    );

    return (
      <ToggleGroupProvider value={{ type, value: value ?? [], onItemToggle }}>
        <div ref={ref} role="group" {...props}>
          {children}
        </div>
      </ToggleGroupProvider>
    );
  }
);

ToggleGroup.displayName = 'ToggleGroup';

export interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ value, onClick, ...props }, ref) => {
    const { value: groupValue, onItemToggle } = useToggleGroupContext('ToggleGroupItem');
    const pressed = groupValue.includes(value);

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-pressed={pressed}
        aria-checked={pressed}
        data-state={pressed ? 'on' : 'off'}
        onClick={(e) => {
          onItemToggle(value);
          onClick?.(e);
        }}
        {...props}
      />
    );
  }
);

ToggleGroupItem.displayName = 'ToggleGroupItem';
