import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LanguageToggle } from './LanguageToggle';

const meta = {
  title: 'Atoms/LanguageToggle',
  component: LanguageToggle,
  tags: ['autodocs'],
} satisfies Meta<typeof LanguageToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
