import { Meta, StoryObj } from '@storybook/react';

import { UiLoader } from './UiLoader';

const meta: Meta<typeof UiLoader> = {
  title: 'UI/UiLoader',
  component: UiLoader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const InContainer: Story = {
  render: () => (
    <div className="relative w-32 h-32 border rounded-lg bg-muted/20">
      <UiLoader />
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Small container</h3>
        <div className="relative w-16 h-16 border rounded-lg bg-muted/20">
          <UiLoader />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Medium container</h3>
        <div className="relative w-32 h-32 border rounded-lg bg-muted/20">
          <UiLoader />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Large container</h3>
        <div className="relative w-48 h-48 border rounded-lg bg-muted/20">
          <UiLoader />
        </div>
      </div>
    </div>
  ),
};

export const CustomSize: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <UiLoader className="!h-4 !w-4" />
      <UiLoader className="!h-8 !w-8" />
      <UiLoader />
      <UiLoader className="!h-20 !w-20" />
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <UiLoader className="text-red-500" />
      <UiLoader className="text-green-500" />
      <UiLoader className="text-blue-500" />
      <UiLoader className="text-purple-500" />
      <UiLoader className="text-yellow-500" />
    </div>
  ),
};

export const LoadingCard: Story = {
  render: () => (
    <div className="relative w-64 h-40 border rounded-lg p-4 bg-card">
      <div className="space-y-2 opacity-50">
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
      </div>
      <UiLoader />
    </div>
  ),
};