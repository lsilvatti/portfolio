import type { Meta, StoryObj } from '@storybook/react';
import { RepositoryListCard } from './RepositoryListCard';

const meta: Meta<typeof RepositoryListCard> = {
  title: 'Molecules/RepositoryListCard',
  component: RepositoryListCard,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof RepositoryListCard>;

export const Default: Story = {
  args: {
    title: 'my-project',
    description: 'A sample project description.',
    languages: ['TypeScript', 'JavaScript'],
    tags: ['web', 'frontend'],
  },
};