import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Avatar } from './Avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    src: '/profile.jpeg',
    alt: 'Profile picture',
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    border: { control: 'select', options: [undefined, 'default', 'primary', 'ghost'] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = { args: { size: 'sm' } };

export const Medium: Story = { args: { size: 'md' } };

export const Large: Story = { args: { size: 'lg' } };

export const WithBorder: Story = { args: { border: 'primary', size: 'lg' } };

export const GhostBorder: Story = { args: { border: 'ghost', size: 'lg' } };

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
    </div>
  ),
};
