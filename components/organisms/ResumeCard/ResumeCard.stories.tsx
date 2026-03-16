import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ResumeCard } from './ResumeCard';

const meta = {
  title: 'Organisms/ResumeCard',
  component: ResumeCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ResumeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
