import type { Meta, StoryObj } from '@storybook/react';
import { BlockQuote } from './BlockQuote';

const meta: Meta<typeof BlockQuote> = {
  title: 'Atoms/BlockQuote',
  component: BlockQuote,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof BlockQuote>;

export const Default: Story = {
  args: {
    children: 'This is a blockquote example.',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Blockquote with custom class',
    className: 'text-primary',
  },
};