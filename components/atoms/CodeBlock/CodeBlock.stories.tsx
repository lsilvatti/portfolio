import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from './CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  title: 'Atoms/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CodeBlock>;

export const Default: Story = {
  args: {
    children: `console.log('Hello, world!');`,
    className: 'language-js',
  },
};

export const Inline: Story = {
  args: {
    children: 'inline code',
    inline: true,
  },
};