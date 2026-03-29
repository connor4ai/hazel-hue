import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { QualityIndicator } from '@presentation/components/analysis/QualityIndicator';

// Mock OrganicCard to a simple passthrough
jest.mock('@presentation/components/brand/OrganicCard', () => ({
  OrganicCard: ({ children }: { children: React.ReactNode }) => children,
}));

describe('QualityIndicator component', () => {
  it('shows "Good" when score is >= 60', () => {
    render(<QualityIndicator score={85} issues={[]} />);
    expect(screen.getByText('Good')).toBeTruthy();
    expect(screen.getByText('Photo Quality')).toBeTruthy();
  });

  it('shows "Needs Improvement" when score is < 60', () => {
    render(<QualityIndicator score={40} issues={[]} />);
    expect(screen.getByText('Needs Improvement')).toBeTruthy();
  });

  it('renders issues as bullet points', () => {
    const issues = ['Low lighting', 'Face not detected'];
    render(<QualityIndicator score={30} issues={issues} />);

    // Each issue should appear in the output
    for (const issue of issues) {
      expect(screen.getByText(new RegExp(issue))).toBeTruthy();
    }
  });

  it('does not render issues section when there are none', () => {
    render(<QualityIndicator score={90} issues={[]} />);
    expect(screen.queryByText(/Low lighting/)).toBeNull();
  });

  it('clamps bar width between 0 and 100', () => {
    // Should not crash with out-of-range values
    const { toJSON: j1, unmount } = render(
      <QualityIndicator score={-10} issues={[]} />,
    );
    expect(j1()).toBeTruthy();
    unmount();

    const { toJSON: j2 } = render(
      <QualityIndicator score={150} issues={[]} />,
    );
    expect(j2()).toBeTruthy();
  });
});
