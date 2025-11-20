import { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"

import { UiRadioGroup, UiRadioGroupItem } from "./UiRadioGroup"
import { UiLabel } from "../UiLabel"

const meta: Meta<typeof UiRadioGroup> = {
  title: "UI/UiRadioGroup",
  component: UiRadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "compact", "spacious"],
    },
    orientation: {
      control: { type: "select" },
      options: ["vertical", "horizontal"],
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <UiRadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <UiRadioGroupItem value="option-one" id="option-one" />
        <UiLabel htmlFor="option-one">Option One</UiLabel>
      </div>
      <div className="flex items-center space-x-2">
        <UiRadioGroupItem value="option-two" id="option-two" />
        <UiLabel htmlFor="option-two">Option Two</UiLabel>
      </div>
      <div className="flex items-center space-x-2">
        <UiRadioGroupItem value="option-three" id="option-three" />
        <UiLabel htmlFor="option-three">Option Three</UiLabel>
      </div>
    </UiRadioGroup>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-3">Default spacing</h3>
        <UiRadioGroup variant="default" defaultValue="default-1">
          <div className="flex items-center space-x-2">
            <UiRadioGroupItem value="default-1" id="default-1" />
            <UiLabel htmlFor="default-1">Option One</UiLabel>
          </div>
          <div className="flex items-center space-x-2">
            <UiRadioGroupItem value="default-2" id="default-2" />
            <UiLabel htmlFor="default-2">Option Two</UiLabel>
          </div>
        </UiRadioGroup>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-3">Compact spacing</h3>
        <UiRadioGroup variant="compact" defaultValue="compact-1">
          <div className="flex items-center space-x-2">
            <UiRadioGroupItem value="compact-1" id="compact-1" />
            <UiLabel htmlFor="compact-1">Option One</UiLabel>
          </div>
          <div className="flex items-center space-x-2">
            <UiRadioGroupItem value="compact-2" id="compact-2" />
            <UiLabel htmlFor="compact-2">Option Two</UiLabel>
          </div>
        </UiRadioGroup>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-3">Spacious spacing</h3>
        <UiRadioGroup variant="spacious" defaultValue="spacious-1">
          <div className="flex items-center space-x-2">
            <UiRadioGroupItem value="spacious-1" id="spacious-1" />
            <UiLabel htmlFor="spacious-1">Option One</UiLabel>
          </div>
          <div className="flex items-center space-x-2">
            <UiRadioGroupItem value="spacious-2" id="spacious-2" />
            <UiLabel htmlFor="spacious-2">Option Two</UiLabel>
          </div>
        </UiRadioGroup>
      </div>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Small size</h3>
        <UiRadioGroup defaultValue="small-1">
          <div className="flex items-center space-x-2">
            <UiRadioGroupItem value="small-1" id="small-1" size="sm" />
            <UiLabel htmlFor="small-1">Small Option</UiLabel>
          </div>
          <div className="flex items-center space-x-2">
            <UiRadioGroupItem value="small-2" id="small-2" size="sm" />
            <UiLabel htmlFor="small-2">Another Small</UiLabel>
          </div>
        </UiRadioGroup>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-3">Default size</h3>
        <UiRadioGroup defaultValue="default-size-1">
          <div className="flex items-center space-x-2">
            <UiRadioGroupItem value="default-size-1" id="default-size-1" />
            <UiLabel htmlFor="default-size-1">Default Option</UiLabel>
          </div>
          <div className="flex items-center space-x-2">
            <UiRadioGroupItem value="default-size-2" id="default-size-2" />
            <UiLabel htmlFor="default-size-2">Another Default</UiLabel>
          </div>
        </UiRadioGroup>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-3">Large size</h3>
        <UiRadioGroup defaultValue="large-1">
          <div className="flex items-center space-x-2">
            <UiRadioGroupItem value="large-1" id="large-1" size="lg" />
            <UiLabel htmlFor="large-1">Large Option</UiLabel>
          </div>
          <div className="flex items-center space-x-2">
            <UiRadioGroupItem value="large-2" id="large-2" size="lg" />
            <UiLabel htmlFor="large-2">Another Large</UiLabel>
          </div>
        </UiRadioGroup>
      </div>
    </div>
  ),
}

