import { Meta, StoryObj } from '@storybook/react';

import { UiSeparator } from './UiSeparator';

const meta: Meta<typeof UiSeparator> = {
  title: 'UI/UiSeparator',
  component: UiSeparator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    decorative: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="w-64">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <UiSeparator {...args} className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <UiSeparator orientation="vertical" />
        <div>Docs</div>
        <UiSeparator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <div>
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Section 1</h4>
          <p className="text-sm text-muted-foreground">
            This is the first section of content.
          </p>
        </div>
        <UiSeparator className="my-4" />
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Section 2</h4>
          <p className="text-sm text-muted-foreground">
            This is the second section of content.
          </p>
        </div>
        <UiSeparator className="my-4" />
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Section 3</h4>
          <p className="text-sm text-muted-foreground">
            This is the third section of content.
          </p>
        </div>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-20 items-center space-x-4 text-sm">
      <div className="flex flex-col">
        <span className="font-medium">Home</span>
        <span className="text-xs text-muted-foreground">Navigate home</span>
      </div>
      <UiSeparator orientation="vertical" />
      <div className="flex flex-col">
        <span className="font-medium">About</span>
        <span className="text-xs text-muted-foreground">Learn more</span>
      </div>
      <UiSeparator orientation="vertical" />
      <div className="flex flex-col">
        <span className="font-medium">Contact</span>
        <span className="text-xs text-muted-foreground">Get in touch</span>
      </div>
      <UiSeparator orientation="vertical" />
      <div className="flex flex-col">
        <span className="font-medium">Support</span>
        <span className="text-xs text-muted-foreground">Need help?</span>
      </div>
    </div>
  ),
};

export const InNavigation: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Horizontal Navigation</h3>
        <nav className="flex items-center space-x-4 text-sm font-medium">
          <a href="#" className="text-foreground hover:text-muted-foreground">Dashboard</a>
          <UiSeparator orientation="vertical" className="h-4" />
          <a href="#" className="text-foreground hover:text-muted-foreground">Projects</a>
          <UiSeparator orientation="vertical" className="h-4" />
          <a href="#" className="text-foreground hover:text-muted-foreground">Team</a>
          <UiSeparator orientation="vertical" className="h-4" />
          <a href="#" className="text-foreground hover:text-muted-foreground">Settings</a>
        </nav>
      </div>
      
      <UiSeparator />
      
      <div>
        <h3 className="text-lg font-medium mb-3">Breadcrumb Navigation</h3>
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">Home</a>
          <span>/</span>
          <a href="#" className="hover:text-foreground">Projects</a>
          <span>/</span>
          <a href="#" className="hover:text-foreground">Web Application</a>
          <span>/</span>
          <span className="text-foreground">Settings</span>
        </nav>
      </div>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="max-w-sm mx-auto bg-card border rounded-lg shadow-sm">
      <div className="p-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Card Header</h3>
          <p className="text-sm text-muted-foreground">
            This is a card with separators.
          </p>
        </div>
      </div>
      <UiSeparator />
      <div className="p-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Total items</span>
            <span className="text-sm">24</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Completed</span>
            <span className="text-sm">18</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Remaining</span>
            <span className="text-sm">6</span>
          </div>
        </div>
      </div>
      <UiSeparator />
      <div className="p-6">
        <button className="w-full bg-primary text-primary-foreground rounded-md py-2 text-sm font-medium hover:bg-primary/90">
          View Details
        </button>
      </div>
    </div>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-2">Default</h4>
        <UiSeparator />
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Thicker</h4>
        <UiSeparator className="h-0.5" />
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Dashed</h4>
        <UiSeparator className="border-dashed border-t border-0 h-0" />
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Dotted</h4>
        <UiSeparator className="border-dotted border-t border-0 h-0" />
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Colored</h4>
        <UiSeparator className="bg-red-200 dark:bg-red-800" />
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">With opacity</h4>
        <UiSeparator className="opacity-50" />
      </div>
    </div>
  ),
};