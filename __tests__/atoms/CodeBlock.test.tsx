import { render } from '@testing-library/react';
import { CodeBlock } from '@/components/atoms/CodeBlock/CodeBlock';

describe('CodeBlock', () => {
  it('renders inline code', () => {
    const { getByText } = render(
      <CodeBlock inline>inline code</CodeBlock>
    );
    expect(getByText('inline code')).toBeInTheDocument();
  });

  it('renders block code with language', () => {
    const { container } = render(
      <CodeBlock className="language-js">console.log('test');</CodeBlock>
    );
    expect(container.querySelector('pre, code, div')).toBeTruthy();
  });
});