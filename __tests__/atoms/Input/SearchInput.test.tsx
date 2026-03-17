import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from '@/components/atoms/Input/SearchInput';

describe('SearchInput', () => {
  it('renders input with placeholder', () => {
    render(<SearchInput value="" onChange={() => {}} placeholder="Buscar..." />);
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const onChange = jest.fn();
    render(<SearchInput value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'abc' } });
    expect(onChange).toHaveBeenCalledWith('abc');
  });
});
