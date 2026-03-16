import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Chip } from './Chip';

const meta = {
  title: 'Atoms/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'React', selected: false },
};

export const Selected: Story = {
  args: { label: 'TypeScript', selected: true },
};

export const Disabled: Story = {
  args: { label: 'Next.js', disabled: true },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Chip label="React" />
      <Chip label="TypeScript" selected />
      <Chip label="Next.js" disabled />
    </div>
  ),
};
