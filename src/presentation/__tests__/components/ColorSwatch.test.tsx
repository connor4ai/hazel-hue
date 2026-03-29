import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ColorSwatch } from '@presentation/components/ui/ColorSwatch';

describe('ColorSwatch component', () => {
  it('renders without a name', () => {
    const { toJSON } = render(<ColorSwatch hex="#FF0000" />);
    expect(toJSON()).toBeTruthy();
  });

  it('displays the color name when provided', () => {
    render(<ColorSwatch hex="#FF0000" name="Red" />);
    expect(screen.getByText('Red')).toBeTruthy();
  });

  it('does not display a name when omitted', () => {
    render(<ColorSwatch hex="#FF0000" />);
    expect(screen.queryByText(/./)).toBeNull();
  });

  it('fires onPress when tapped and handler is provided', () => {
    const onPress = jest.fn();
    render(<ColorSwatch hex="#00FF00" name="Green" onPress={onPress} />);

    fireEvent.press(screen.getByText('Green'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders all size variants', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    for (const size of sizes) {
      const { toJSON, unmount } = render(
        <ColorSwatch hex="#0000FF" name={`Size ${size}`} size={size} />,
      );
      expect(toJSON()).toBeTruthy();
      unmount();
    }
  });
});
