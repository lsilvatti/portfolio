import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    validate: { control: 'select', options: [undefined, 'name', 'email', 'text'] },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Enter text...' },
};

export const WithLabel: Story = {
  args: { label: 'Email', placeholder: 'you@example.com' },
};

export const Required: Story = {
  args: { label: 'Name', required: true, placeholder: 'John Doe' },
};

export const WithHint: Story = {
  args: { label: 'Username', hint: 'Choose a unique username', placeholder: 'john_doe' },
};

export const WithError: Story = {
  args: { label: 'Email', error: 'Please enter a valid email address', placeholder: 'you@example.com' },
};

export const WithSuccess: Story = {
  args: { label: 'Email', success: true, placeholder: 'you@example.com', defaultValue: 'john@example.com' },
};

export const WithCharCount: Story = {
  args: { label: 'Bio', maxLength: 100, showCharCount: true, placeholder: 'Tell us about yourself' },
};

export const WithNameValidation: Story = {
  args: { label: 'First Name', validate: 'name', required: true, placeholder: 'Enter your name' },
};

export const WithEmailValidation: Story = {
  args: { label: 'Email', validate: 'email', placeholder: 'you@example.com' },
};

export const SmallSize: Story = {
  args: { size: 'sm', placeholder: 'Small input' },
};

export const LargeSize: Story = {
  args: { size: 'lg', placeholder: 'Large input' },
};

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true, defaultValue: 'Cannot edit' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input label="Default" placeholder="Default state" />
      <Input label="Error" error="Something went wrong" placeholder="Error state" />
      <Input label="Success" success defaultValue="Looks good!" />
    </div>
  ),
};
