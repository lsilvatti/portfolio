import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ShareButton } from './ShareButton';

const meta = {
  title: 'Atoms/ShareButton',
  component: ShareButton,
  tags: ['autodocs'],
  args: {
    title: 'Portfolio',
    text: 'Check out my portfolio!',
    url: 'https://silvatti.com.br',
  },
} satisfies Meta<typeof ShareButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomUrl: Story = {
  args: { url: 'https://github.com/lsilvatti' },
};
