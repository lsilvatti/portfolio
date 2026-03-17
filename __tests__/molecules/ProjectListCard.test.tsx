import { render, fireEvent } from '@testing-library/react';
import { ProjectListCard } from '@/components/molecules/ProjectListCard/ProjectListCard';

describe('ProjectListCard', () => {
  const defaultProps = {
    title: 'my-project',
    description: 'A project description',
    languages: ['TypeScript', 'JavaScript'],
    tags: ['web', 'frontend'],
  };

  it('renders title and description', () => {
    const { getByText } = render(<ProjectListCard {...defaultProps} />);
    expect(getByText('my project')).toBeInTheDocument();
    expect(getByText('A project description')).toBeInTheDocument();
  });

  it('calls onClickLanguageChip when language chip is clicked', () => {
    const onClickLanguageChip = jest.fn();
    const { getByText } = render(
      <ProjectListCard {...defaultProps} onClickLanguageChip={onClickLanguageChip} />
    );
    fireEvent.click(getByText('TypeScript'));
    expect(onClickLanguageChip).toHaveBeenCalledWith('TypeScript');
  });

  it('calls onClickTagChip when tag chip is clicked', () => {
    const onClickTagChip = jest.fn();
    const { getByText } = render(
      <ProjectListCard {...defaultProps} onClickTagChip={onClickTagChip} />
    );
    fireEvent.click(getByText('web'));
    expect(onClickTagChip).toHaveBeenCalledWith('web');
  });
});