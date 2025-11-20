import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { UiLink } from './UiLink';

const meta: Meta<typeof UiLink> = {
  title: 'UI/UiLink',
  component: UiLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'bold', 'semibold', 'ghost', 'button'],
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'destructive', 'inherit'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
    },
    withAnimation: {
      control: { type: 'boolean' },
    },
    href: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof UiLink>;

export default meta;
type Story = StoryObj<typeof UiLink>;

export const Default: Story = {
  args: {
    children: 'Default Link',
    href: '/example',
    withAnimation: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <UiLink variant="default" href="/example">Default</UiLink>
        <UiLink variant="bold" href="/example">Bold</UiLink>
        <UiLink variant="semibold" href="/example">Semibold</UiLink>
        <UiLink variant="ghost" href="/example">Ghost</UiLink>
        <UiLink variant="button" href="/example">Button</UiLink>
      </div>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <UiLink color="default" href="/example">Default Color</UiLink>
        <UiLink color="primary" href="/example">Primary Color</UiLink>
        <UiLink color="secondary" href="/example">Secondary Color</UiLink>
        <UiLink color="destructive" href="/example">Destructive Color</UiLink>
        <UiLink color="inherit" href="/example">Inherit Color</UiLink>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <UiLink size="sm" href="/example">Small</UiLink>
      <UiLink size="default" href="/example">Default</UiLink>
      <UiLink size="lg" href="/example">Large</UiLink>
    </div>
  ),
};

export const WithAndWithoutAnimation: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <UiLink withAnimation={true} href="/example">With Animation</UiLink>
        <UiLink withAnimation={false} href="/example">Without Animation</UiLink>
      </div>
      <p className="text-xs text-muted-foreground">
        Click links to see loading animation (with animation enabled)
      </p>
    </div>
  ),
};

export const ButtonVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium">Button-style Links</h3>
      <div className="flex flex-wrap gap-2">
        <UiLink variant="button" size="sm" href="/example">Small Button</UiLink>
        <UiLink variant="button" size="default" href="/example">Default Button</UiLink>
        <UiLink variant="button" size="lg" href="/example">Large Button</UiLink>
      </div>
    </div>
  ),
};

export const ColoredButtons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium">Colored Button Links</h3>
      <div className="flex flex-wrap gap-2">
        <UiLink variant="button" color="primary" href="/example">Primary Button</UiLink>
        <UiLink variant="button" color="secondary" href="/example">Secondary Button</UiLink>
        <UiLink variant="button" color="destructive" href="/example">Destructive Button</UiLink>
      </div>
    </div>
  ),
};