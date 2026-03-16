import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ChipDropdown } from './ChipDropdown';

const meta = {
  title: 'Molecules/ChipDropdown',
  component: ChipDropdown,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
    selectedOptions: { control: 'object' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof ChipDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const techOptions = ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Jest'];

export const Default: Story = {
  args: {
    options: techOptions,
    selectedOptions: [],
    label: 'Tecnologias',
    onToggle: () => {},
    onClear: () => {},
  },
};

export const WithSelected: Story = {
  args: {
    options: techOptions,
    selectedOptions: ['React', 'Jest'],
    label: 'Tecnologias',
    onToggle: () => {},
    onClear: () => {},
  },
};
