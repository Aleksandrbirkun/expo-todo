import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { UiThemeSwitch } from './UiThemeSwitch';

const meta: Meta<typeof UiThemeSwitch> = {
  title: 'UI/UiThemeSwitch',
  component: UiThemeSwitch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
    },
    themeSwitchVariant: {
      control: { type: 'select' },
      options: ['default'],
    },
    sunIconVariant: {
      control: { type: 'select' },
      options: ['default'],
    },
    thumbVariant: {
      control: { type: 'select' },
      options: ['default'],
    },
    moonIconVariant: {
      control: { type: 'select' },
      options: ['default'],
    },
  },
} satisfies Meta<typeof UiThemeSwitch>;

export default meta;
type Story = StoryObj<typeof UiThemeSwitch>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked || false);
    return (
      <UiThemeSwitch
        {...args}
        checked={checked}
        onCheckedChange={setChecked}
      />
    );
  },
  args: {
    checked: false,
  },
};

export const LightMode: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex flex-col gap-4 items-center">
        <p className="text-sm text-muted-foreground">Light Mode (Sun Icon Active)</p>
        <UiThemeSwitch
          checked={checked}
          onCheckedChange={setChecked}
        />
      </div>
    );
  },
};

export const DarkMode: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <div className="flex flex-col gap-4 items-center">
        <p className="text-sm text-muted-foreground">Dark Mode (Moon Icon Active)</p>
        <UiThemeSwitch
          checked={checked}
          onCheckedChange={setChecked}
        />
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex flex-col gap-4 items-center">
        <p className="text-sm text-muted-foreground">
          Current mode: {checked ? 'Dark' : 'Light'}
        </p>
        <UiThemeSwitch
          checked={checked}
          onCheckedChange={setChecked}
        />
        <p className="text-xs text-muted-foreground">
          Click to toggle between light and dark modes
        </p>
      </div>
    );
  },
};