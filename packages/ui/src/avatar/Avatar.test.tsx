import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar, AvatarImage, AvatarFallback } from './Avatar';

describe('Avatar', () => {
  it('renders avatar container', () => {
    render(<Avatar data-testid="avatar"><AvatarFallback>AB</AvatarFallback></Avatar>);
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Avatar ref={ref}><AvatarFallback>X</AvatarFallback></Avatar>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('renders fallback text', () => {
    render(
      <Avatar>
        <AvatarFallback>RT</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText('RT')).toBeInTheDocument();
  });

  it('renders image with alt text', () => {
    render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.png" alt="User avatar" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
  });

  it('hides image on error and shows fallback', () => {
    render(
      <Avatar>
        <AvatarImage src="invalid.png" alt="broken" />
        <AvatarFallback>FB</AvatarFallback>
      </Avatar>
    );
    const img = screen.getByAltText('broken');
    fireEvent.error(img);
    expect(screen.queryByAltText('broken')).not.toBeInTheDocument();
    expect(screen.getByText('FB')).toBeInTheDocument();
  });
});
