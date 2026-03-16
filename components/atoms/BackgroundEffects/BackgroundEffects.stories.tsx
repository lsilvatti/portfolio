import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BackgroundEffects } from './BackgroundEffects';

const meta = {
  title: 'Atoms/BackgroundEffects',
  component: BackgroundEffects,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BackgroundEffects>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <p style={{ fontSize: 24, fontWeight: 600 }}>Background Effects</p>
      </div>
    </div>
  ),
};
