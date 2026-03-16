import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ConnectCard } from './ConnectCard';
import { fn } from 'storybook/test';

const meta = {
  title: 'Organisms/ConnectCard',
  component: ConnectCard,
  tags: ['autodocs'],
  args: {
    onShowForm: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80, maxWidth: 600, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ConnectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
