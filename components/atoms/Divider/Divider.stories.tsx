import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Divider } from './Divider';

const meta = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['primary', 'secondary', 'muted', 'border'] },
    size: { control: 'select', options: ['thin', 'medium', 'thick'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    animated: { control: 'boolean' },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = { args: { color: 'primary' } };

export const Secondary: Story = { args: { color: 'secondary' } };

export const Muted: Story = { args: { color: 'muted' } };

export const Thin: Story = { args: { size: 'thin' } };

export const Thick: Story = { args: { size: 'thick' } };

export const Animated: Story = { args: { animated: true, color: 'primary' } };

export const Vertical: Story = {
  args: { orientation: 'vertical', color: 'primary', size: 'medium' },
  decorators: [
    (Story) => (
      <div style={{ height: 100 }}>
        <Story />
      </div>
    ),
  ],
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Divider color="primary" />
      <Divider color="secondary" />
      <Divider color="muted" />
      <Divider color="border" />
    </div>
  ),
};
