import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';
import { ArrowRightIcon, GithubIcon } from '@/components/atoms/Icon/icons';
import { Download } from 'lucide-react';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'outline', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    fullWidth: { control: 'boolean' },
    rounded: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary' } };

export const Outline: Story = { args: { variant: 'outline' } };

export const Ghost: Story = { args: { variant: 'ghost' } };

export const Small: Story = { args: { size: 'sm' } };

export const Large: Story = { args: { size: 'lg' } };

export const FullWidth: Story = { args: { fullWidth: true } };

export const Rounded: Story = { args: { rounded: true } };

export const Disabled: Story = { args: { disabled: true } };

export const WithIconLeft: Story = {
  args: { iconLeft: Download, children: 'Download' },
};

export const WithIconRight: Story = {
  args: { iconRight: ArrowRightIcon, children: 'Next' },
};

export const WithBothIcons: Story = {
  args: { iconLeft: GithubIcon, iconRight: ArrowRightIcon, children: 'GitHub' },
};

export const AsLink: Story = {
  args: { href: 'https://example.com', target: '_blank', children: 'External Link' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
