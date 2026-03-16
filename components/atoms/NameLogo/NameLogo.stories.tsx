import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NameLogo } from './NameLogo';

const meta = {
  title: 'Atoms/NameLogo',
  component: NameLogo,
  tags: ['autodocs'],
} satisfies Meta<typeof NameLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: { className: 'h-7' },
};

export const Large: Story = {
  args: { className: 'h-20' },
};

export const Colored: Story = {
  args: { className: 'h-16 text-primary' },
};
