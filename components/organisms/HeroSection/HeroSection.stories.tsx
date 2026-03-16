import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HeroSection } from './HeroSection';

const meta = {
  title: 'Organisms/HeroSection',
  component: HeroSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 24, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
