import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PhoneInput } from './PhoneInput';

const meta = {
  title: 'Atoms/PhoneInput',
  component: PhoneInput,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: 'Phone' },
};

export const Required: Story = {
  args: { label: 'Phone', required: true },
};

export const WithHint: Story = {
  args: { label: 'Phone', hint: 'Include area code' },
};

export const WithError: Story = {
  args: { label: 'Phone', error: 'Invalid phone number' },
};

export const WithSuccess: Story = {
  args: { label: 'Phone', success: true },
};

export const BrazilDefault: Story = {
  args: { label: 'Telefone', defaultCountryCode: 'BR' },
};

export const Disabled: Story = {
  args: { label: 'Phone', disabled: true },
};
