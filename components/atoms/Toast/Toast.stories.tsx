import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Toast } from './Toast';

const meta = {
  title: 'Atoms/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: {
    message: 'Copied to clipboard!',
    duration: 60000,
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TopLeft: Story = { args: { position: 'top-left' } };

export const TopCenter: Story = { args: { position: 'top-center' } };

export const TopRight: Story = { args: { position: 'top-right' } };

export const BottomLeft: Story = { args: { position: 'bottom-left' } };

export const BottomCenter: Story = { args: { position: 'bottom-center' } };

export const BottomRight: Story = { args: { position: 'bottom-right' } };
