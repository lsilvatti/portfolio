import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card } from './Card';
import { Typography } from '@/components/atoms/Typography';

const meta = {
  title: 'Atoms/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    children: 'Card content goes here',
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'ghost', 'glass'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = { args: { variant: 'primary' } };

export const Ghost: Story = { args: { variant: 'ghost' } };

export const Glass: Story = {
  args: { variant: 'glass' },
  decorators: [
    (Story) => (
      <div style={{ background: 'linear-gradient(135deg, #7c3aed, #f97316)', padding: 40, borderRadius: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithContent: Story = {
  render: (args) => (
    <Card {...args}>
      <Typography variant="h3">Card Title</Typography>
      <Typography variant="body" className="mt-2">
        This is a card with some content inside. Cards are versatile containers
        for grouping related information.
      </Typography>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card variant="default"><Typography variant="body">Default</Typography></Card>
      <Card variant="primary"><Typography variant="body">Primary</Typography></Card>
      <Card variant="ghost"><Typography variant="body">Ghost</Typography></Card>
      <Card variant="glass"><Typography variant="body">Glass</Typography></Card>
    </div>
  ),
};

export const AllPaddings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card padding="none"><Typography variant="body">No padding</Typography></Card>
      <Card padding="sm"><Typography variant="body">Small padding</Typography></Card>
      <Card padding="md"><Typography variant="body">Medium padding</Typography></Card>
      <Card padding="lg"><Typography variant="body">Large padding</Typography></Card>
    </div>
  ),
};
