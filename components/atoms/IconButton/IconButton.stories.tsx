import type { ElementType } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { IconButton } from './IconButton';
import { GithubIcon, LinkedinIcon, EmailIcon } from '@/components/atoms/Icon/icons';
import { Download, Heart, Share2 } from 'lucide-react';

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: {
    icon: GithubIcon,
    label: 'GitHub',
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'outline', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    icon: { table: { disable: true } },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary' } };

export const Secondary: Story = { args: { variant: 'secondary', icon: Heart as ElementType, label: 'Like' } };

export const Outline: Story = { args: { variant: 'outline' } };

export const Ghost: Story = { args: { variant: 'ghost' } };

export const Small: Story = { args: { size: 'sm' } };

export const Large: Story = { args: { size: 'lg' } };

export const WithTooltip: Story = {
  args: {
    tooltip: <span>Open GitHub</span>,
    icon: GithubIcon,
    label: 'GitHub',
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AsLink: Story = {
  args: {
    href: 'https://github.com',
    icon: GithubIcon,
    label: 'Go to GitHub',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <IconButton icon={GithubIcon} label="Primary" variant="primary" />
      <IconButton icon={Heart as ElementType} label="Secondary" variant="secondary" />
      <IconButton icon={LinkedinIcon} label="Outline" variant="outline" />
      <IconButton icon={EmailIcon} label="Ghost" variant="ghost" />
      <IconButton icon={Share2 as ElementType} label="Disabled" variant="primary" disabled />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <IconButton icon={Download as ElementType} label="Small" size="sm" />
      <IconButton icon={Download as ElementType} label="Medium" size="md" />
      <IconButton icon={Download as ElementType} label="Large" size="lg" />
    </div>
  ),
};
