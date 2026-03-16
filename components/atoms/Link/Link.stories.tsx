import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Link } from './Link';

const meta = {
  title: 'Atoms/Link',
  component: Link,
  tags: ['autodocs'],
  args: {
    children: 'Link text',
    href: '/connect',
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'muted', 'nav', 'unstyled'] },
    external: { control: 'boolean' },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = { args: { variant: 'primary', children: 'Primary link' } };

export const Muted: Story = { args: { variant: 'muted', children: 'Muted link' } };

export const Nav: Story = { args: { variant: 'nav', children: 'connect' } };

export const NavActive: Story = {
  args: { variant: 'nav', children: 'connect' },
};

export const External: Story = {
  args: { external: true, href: 'https://github.com', children: 'External link' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Link href="/a" variant="default">Default</Link>
      <Link href="/b" variant="primary">Primary</Link>
      <Link href="/c" variant="muted">Muted</Link>
      <Link href="/d" variant="nav">Nav</Link>
    </div>
  ),
};
