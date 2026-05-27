import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RadioGroup, RadioGroupItem } from './index';

describe('RadioGroup', () => {
  it('renders with radiogroup role', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a">Option A</RadioGroupItem>
        <RadioGroupItem value="b">Option B</RadioGroupItem>
      </RadioGroup>
    );
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('selects an item on click', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a">Option A</RadioGroupItem>
        <RadioGroupItem value="b">Option B</RadioGroupItem>
      </RadioGroup>
    );
    fireEvent.click(screen.getByText('Option A'));
    expect(screen.getByText('Option A')).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByText('Option A')).toHaveAttribute('data-state', 'checked');
    expect(screen.getByText('Option B')).toHaveAttribute('aria-checked', 'false');
  });

  it('switches selection between items', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a">Option A</RadioGroupItem>
        <RadioGroupItem value="b">Option B</RadioGroupItem>
      </RadioGroup>
    );
    fireEvent.click(screen.getByText('Option A'));
    fireEvent.click(screen.getByText('Option B'));
    expect(screen.getByText('Option A')).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByText('Option B')).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onValueChange in controlled mode', () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup value="" onValueChange={onValueChange}>
        <RadioGroupItem value="a">Option A</RadioGroupItem>
      </RadioGroup>
    );
    fireEvent.click(screen.getByText('Option A'));
    expect(onValueChange).toHaveBeenCalledWith('a');
  });

  it('supports controlled value', () => {
    const { rerender } = render(
      <RadioGroup value="a">
        <RadioGroupItem value="a">A</RadioGroupItem>
        <RadioGroupItem value="b">B</RadioGroupItem>
      </RadioGroup>
    );
    expect(screen.getByText('A')).toHaveAttribute('aria-checked', 'true');
    rerender(
      <RadioGroup value="b">
        <RadioGroupItem value="a">A</RadioGroupItem>
        <RadioGroupItem value="b">B</RadioGroupItem>
      </RadioGroup>
    );
    expect(screen.getByText('B')).toHaveAttribute('aria-checked', 'true');
  });

  it('supports defaultValue', () => {
    render(
      <RadioGroup defaultValue="b">
        <RadioGroupItem value="a">A</RadioGroupItem>
        <RadioGroupItem value="b">B</RadioGroupItem>
      </RadioGroup>
    );
    expect(screen.getByText('B')).toHaveAttribute('aria-checked', 'true');
  });
});
