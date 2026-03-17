import { render, screen, fireEvent } from '@testing-library/react';
import { ChipDropdown } from '@/components/molecules/ChipDropdown/ChipDropdown';

const options = ['React', 'TypeScript', 'Next.js'];

describe('ChipDropdown', () => {
  it('renders label when no selection', () => {
    render(<ChipDropdown options={options} selectedOptions={[]} onToggle={() => {}} onClear={() => {}} />);
    expect(screen.getByText('Tecnologias')).toBeInTheDocument();
  });

  it('renders selected options', () => {
    render(<ChipDropdown options={options} selectedOptions={['React']} onToggle={() => {}} onClear={() => {}} />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('opens dropdown on click', () => {
    render(<ChipDropdown options={options} selectedOptions={[]} onToggle={() => {}} onClear={() => {}} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });
});
