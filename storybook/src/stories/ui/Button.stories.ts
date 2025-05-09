import { Meta, StoryObj } from '@storybook/react';
import { Button, type ButtonProps } from '@common/ui';

const meta: Meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    content: 'Click me',
  },
  argTypes: {
    color: { control: 'color' },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const CustomColor: Story = {
  args: {
    color: '#FF6347', // Tomato
  },
};

export const WithTabIndex: Story = {
  args: {
    tabIndex: 2,
  },
};
