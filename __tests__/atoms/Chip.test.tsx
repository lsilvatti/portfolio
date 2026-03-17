import { render, screen, fireEvent } from '@testing-library/react';
import { Chip } from '@/components/atoms/Chip/Chip';

describe('Chip', () => {
  it('renders label', () => {
    render(<Chip label="React" />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('shows selected state', () => {
    render(<Chip label="React" selected />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onClick', () => {
    const onClick = jest.fn();
    render(<Chip label="React" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
