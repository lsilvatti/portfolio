import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NavMenu } from './NavMenu';

const meta = {
  title: 'Molecules/NavMenu',
  component: NavMenu,
  tags: ['autodocs'],
  args: {
    items: [
      { label: 'home', href: '/' },
      { label: 'connect', href: '/connect' },
      { label: 'projects', href: '/projects' },
      { label: 'resume', href: '/resume' },
    ],
  },
} satisfies Meta<typeof NavMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoItems: Story = {
  args: {
    items: [
      { label: 'connect', href: '/connect' },
      { label: 'resume', href: '/resume' },
    ],
  },
};

export const CustomDelay: Story = {
  args: { baseDelay: 0, incrementDelay: 0.2 },
};
