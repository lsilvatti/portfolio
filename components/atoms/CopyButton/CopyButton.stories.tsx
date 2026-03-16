import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CopyButton } from './CopyButton';

const meta = {
  title: 'Atoms/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
  args: {
    value: 'https://github.com/lsilvatti',
  },
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithEmail: Story = {
  args: { value: 'leonardo@silvatti.com.br' },
};
