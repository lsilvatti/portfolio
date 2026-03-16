import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MarkdownVisualizer } from './MarkdownVisualizer';

const meta = {
  title: 'Molecules/MarkdownVisualizer',
  component: MarkdownVisualizer,
  tags: ['autodocs'],
  argTypes: {
    markdown: { control: 'object' },
  },
} satisfies Meta<typeof MarkdownVisualizer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    markdown: { default: (props: any) => <div {...props}># Hello MDX\nThis is a test.</div> },
  },
};
