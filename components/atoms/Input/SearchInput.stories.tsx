import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SearchInput } from './SearchInput';

const meta = {
  title: 'Atoms/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'Buscar projetos...',
    onChange: () => {},
  },
};

export const WithValue: Story = {
  args: {
    value: 'Portfolio',
    placeholder: 'Buscar projetos...',
    onChange: () => {},
  },
};
