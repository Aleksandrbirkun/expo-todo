import { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"

import { UiSwitch } from "./UiSwitch"
import { UiLabel } from "../UiLabel"

const meta: Meta<typeof UiSwitch> = {
  title: "UI/UiSwitch",
  component: UiSwitch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    checked: {
      control: { type: "boolean" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const CheckedStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center space-x-2">
        <UiSwitch id="unchecked" />
        <UiLabel htmlFor="unchecked">Unchecked switch</UiLabel>
      </div>
      <div className="flex items-center space-x-2">
        <UiSwitch id="checked" defaultChecked />
        <UiLabel htmlFor="checked">Checked switch</UiLabel>
      </div>
    </div>
  ),
}

export const WithLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <UiSwitch id="notifications" />
        <UiLabel htmlFor="notifications">Enable notifications</UiLabel>
      </div>
      <div className="flex items-center space-x-2">
        <UiSwitch id="marketing" />
        <UiLabel htmlFor="marketing">Marketing emails</UiLabel>
      </div>
      <div className="flex items-center space-x-2">
        <UiSwitch id="analytics" defaultChecked />
        <UiLabel htmlFor="analytics">Analytics cookies</UiLabel>
      </div>
    </div>
  ),
}

export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <UiSwitch id="disabled-off" disabled />
        <UiLabel htmlFor="disabled-off" className="text-muted-foreground">
          Disabled (off)
        </UiLabel>
      </div>
      <div className="flex items-center space-x-2">
        <UiSwitch id="disabled-on" disabled defaultChecked />
        <UiLabel htmlFor="disabled-on" className="text-muted-foreground">
          Disabled (on)
        </UiLabel>
      </div>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      marketing: false,
      analytics: true,
      cookies: false,
    });

    const handleChange = (key: keyof typeof settings) => (checked: boolean) => {
      setSettings(prev => ({
        ...prev,
        [key]: checked,
      }));
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Privacy Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <UiLabel htmlFor="notifications-interactive" className="text-base">
                Push Notifications
              </UiLabel>
              <p className="text-sm text-muted-foreground">
                Receive push notifications about important updates
              </p>
            </div>
            <UiSwitch
              id="notifications-interactive"
              checked={settings.notifications}
              onCheckedChange={handleChange('notifications')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <UiLabel htmlFor="marketing-interactive" className="text-base">
                Marketing Emails
              </UiLabel>
              <p className="text-sm text-muted-foreground">
                Receive emails about new products and features
              </p>
            </div>
            <UiSwitch
              id="marketing-interactive"
              checked={settings.marketing}
              onCheckedChange={handleChange('marketing')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <UiLabel htmlFor="analytics-interactive" className="text-base">
                Analytics
              </UiLabel>
              <p className="text-sm text-muted-foreground">
                Help us improve our products with usage analytics
              </p>
            </div>
            <UiSwitch
              id="analytics-interactive"
              checked={settings.analytics}
              onCheckedChange={handleChange('analytics')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <UiLabel htmlFor="cookies-interactive" className="text-base">
                Functional Cookies
              </UiLabel>
              <p className="text-sm text-muted-foreground">
                Enable cookies for better user experience
              </p>
            </div>
            <UiSwitch
              id="cookies-interactive"
              checked={settings.cookies}
              onCheckedChange={handleChange('cookies')}
            />
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium">Current Settings:</h4>
          <div className="text-xs text-muted-foreground mt-1">
            {Object.entries(settings)
              .filter(([, value]) => value)
              .map(([key]) => key)
              .join(', ') || 'None enabled'}
          </div>
        </div>
      </div>
    );
  },
}

export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      terms: false,
      newsletter: false,
      updates: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      alert(`Form data: ${JSON.stringify(formData, null, 2)}`);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6 max-w-sm">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <UiSwitch
              id="terms-form"
              checked={formData.terms}
              onCheckedChange={(checked) =>
                setFormData(prev => ({ ...prev, terms: checked }))
              }
              required
            />
            <UiLabel htmlFor="terms-form">
              I agree to the terms and conditions *
            </UiLabel>
          </div>
          
          <div className="flex items-center space-x-2">
            <UiSwitch
              id="newsletter-form"
              checked={formData.newsletter}
              onCheckedChange={(checked) =>
                setFormData(prev => ({ ...prev, newsletter: checked }))
              }
            />
            <UiLabel htmlFor="newsletter-form">
              Subscribe to newsletter
            </UiLabel>
          </div>
          
          <div className="flex items-center space-x-2">
            <UiSwitch
              id="updates-form"
              checked={formData.updates}
              onCheckedChange={(checked) =>
                setFormData(prev => ({ ...prev, updates: checked }))
              }
            />
            <UiLabel htmlFor="updates-form">
              Receive product updates
            </UiLabel>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={!formData.terms}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Form
        </button>
      </form>
    );
  },
}