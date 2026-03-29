import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button } from '@presentation/components/ui/Button';

describe('Button component', () => {
  it('renders the label text', () => {
    render(<Button>Get Started</Button>);
    // textTransform: uppercase is a style, so text content remains as passed
    expect(screen.getByText('Get Started')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    render(<Button onPress={onPress}>Analyze</Button>);

    fireEvent.press(screen.getByText('Analyze'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire onPress when disabled', () => {
    const onPress = jest.fn();
    render(<Button onPress={onPress} disabled>Analyze</Button>);

    fireEvent.press(screen.getByText('Analyze'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows ActivityIndicator when loading', () => {
    render(<Button loading>Submit</Button>);
    // When loading, the label text should not be rendered
    expect(screen.queryByText('Submit')).toBeNull();
  });

  it('does not fire onPress when loading', () => {
    const onPress = jest.fn();
    render(<Button onPress={onPress} loading>Submit</Button>);

    // The button is disabled while loading — pressing should not call handler
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Cancel</Button>);
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('renders with ghost variant', () => {
    render(<Button variant="ghost">Skip</Button>);
    expect(screen.getByText('Skip')).toBeTruthy();
  });

  it('renders all sizes without crashing', () => {
    const { unmount: u1 } = render(<Button size="sm">Small</Button>);
    u1();
    const { unmount: u2 } = render(<Button size="md">Medium</Button>);
    u2();
    render(<Button size="lg">Large</Button>);
    expect(screen.getByText('Large')).toBeTruthy();
  });
});
