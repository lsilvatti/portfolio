import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ConnectView } from './ConnectView';

const meta = {
  title: 'Organisms/ConnectView',
  component: ConnectView,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80, maxWidth: 600, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ConnectView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
