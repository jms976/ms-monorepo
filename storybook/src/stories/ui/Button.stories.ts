import { Button, type ButtonProps } from '@common/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  args: {
    content: 'Click Me',
  },
};

export const CustomColor: Story = {
  args: {
    content: 'Custom Color',
    color: '#e91e63', // pink
  },
};

export const Disabled: Story = {
  args: {
    content: 'Disabled',
    disabled: true,
  },
};
