import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Header } from './Header';
import { ThemeProvider } from '@/contexts/ThemeContext';

const meta = {
  title: 'Organisms/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ minHeight: 200, paddingTop: 80 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
