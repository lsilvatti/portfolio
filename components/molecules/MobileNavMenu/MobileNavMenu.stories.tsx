import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MobileNavMenu } from './MobileNavMenu';

const meta = {
  title: 'Molecules/MobileNavMenu',
  component: MobileNavMenu,
  tags: ['autodocs'],
  args: {
    items: [
      { label: 'home', href: '/' },
      { label: 'connect', href: '/connect' },
      { label: 'projects', href: '/projects' },
      { label: 'resume', href: '/resume' },
    ],
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
} satisfies Meta<typeof MobileNavMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
