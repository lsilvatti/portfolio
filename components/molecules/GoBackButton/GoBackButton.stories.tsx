import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { GoBackButton } from './GoBackButton';

const meta = {
  title: 'Molecules/GoBackButton',
  component: GoBackButton,
  tags: ['autodocs'],
} satisfies Meta<typeof GoBackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
