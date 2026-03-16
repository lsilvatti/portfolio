import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CenteredLayout } from './CenteredLayout';
import { Typography } from '@/components/atoms/Typography';
import { Card } from '@/components/atoms/Card';

const meta = {
  title: 'Templates/CenteredLayout',
  component: CenteredLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CenteredLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
 args: {
    children: "", 
  },
  
  render: () => (
    <CenteredLayout>
      <Typography variant="h1">Centered Content</Typography>
      <Typography variant="body">This content is vertically and horizontally centered.</Typography>
    </CenteredLayout>
  ),
};

export const WithCard: Story = {
  render: () => (
    <CenteredLayout>
      <Card>
        <Typography variant="h2">Card Inside Layout</Typography>
        <Typography variant="body" className="mt-2">
          Centered layout wraps any child content in a flex container.
        </Typography>
      </Card>
    </CenteredLayout>
  ),
};
