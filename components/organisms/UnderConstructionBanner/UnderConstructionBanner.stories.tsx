import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UnderConstructionBanner } from './UnderConstructionBanner';

const meta = {
  title: 'Organisms/UnderConstructionBanner',
  component: UnderConstructionBanner,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UnderConstructionBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
