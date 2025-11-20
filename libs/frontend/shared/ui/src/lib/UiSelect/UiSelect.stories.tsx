import { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Globe, User, Mail, Phone } from "lucide-react"

import {
  UiSelect,
  UiSelectContent,
  UiSelectGroup,
  UiSelectItem,
  UiSelectLabel,
  UiSelectSeparator,
  UiSelectTrigger,
  UiSelectValue
} from "./UiSelect"

const meta: Meta<typeof UiSelect> = {
  title: "UI/UiSelect",
  component: UiSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <UiSelect>
      <UiSelectTrigger className="w-64">
        <UiSelectValue placeholder="Select a theme" />
      </UiSelectTrigger>
      <UiSelectContent>
        <UiSelectItem value="light">Light</UiSelectItem>
        <UiSelectItem value="dark">Dark</UiSelectItem>
        <UiSelectItem value="system">System</UiSelectItem>
      </UiSelectContent>
    </UiSelect>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <UiSelect>
      <UiSelectTrigger className="w-64">
        <UiSelectValue placeholder="Select a timezone" />
      </UiSelectTrigger>
      <UiSelectContent>
        <UiSelectGroup>
          <UiSelectLabel>North America</UiSelectLabel>
          <UiSelectItem value="est">Eastern Standard Time (EST)</UiSelectItem>
          <UiSelectItem value="cst">Central Standard Time (CST)</UiSelectItem>
          <UiSelectItem value="mst">Mountain Standard Time (MST)</UiSelectItem>
          <UiSelectItem value="pst">Pacific Standard Time (PST)</UiSelectItem>
        </UiSelectGroup>
        <UiSelectSeparator />
        <UiSelectGroup>
          <UiSelectLabel>Europe</UiSelectLabel>
          <UiSelectItem value="utc">Coordinated Universal Time (UTC)</UiSelectItem>
          <UiSelectItem value="cet">Central European Time (CET)</UiSelectItem>
          <UiSelectItem value="eet">Eastern European Time (EET)</UiSelectItem>
        </UiSelectGroup>
      </UiSelectContent>
    </UiSelect>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <UiSelect>
      <UiSelectTrigger className="w-64">
        <UiSelectValue placeholder="Choose contact method" />
      </UiSelectTrigger>
      <UiSelectContent>
        <UiSelectItem value="email">
          <Mail className="mr-2 h-4 w-4" />
          Email
        </UiSelectItem>
        <UiSelectItem value="phone">
          <Phone className="mr-2 h-4 w-4" />
          Phone
        </UiSelectItem>
        <UiSelectItem value="website">
          <Globe className="mr-2 h-4 w-4" />
          Website
        </UiSelectItem>
        <UiSelectItem value="person">
          <User className="mr-2 h-4 w-4" />
          In Person
        </UiSelectItem>
      </UiSelectContent>
    </UiSelect>
  ),
}

export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <UiSelect disabled>
        <UiSelectTrigger className="w-64">
          <UiSelectValue placeholder="Disabled select" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem value="option1">Option 1</UiSelectItem>
          <UiSelectItem value="option2">Option 2</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
      
      <UiSelect>
        <UiSelectTrigger className="w-64">
          <UiSelectValue placeholder="Select with disabled items" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem value="available">Available Option</UiSelectItem>
          <UiSelectItem value="disabled" disabled>
            Disabled Option
          </UiSelectItem>
          <UiSelectItem value="another">Another Available</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
    </div>
  ),
}

export const LongList: Story = {
  render: () => (
    <UiSelect>
      <UiSelectTrigger className="w-64">
        <UiSelectValue placeholder="Choose a country" />
      </UiSelectTrigger>
      <UiSelectContent>
        <UiSelectItem value="us">United States</UiSelectItem>
        <UiSelectItem value="ca">Canada</UiSelectItem>
        <UiSelectItem value="mx">Mexico</UiSelectItem>
        <UiSelectItem value="gb">United Kingdom</UiSelectItem>
        <UiSelectItem value="fr">France</UiSelectItem>
        <UiSelectItem value="de">Germany</UiSelectItem>
        <UiSelectItem value="it">Italy</UiSelectItem>
        <UiSelectItem value="es">Spain</UiSelectItem>
        <UiSelectItem value="jp">Japan</UiSelectItem>
        <UiSelectItem value="kr">South Korea</UiSelectItem>
        <UiSelectItem value="cn">China</UiSelectItem>
        <UiSelectItem value="in">India</UiSelectItem>
        <UiSelectItem value="au">Australia</UiSelectItem>
        <UiSelectItem value="br">Brazil</UiSelectItem>
        <UiSelectItem value="ar">Argentina</UiSelectItem>
        <UiSelectItem value="za">South Africa</UiSelectItem>
      </UiSelectContent>
    </UiSelect>
  ),
}

export const SmallSize: Story = {
  render: () => (
    <UiSelect>
      <UiSelectTrigger className="w-48 h-8">
        <UiSelectValue placeholder="Small select" />
      </UiSelectTrigger>
      <UiSelectContent>
        <UiSelectItem value="xs">Extra Small</UiSelectItem>
        <UiSelectItem value="sm">Small</UiSelectItem>
        <UiSelectItem value="md">Medium</UiSelectItem>
        <UiSelectItem value="lg">Large</UiSelectItem>
      </UiSelectContent>
    </UiSelect>
  ),
}