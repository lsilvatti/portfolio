import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Typography } from './Typography';

const meta = {
  title: 'Atoms/Typography',
  component: Typography,
  tags: ['autodocs'],
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'body', 'small', 'caption', 'ul', 'ol', 'li'],
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = { args: { variant: 'h1' } };

export const Heading2: Story = { args: { variant: 'h2' } };

export const Heading3: Story = { args: { variant: 'h3' } };

export const Heading4: Story = { args: { variant: 'h4' } };

export const Body: Story = { args: { variant: 'body' } };

export const Small: Story = { args: { variant: 'small' } };

export const Caption: Story = { args: { variant: 'caption' } };

export const UnorderedList: Story = {
  args: { variant: 'ul' },
  render: (args) => (
    <Typography {...args}>
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
    </Typography>
  ),
};

export const OrderedList: Story = {
  args: { variant: 'ol' },
  render: (args) => (
    <Typography {...args}>
      <li>First step</li>
      <li>Second step</li>
      <li>Third step</li>
    </Typography>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="body">Body text — the standard paragraph.</Typography>
      <Typography variant="small">Small — secondary information.</Typography>
      <Typography variant="caption">Caption — metadata or labels.</Typography>
    </div>
  ),
};

export const CustomElement: Story = {
  args: { variant: 'h2', as: 'p', children: 'Styled as h2, rendered as <p>' },
};
