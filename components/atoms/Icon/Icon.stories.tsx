import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Icon } from './Icon';
import {
  GithubIcon,
  LinkedinIcon,
  EmailIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SunIcon,
  MoonIcon,
  ExternalIcon,
  MenuIcon,
  XIcon,
} from './icons';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {
    icon: GithubIcon,
  },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    icon: { table: { disable: true } },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ExtraSmall: Story = { args: { size: 'xs' } };

export const Small: Story = { args: { size: 'sm' } };

export const Medium: Story = { args: { size: 'md' } };

export const Large: Story = { args: { size: 'lg' } };

export const AllIcons: Story = {
  render: () => {
    const icons = [
      { name: 'GitHub', component: GithubIcon },
      { name: 'LinkedIn', component: LinkedinIcon },
      { name: 'Email', component: EmailIcon },
      { name: 'ArrowLeft', component: ArrowLeftIcon },
      { name: 'ArrowRight', component: ArrowRightIcon },
      { name: 'ChevronLeft', component: ChevronLeftIcon },
      { name: 'ChevronRight', component: ChevronRightIcon },
      { name: 'Sun', component: SunIcon },
      { name: 'Moon', component: MoonIcon },
      { name: 'External', component: ExternalIcon },
      { name: 'Menu', component: MenuIcon },
      { name: 'X', component: XIcon },
    ];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        {icons.map(({ name, component }) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Icon icon={component} size="md" />
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>{name}</span>
          </div>
        ))}
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Icon icon={GithubIcon} size="xs" />
      <Icon icon={GithubIcon} size="sm" />
      <Icon icon={GithubIcon} size="md" />
      <Icon icon={GithubIcon} size="lg" />
    </div>
  ),
};
