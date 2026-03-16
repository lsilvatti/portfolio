import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ContactForm } from './ContactForm';
import { fn } from 'storybook/test';

const meta = {
  title: 'Organisms/ContactForm',
  component: ContactForm,
  tags: ['autodocs'],
  args: {
    onShowLinks: fn(),
    onSuccess: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
