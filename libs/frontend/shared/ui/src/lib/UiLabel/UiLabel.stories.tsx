import { Meta, StoryObj } from '@storybook/react';

import { UiLabel } from './UiLabel';

const meta: Meta<typeof UiLabel> = {
  title: 'UI/UiLabel',
  component: UiLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'small', 'large'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Label',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <UiLabel variant="small">Small Label</UiLabel>
        <div className="text-xs text-muted-foreground">Variant: small</div>
      </div>
      
      <div className="space-y-2">
        <UiLabel variant="default">Default Label</UiLabel>
        <div className="text-xs text-muted-foreground">Variant: default</div>
      </div>
      
      <div className="space-y-2">
        <UiLabel variant="large">Large Label</UiLabel>
        <div className="text-xs text-muted-foreground">Variant: large</div>
      </div>
    </div>
  ),
};

export const WithFormElements: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center space-x-2">
        <input type="checkbox" id="terms" className="rounded border-gray-300" />
        <UiLabel htmlFor="terms">Accept terms and conditions</UiLabel>
      </div>
      
      <div className="space-y-2">
        <UiLabel htmlFor="email">Email Address</UiLabel>
        <input 
          type="email" 
          id="email" 
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Enter your email"
        />
      </div>
      
      <div className="space-y-2">
        <UiLabel htmlFor="message" variant="large">Message</UiLabel>
        <textarea 
          id="message"
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Type your message here"
        />
      </div>
    </div>
  ),
};

export const RequiredLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <UiLabel htmlFor="required-field">
          Required Field
          <span className="text-red-500 ml-1">*</span>
        </UiLabel>
        <input 
          type="text" 
          id="required-field" 
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        />
      </div>
      
      <div className="space-y-2">
        <UiLabel htmlFor="optional-field" variant="small">
          Optional Field
          <span className="text-muted-foreground ml-1">(optional)</span>
        </UiLabel>
        <input 
          type="text" 
          id="optional-field" 
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <UiLabel htmlFor="disabled-input" className="opacity-50">
          Disabled Input
        </UiLabel>
        <input 
          type="text" 
          id="disabled-input" 
          disabled
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="This input is disabled"
        />
      </div>
      
      <div className="flex items-center space-x-2 opacity-50">
        <input type="checkbox" id="disabled-checkbox" disabled className="rounded border-gray-300" />
        <UiLabel htmlFor="disabled-checkbox">Disabled checkbox with label</UiLabel>
      </div>
    </div>
  ),
};

export const LabelTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <UiLabel>Simple text label</UiLabel>
      </div>
      
      <div className="space-y-2">
        <UiLabel>
          Label with <strong>bold text</strong> and <em>italic text</em>
        </UiLabel>
      </div>
      
      <div className="space-y-2">
        <UiLabel className="flex items-center gap-2">
          Label with icon
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </UiLabel>
      </div>
      
      <div className="space-y-2">
        <UiLabel>
          Multi-line label that can wrap to multiple lines when the text is very long and exceeds the container width
        </UiLabel>
      </div>
    </div>
  ),
};