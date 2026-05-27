import * as React from 'react';
import { useControllableState } from '@vertex-lab/hooks';
import { createContext } from '@vertex-lab/utilities';

interface RadioGroupContextValue {
  value: string | undefined;
  onValueChange: (value: string) => void;
  name: string | undefined;
}

const [RadioGroupProvider, useRadioGroupContext] = createContext<RadioGroupContextValue>('RadioGroup');

export { useRadioGroupContext };

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ value: valueProp, defaultValue, onValueChange, name, children, ...props }, ref) => {
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });

    return (
      <RadioGroupProvider value={{ value, onValueChange: setValue, name }}>
        <div ref={ref} role="radiogroup" {...props}>
          {children}
        </div>
      </RadioGroupProvider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export interface RadioGroupItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  value: string;
}

export const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ value, onClick, children, ...props }, ref) => {
    const { value: groupValue, onValueChange } = useRadioGroupContext('RadioGroupItem');
    const checked = value === groupValue;

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={checked}
        data-state={checked ? 'checked' : 'unchecked'}
        onClick={(e) => {
          onValueChange(value);
          onClick?.(e);
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

RadioGroupItem.displayName = 'RadioGroupItem';
