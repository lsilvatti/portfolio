import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TypewriterText } from './TypewriterText';

const meta = {
  title: 'Molecules/TypewriterText',
  component: TypewriterText,
  tags: ['autodocs'],
  args: {
    prefix: "I'm a Frontend Engineer who builds ",
    words: ['scalable products.', 'fluid interfaces.', 'user-centric solutions.', 'business value.'],
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'body', 'small'],
    },
  },
} satisfies Meta<typeof TypewriterText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AsHeading: Story = {
  args: {
    variant: 'h3',
    prefix: 'We create ',
    words: ['innovation.', 'impact.', 'results.'],
  },
};

export const WithoutPrefix: Story = {
  args: {
    prefix: '',
    words: ['Hello!', 'Olá!', 'Bonjour!', 'Hallo!'],
    variant: 'h2',
  },
};
