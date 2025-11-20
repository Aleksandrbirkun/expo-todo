import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { UiBackButton } from './UiBackButton';

// Mock Next.js router for Storybook
const mockRouter = {
  push: (path: string) => {
    console.log('Navigating to:', path);
    alert(`Would navigate to: ${path}`);
  },
};

// Mock useRouter hook
jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

const meta: Meta<typeof UiBackButton> = {
  title: 'UI/UiBackButton',
  component: UiBackButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A back button component that navigates to a previous page using Next.js router. In Storybook, clicking the button will show an alert instead of actual navigation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default'],
    },
    prevPage: {
      control: { type: 'text' },
      description: 'The URL path to navigate back to',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prevPage: '/dashboard',
  },
};

export const BasicUsage: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Click the button to see navigation action (mocked in Storybook)
      </div>
      <UiBackButton prevPage="/dashboard" />
    </div>
  ),
};

export const InPageHeader: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <header className="flex items-center space-x-4 pb-4 border-b">
        <UiBackButton prevPage="/dashboard" />
        <div>
          <h1 className="text-2xl font-bold">Page Title</h1>
          <p className="text-muted-foreground">Page subtitle or description</p>
        </div>
      </header>
      <div className="space-y-4">
        <p>This demonstrates how the back button looks in a typical page header layout.</p>
        <p>The back button provides a consistent way to navigate back to the previous page.</p>
      </div>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="max-w-md bg-card border rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <UiBackButton prevPage="/settings" />
          <h2 className="text-lg font-semibold">Settings Detail</h2>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-muted-foreground">
          This shows how the back button can be used within a card component
          to provide navigation context.
        </p>
      </div>
    </div>
  ),
};

export const DifferentPages: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Different Navigation Targets</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <UiBackButton prevPage="/dashboard" />
            <span className="text-sm">Back to Dashboard</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <UiBackButton prevPage="/profile" />
            <span className="text-sm">Back to Profile</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <UiBackButton prevPage="/settings" />
            <span className="text-sm">Back to Settings</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <UiBackButton prevPage="/projects/123" />
            <span className="text-sm">Back to Project Detail</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-3">Custom Styling</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <UiBackButton 
              prevPage="/dashboard" 
              className="bg-blue-500 text-white hover:bg-blue-600"
            />
            <span className="text-sm">Custom blue styling</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <UiBackButton 
              prevPage="/dashboard" 
              className="bg-green-500 text-white hover:bg-green-600 p-3"
            />
            <span className="text-sm">Larger green button</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <UiBackButton 
              prevPage="/dashboard" 
              className="border-2 border-red-500 text-red-500 hover:bg-red-50"
            />
            <span className="text-sm">Outlined red styling</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-3">Accessibility Features</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <UiBackButton prevPage="/dashboard" />
            <div className="text-sm">
              <div>✓ Has aria-label="back-button"</div>
              <div>✓ Keyboard accessible</div>
              <div>✓ Focus visible</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const UsageInList: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Usage in Navigation Lists</h3>
      <nav className="space-y-2">
        <div className="flex items-center space-x-2 p-2 hover:bg-muted rounded-lg">
          <UiBackButton prevPage="/dashboard" />
          <span>Dashboard</span>
        </div>
        <div className="flex items-center space-x-2 p-2 hover:bg-muted rounded-lg">
          <UiBackButton prevPage="/profile" />
          <span>Profile Settings</span>
        </div>
        <div className="flex items-center space-x-2 p-2 hover:bg-muted rounded-lg">
          <UiBackButton prevPage="/team" />
          <span>Team Management</span>
        </div>
      </nav>
    </div>
  ),
};