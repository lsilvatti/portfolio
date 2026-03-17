import { render } from '@testing-library/react';
import { BlockQuote } from '@/components/atoms/BlockQuote/BlockQuote';

describe('BlockQuote', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <BlockQuote>Test quote</BlockQuote>
    );
    expect(getByText('Test quote')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <BlockQuote className="custom-class">Content</BlockQuote>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});