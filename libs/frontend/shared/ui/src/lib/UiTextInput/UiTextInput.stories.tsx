import { Meta, StoryObj } from "@storybook/react"
import { Mail, Search, Eye, User } from "lucide-react"
import React from "react"

import { UiTextInput } from "./UiTextInput"

const meta: Meta<typeof UiTextInput> = {
  title: "UI/UiTextInput",
  component: UiTextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["default", "small", "large", "huge", "mini"],
    },
    color: {
      control: { type: "select" },
      options: ["default", "primary", "highlight"],
    },
    variant: {
      control: { type: "select" },
      options: ["default", "outlined"],
    },
    borderSize: {
      control: { type: "select" },
      options: ["default", "small", "large", "mini"],
    },
    iconPosition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    fullWidth: {
      control: { type: "boolean" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    fullWidth: false,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <UiTextInput size="mini" placeholder="Mini size" />
      <UiTextInput size="small" placeholder="Small size" />
      <UiTextInput size="default" placeholder="Default size" />
      <UiTextInput size="large" placeholder="Large size" />
      <UiTextInput size="huge" placeholder="Huge size" />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <UiTextInput variant="default" placeholder="Default variant" />
      <UiTextInput variant="outlined" placeholder="Outlined variant" />
    </div>
  ),
}

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <UiTextInput color="default" placeholder="Default color" />
      <UiTextInput color="primary" placeholder="Primary color" />
      <UiTextInput color="highlight" placeholder="Highlight color" />
    </div>
  ),
}

export const WithLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <UiTextInput
        id="email"
        label="Email Address"
        placeholder="Enter your email"
        type="email"
      />
      <UiTextInput
        id="password"
        label="Password"
        placeholder="Enter your password"
        type="password"
      />
      <UiTextInput
        id="name"
        label="Full Name"
        placeholder="Enter your full name"
      />
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <UiTextInput
        placeholder="Search..."
        icon={<Search className="h-4 w-4" />}
        iconPosition="left"
      />
      <UiTextInput
        placeholder="Email address"
        icon={<Mail className="h-4 w-4" />}
        iconPosition="left"
        type="email"
      />
      <UiTextInput
        placeholder="Username"
        icon={<User className="h-4 w-4" />}
        iconPosition="left"
      />
      <UiTextInput
        placeholder="Password"
        icon={<Eye className="h-4 w-4" />}
        iconPosition="right"
        type="password"
      />
    </div>
  ),
}

export const WithErrors: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <UiTextInput
        id="email-error"
        label="Email Address"
        placeholder="Enter your email"
        error="Please enter a valid email address"
        type="email"
      />
      <UiTextInput
        id="password-error"
        label="Password"
        placeholder="Enter your password"
        error="Password must be at least 8 characters"
        type="password"
      />
    </div>
  ),
}

export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <UiTextInput
        placeholder="Disabled input"
        disabled
      />
      <UiTextInput
        label="Disabled with label"
        placeholder="This field is disabled"
        disabled
      />
      <UiTextInput
        placeholder="Disabled with icon"
        icon={<Mail className="h-4 w-4" />}
        disabled
      />
    </div>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <UiTextInput
        fullWidth
        placeholder="This input takes full width"
        label="Full Width Input"
      />
    </div>
  ),
}