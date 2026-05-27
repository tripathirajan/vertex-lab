import * as React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Tooltip, TooltipTrigger, TooltipContent } from './index';

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not show content initially', () => {
    render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows content on hover after delay', () => {
    render(
      <Tooltip delayDuration={200}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByText('Hover me'));
    act(() => { vi.advanceTimersByTime(200); });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByText('Tooltip text')).toBeInTheDocument();
  });

  it('hides content on mouse leave', () => {
    render(
      <Tooltip delayDuration={0}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByText('Hover me'));
    act(() => { vi.advanceTimersByTime(0); });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    fireEvent.mouseLeave(screen.getByText('Hover me'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows content on focus', () => {
    render(
      <Tooltip delayDuration={200}>
        <TooltipTrigger>Focus me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    );
    fireEvent.focus(screen.getByText('Focus me'));
    act(() => { vi.advanceTimersByTime(200); });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('hides content on blur', () => {
    render(
      <Tooltip delayDuration={0}>
        <TooltipTrigger>Focus me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    );
    fireEvent.focus(screen.getByText('Focus me'));
    act(() => { vi.advanceTimersByTime(0); });
    fireEvent.blur(screen.getByText('Focus me'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('trigger has aria-describedby pointing to content', () => {
    render(
      <Tooltip delayDuration={0}>
        <TooltipTrigger>Trigger</TooltipTrigger>
        <TooltipContent>Info</TooltipContent>
      </Tooltip>
    );
    const trigger = screen.getByText('Trigger');
    expect(trigger).toHaveAttribute('aria-describedby');
    fireEvent.mouseEnter(trigger);
    act(() => { vi.advanceTimersByTime(0); });
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.id).toBe(trigger.getAttribute('aria-describedby'));
  });
});
