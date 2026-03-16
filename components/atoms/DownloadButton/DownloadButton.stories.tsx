import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DownloadButton } from './DownloadButton';
import { Download, FileText } from 'lucide-react';

const meta = {
  title: 'Atoms/DownloadButton',
  component: DownloadButton,
  tags: ['autodocs'],
  args: {
    href: '/resume.pdf',
    children: 'Download Resume',
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'outline', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    fullWidth: { control: 'boolean' },
    rounded: { control: 'boolean' },
  },
} satisfies Meta<typeof DownloadButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = { args: { variant: 'outline' } };

export const Rounded: Story = { args: { rounded: true, variant: 'outline' } };

export const CustomIcon: Story = {
  args: { iconLeft: FileText, children: 'Download CV' },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <DownloadButton href="#" variant="primary">Primary</DownloadButton>
      <DownloadButton href="#" variant="outline">Outline</DownloadButton>
      <DownloadButton href="#" variant="ghost">Ghost</DownloadButton>
    </div>
  ),
};
