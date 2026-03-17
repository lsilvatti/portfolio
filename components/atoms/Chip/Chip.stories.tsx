
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Atoms/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    variant: {
      control: 'select',
      options: [
        'default',
        'outline',
        'primary',
        'secondary',
        'outline-primary',
        'outline-secondary',
      ],
    },
    selectable: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: { label: 'Default', variant: 'default' },
};

export const Outline: Story = {
  args: { label: 'Outline', variant: 'outline' },
};

export const Primary: Story = {
  args: { label: 'Primary', variant: 'primary' },
};

export const Secondary: Story = {
  args: { label: 'Secondary', variant: 'secondary' },
};

export const OutlinePrimary: Story = {
  args: { label: 'Outline Primary', variant: 'outline-primary' },
};

export const OutlineSecondary: Story = {
  args: { label: 'Outline Secondary', variant: 'outline-secondary' },
};

export const Selected: Story = {
  args: { label: 'Selected', selected: true },
};

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
};

export const NotSelectable: Story = {
  args: { label: 'Not Selectable', selectable: false },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <Chip label="Default" variant="default" />
        <Chip label="Outline" variant="outline" />
        <Chip label="Primary" variant="primary" />
        <Chip label="Secondary" variant="secondary" />
        <Chip label="Outline Primary" variant="outline-primary" />
        <Chip label="Outline Secondary" variant="outline-secondary" />
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Chip label="Selected" selected />
        <Chip label="Selected Outline" variant="outline" selected />
        <Chip label="Selected Primary" variant="primary" selected />
        <Chip label="Selected Secondary" variant="secondary" selected />
        <Chip label="Selected Outline Primary" variant="outline-primary" selected />
        <Chip label="Selected Outline Secondary" variant="outline-secondary" selected />
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Chip label="Disabled" disabled />
        <Chip label="Not Selectable" selectable={false} />
      </div>
    </div>
  ),
};
