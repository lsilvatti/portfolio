import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tooltip } from './Tooltip';
import { Button } from '@/components/atoms/Button';

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    content: 'Tooltip content',
    children: <Button>Hover me</Button>,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PrimaryVariant: Story = {
  args: {
    contentProps: { variant: 'primary' },
    content: 'Primary tooltip',
    children: <Button variant="primary">Hover me</Button>,
  },
};

export const MediumSize: Story = {
  args: {
    contentProps: { size: 'md' },
    content: 'Larger tooltip with more text',
    children: <Button>Hover me</Button>,
  },
};
