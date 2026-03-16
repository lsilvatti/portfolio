import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { GoToTop } from './GoToTop';

const meta = {
  title: 'Atoms/GoToTop',
  component: GoToTop,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GoToTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ height: 2000, padding: 24 }}>
      <p>Scroll down to see the GoToTop button appear.</p>
      <GoToTop />
    </div>
  ),
};
