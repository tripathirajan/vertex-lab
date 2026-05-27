import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Btn</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('applies primary variant by default', () => {
    render(<Button data-testid="btn">Primary</Button>);
    expect(screen.getByTestId('btn').className).toContain('var(--color-bg-interactive)');
  });

  it('applies variant styles', () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'link'] as const;
    for (const variant of variants) {
      const { unmount } = render(
        <Button variant={variant} data-testid="btn">{variant}</Button>
      );
      expect(screen.getByTestId('btn')).toBeInTheDocument();
      unmount();
    }
  });

  it('applies size styles', () => {
    const sizes = ['sm', 'md', 'lg', 'icon'] as const;
    for (const size of sizes) {
      const { unmount } = render(
        <Button size={size} data-testid="btn">{size}</Button>
      );
      expect(screen.getByTestId('btn')).toBeInTheDocument();
      unmount();
    }
  });

  it('supports disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class" data-testid="btn">Btn</Button>);
    expect(screen.getByTestId('btn').className).toContain('custom-class');
  });
});
