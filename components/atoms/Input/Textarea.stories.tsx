import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Textarea } from './Textarea';

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Write something...' },
};

export const WithLabel: Story = {
  args: { label: 'Message', placeholder: 'Tell us what you think...' },
};

export const Required: Story = {
  args: { label: 'Message', required: true, placeholder: 'This field is required' },
};

export const WithHint: Story = {
  args: { label: 'Description', hint: 'Maximum 500 characters', placeholder: 'Describe your project' },
};

export const WithError: Story = {
  args: { label: 'Message', error: 'Message must be at least 10 characters', placeholder: 'Write...' },
};

export const WithSuccess: Story = {
  args: { label: 'Message', success: true, defaultValue: 'This message is valid and ready to send!' },
};

export const WithCharCount: Story = {
  args: { label: 'Bio', maxLength: 500, showCharCount: true, placeholder: 'Tell us about yourself...' },
};

export const Disabled: Story = {
  args: { label: 'Notes', disabled: true, defaultValue: 'This textarea is disabled' },
};

export const CustomRows: Story = {
  args: { label: 'Long content', rows: 8, placeholder: 'More room to write...' },
};
