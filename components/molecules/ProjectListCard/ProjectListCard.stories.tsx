import type { Meta, StoryObj } from '@storybook/react';
import { ProjectListCard } from './ProjectListCard';

const meta: Meta<typeof ProjectListCard> = {
  title: 'Molecules/ProjectListCard',
  component: ProjectListCard,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ProjectListCard>;

export const Default: Story = {
  args: {
    title: 'my-project',
    description: 'A sample project description.',
    languages: ['TypeScript', 'JavaScript'],
    tags: ['web', 'frontend'],
  },
};