import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Toggle, ToggleGroup, ToggleGroupItem } from './index';

describe('Toggle', () => {
  it('renders as a button with role switch', () => {
    render(<Toggle>Bold</Toggle>);
    const btn = screen.getByRole('switch');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('aria-pressed', 'false');
  });

  it('toggles pressed state on click', () => {
    render(<Toggle>Bold</Toggle>);
    const btn = screen.getByRole('switch');
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-pressed', 'true');
    expect(btn).toHaveAttribute('data-state', 'on');
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-pressed', 'false');
    expect(btn).toHaveAttribute('data-state', 'off');
  });

  it('calls onPressedChange in controlled mode', () => {
    const onPressedChange = vi.fn();
    render(<Toggle pressed={false} onPressedChange={onPressedChange}>Bold</Toggle>);
    fireEvent.click(screen.getByRole('switch'));
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it('supports controlled mode', () => {
    const { rerender } = render(<Toggle pressed={false}>Bold</Toggle>);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-pressed', 'false');
    rerender(<Toggle pressed={true}>Bold</Toggle>);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('ToggleGroup', () => {
  it('renders items within a group', () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('selects one item in single mode', () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    );
    fireEvent.click(screen.getByText('A'));
    expect(screen.getByText('A')).toHaveAttribute('data-state', 'on');
    expect(screen.getByText('B')).toHaveAttribute('data-state', 'off');
    fireEvent.click(screen.getByText('B'));
    expect(screen.getByText('A')).toHaveAttribute('data-state', 'off');
    expect(screen.getByText('B')).toHaveAttribute('data-state', 'on');
  });

  it('selects multiple items in multiple mode', () => {
    render(
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    );
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('B'));
    expect(screen.getByText('A')).toHaveAttribute('data-state', 'on');
    expect(screen.getByText('B')).toHaveAttribute('data-state', 'on');
  });

  it('deselects in single mode when clicking same item', () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    );
    fireEvent.click(screen.getByText('A'));
    expect(screen.getByText('A')).toHaveAttribute('data-state', 'on');
    fireEvent.click(screen.getByText('A'));
    expect(screen.getByText('A')).toHaveAttribute('data-state', 'off');
  });

  it('calls onValueChange in controlled mode', () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup type="single" value="" onValueChange={onValueChange}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    );
    fireEvent.click(screen.getByText('A'));
    expect(onValueChange).toHaveBeenCalledWith('a');
  });
});
