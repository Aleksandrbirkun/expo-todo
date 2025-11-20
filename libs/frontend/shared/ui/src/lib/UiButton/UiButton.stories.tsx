import { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { ChevronDown, Mail, Plus } from "lucide-react"

import { UiButton } from "./UiButton"

const meta: Meta<typeof UiButton> = {
  title: "UI/UiButton",
  component: UiButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
    },
    loading: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <UiButton variant="default">Default</UiButton>
        <UiButton variant="destructive">Destructive</UiButton>
        <UiButton variant="outline">Outline</UiButton>
        <UiButton variant="secondary">Secondary</UiButton>
        <UiButton variant="ghost">Ghost</UiButton>
        <UiButton variant="link">Link</UiButton>
      </div>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <UiButton size="sm">Small</UiButton>
      <UiButton size="default">Default</UiButton>
      <UiButton size="lg">Large</UiButton>
      <UiButton size="icon">
        <Plus className="h-4 w-4" />
      </UiButton>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <UiButton>
        <Mail className="mr-2 h-4 w-4" />
        Login with Email
      </UiButton>
      <UiButton variant="outline">
        Download
        <ChevronDown className="ml-2 h-4 w-4" />
      </UiButton>
    </div>
  ),
}

export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <UiButton loading>Loading</UiButton>
      <UiButton variant="outline" loading>
        Loading
      </UiButton>
      <UiButton variant="secondary" loading>
        Processing
      </UiButton>
    </div>
  ),
}

export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <UiButton disabled>Disabled</UiButton>
      <UiButton variant="outline" disabled>
        Disabled
      </UiButton>
      <UiButton variant="destructive" disabled>
        Disabled
      </UiButton>
    </div>
  ),
}