export const Orientations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-3">Vertical (default)</h3>
        <UiRadioGroup orientation="vertical" defaultValue="vertical-1">
          <div className="flex items-center space-x-2">
            <UiRadioGroupItem value="vertical-1" id="vertical-1" />
            <UiLabel htmlFor="vertical-1">Option One</UiLabel>
          </div>
          <div className="flex items-center space-x-2">
            <UiRadioGroupItem value="vertical-2" id="vertical-2" />
            <UiLabel htmlFor="vertical-2">Option Two</UiLabel>
          </div>
        </UiRadioGroup>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-3">Horizontal</h3>
        <UiRadioGroup orientation="horizontal" defaultValue="horizontal-1">
          <div className="flex items-center space-x-2">
            <UiRadioGroupItem value="horizontal-1" id="horizontal-1" />
            <UiLabel htmlFor="horizontal-1">Option One</UiLabel>
          </div>
          <div className="flex items-center space-x-2">
            <UiRadioGroupItem value="horizontal-2" id="horizontal-2" />
            <UiLabel htmlFor="horizontal-2">Option Two</UiLabel>
          </div>
        </UiRadioGroup>
      </div>
    </div>
  ),
}

export const DisabledStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Disabled group</h3>
        <UiRadioGroup disabled defaultValue="disabled-1">
          <div className="flex items-center space-x-2">
            <UiRadioGroupItem value="disabled-1" id="disabled-1" />
            <UiLabel htmlFor="disabled-1" className="text-muted-foreground">
              Disabled Option One
            </UiLabel>
          </div>
          <div className="flex items-center space-x-2">
            <UiRadioGroupItem value="disabled-2" id="disabled-2" />
            <UiLabel htmlFor="disabled-2" className="text-muted-foreground">
              Disabled Option Two
            </UiLabel>
          </div>
        </UiRadioGroup>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-3">Individual disabled items</h3>
        <UiRadioGroup defaultValue="enabled-1">
          <div className="flex items-center space-x-2">
            <UiRadioGroupItem value="enabled-1" id="enabled-1" />
            <UiLabel htmlFor="enabled-1">Available Option</UiLabel>
          </div>
          <div className="flex items-center space-x-2">
            <UiRadioGroupItem value="disabled-item" id="disabled-item" disabled />
            <UiLabel htmlFor="disabled-item" className="text-muted-foreground">
              Disabled Option
            </UiLabel>
          </div>
          <div className="flex items-center space-x-2">
            <UiRadioGroupItem value="enabled-2" id="enabled-2" />
            <UiLabel htmlFor="enabled-2">Another Available</UiLabel>
          </div>
        </UiRadioGroup>
      </div>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('option-a');
    
    const options = [
      { value: 'option-a', label: 'Option A', description: 'The first choice' },
      { value: 'option-b', label: 'Option B', description: 'The second choice' },
      { value: 'option-c', label: 'Option C', description: 'The third choice' },
    ];

    return (
      <div className="space-y-4">
        <UiRadioGroup value={selectedValue} onValueChange={setSelectedValue}>
          {options.map((option) => (
            <div key={option.value} className="flex items-start space-x-2">
              <UiRadioGroupItem 
                value={option.value} 
                id={option.value}
                className="mt-1" 
              />
              <div className="flex flex-col">
                <UiLabel htmlFor={option.value} className="font-medium">
                  {option.label}
                </UiLabel>
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </UiRadioGroup>
        <div className="text-sm text-muted-foreground">
          Selected: {selectedValue}
        </div>
      </div>
    );
  },
}