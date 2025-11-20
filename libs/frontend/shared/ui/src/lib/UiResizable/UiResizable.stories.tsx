import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { UiResizablePanelGroup, UiResizablePanel, ResizableHandle } from './UiResizable';

const meta: Meta<typeof UiResizablePanelGroup> = {
  title: 'UI/UiResizable',
  component: UiResizablePanelGroup,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="h-64 w-full">
      <UiResizablePanelGroup direction="horizontal">
        <UiResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Left Panel</span>
          </div>
        </UiResizablePanel>
        <ResizableHandle />
        <UiResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Right Panel</span>
          </div>
        </UiResizablePanel>
      </UiResizablePanelGroup>
    </div>
  ),
};

export const WithHandle: Story = {
  render: () => (
    <div className="h-64 w-full">
      <UiResizablePanelGroup direction="horizontal">
        <UiResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6 bg-muted/20">
            <span className="font-semibold">Panel with Handle</span>
          </div>
        </UiResizablePanel>
        <ResizableHandle withHandle />
        <UiResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6 bg-muted/10">
            <span className="font-semibold">Resize using the handle</span>
          </div>
        </UiResizablePanel>
      </UiResizablePanelGroup>
    </div>
  ),
};

export const VerticalLayout: Story = {
  render: () => (
    <div className="h-96 w-full">
      <UiResizablePanelGroup direction="vertical">
        <UiResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6 bg-blue-50">
            <span className="font-semibold">Top Panel</span>
          </div>
        </UiResizablePanel>
        <ResizableHandle withHandle />
        <UiResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6 bg-green-50">
            <span className="font-semibold">Bottom Panel</span>
          </div>
        </UiResizablePanel>
      </UiResizablePanelGroup>
    </div>
  ),
};

export const ThreePanels: Story = {
  render: () => (
    <div className="h-64 w-full">
      <UiResizablePanelGroup direction="horizontal">
        <UiResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center p-6 bg-red-50">
            <span className="font-semibold">Left</span>
          </div>
        </UiResizablePanel>
        <ResizableHandle withHandle />
        <UiResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6 bg-blue-50">
            <span className="font-semibold">Center</span>
          </div>
        </UiResizablePanel>
        <ResizableHandle withHandle />
        <UiResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center p-6 bg-green-50">
            <span className="font-semibold">Right</span>
          </div>
        </UiResizablePanel>
      </UiResizablePanelGroup>
    </div>
  ),
};

export const NestedPanels: Story = {
  render: () => (
    <div className="h-96 w-full">
      <UiResizablePanelGroup direction="horizontal">
        <UiResizablePanel defaultSize={30}>
          <div className="flex h-full items-center justify-center p-6 bg-purple-50">
            <span className="font-semibold">Sidebar</span>
          </div>
        </UiResizablePanel>
        <ResizableHandle withHandle />
        <UiResizablePanel defaultSize={70}>
          <UiResizablePanelGroup direction="vertical">
            <UiResizablePanel defaultSize={60}>
              <div className="flex h-full items-center justify-center p-6 bg-yellow-50">
                <span className="font-semibold">Main Content</span>
              </div>
            </UiResizablePanel>
            <ResizableHandle withHandle />
            <UiResizablePanel defaultSize={40}>
              <div className="flex h-full items-center justify-center p-6 bg-orange-50">
                <span className="font-semibold">Footer Area</span>
              </div>
            </UiResizablePanel>
          </UiResizablePanelGroup>
        </UiResizablePanel>
      </UiResizablePanelGroup>
    </div>
  ),
};

export const WithMinMax: Story = {
  render: () => (
    <div className="h-64 w-full">
      <UiResizablePanelGroup direction="horizontal">
        <UiResizablePanel defaultSize={30} minSize={20} maxSize={60}>
          <div className="flex h-full flex-col items-center justify-center p-6 bg-indigo-50">
            <span className="font-semibold">Constrained Panel</span>
            <span className="text-xs text-muted-foreground mt-2">Min: 20% | Max: 60%</span>
          </div>
        </UiResizablePanel>
        <ResizableHandle withHandle />
        <UiResizablePanel>
          <div className="flex h-full items-center justify-center p-6 bg-teal-50">
            <span className="font-semibold">Flexible Panel</span>
          </div>
        </UiResizablePanel>
      </UiResizablePanelGroup>
    </div>
  ),
};

export const ApplicationLayout: Story = {
  render: () => (
    <div className="h-96 w-full border rounded-lg overflow-hidden">
      <UiResizablePanelGroup direction="horizontal">
        {/* Sidebar */}
        <UiResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <div className="h-full bg-slate-100 p-4">
            <h3 className="font-semibold mb-4">Navigation</h3>
            <nav className="space-y-2">
              <div className="p-2 bg-white rounded shadow-sm">Dashboard</div>
              <div className="p-2 bg-white rounded shadow-sm">Projects</div>
              <div className="p-2 bg-white rounded shadow-sm">Tasks</div>
              <div className="p-2 bg-white rounded shadow-sm">Reports</div>
            </nav>
          </div>
        </UiResizablePanel>
        <ResizableHandle withHandle />
        
        {/* Main Content */}
        <UiResizablePanel defaultSize={60}>
          <UiResizablePanelGroup direction="vertical">
            {/* Header */}
            <UiResizablePanel defaultSize={15} minSize={10} maxSize={20}>
              <div className="h-full bg-white border-b p-4 flex items-center">
                <h1 className="text-xl font-bold">Application Title</h1>
              </div>
            </UiResizablePanel>
            <ResizableHandle />
            
            {/* Content Area */}
            <UiResizablePanel defaultSize={85}>
              <div className="h-full bg-gray-50 p-6 overflow-auto">
                <h2 className="text-lg font-semibold mb-4">Main Content</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h3 className="font-medium">Content Block 1</h3>
                    <p className="text-sm text-gray-600 mt-2">This is some sample content in the main area.</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h3 className="font-medium">Content Block 2</h3>
                    <p className="text-sm text-gray-600 mt-2">More content can be added here.</p>
                  </div>
                </div>
              </div>
            </UiResizablePanel>
          </UiResizablePanelGroup>
        </UiResizablePanel>
        <ResizableHandle withHandle />
        
        {/* Right Panel */}
        <UiResizablePanel defaultSize={20} minSize={15} maxSize={35}>
          <div className="h-full bg-slate-50 p-4">
            <h3 className="font-semibold mb-4">Properties</h3>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded shadow-sm">
                <div className="text-sm font-medium">Property 1</div>
                <div className="text-xs text-gray-500">Value</div>
              </div>
              <div className="p-3 bg-white rounded shadow-sm">
                <div className="text-sm font-medium">Property 2</div>
                <div className="text-xs text-gray-500">Value</div>
              </div>
              <div className="p-3 bg-white rounded shadow-sm">
                <div className="text-sm font-medium">Property 3</div>
                <div className="text-xs text-gray-500">Value</div>
              </div>
            </div>
          </div>
        </UiResizablePanel>
      </UiResizablePanelGroup>
    </div>
  ),
};

export const CodeEditor: Story = {
  render: () => (
    <div className="h-96 w-full border rounded-lg overflow-hidden bg-gray-900">
      <UiResizablePanelGroup direction="horizontal">
        {/* File Explorer */}
        <UiResizablePanel defaultSize={25} minSize={20} maxSize={40}>
          <div className="h-full bg-gray-800 text-white p-4">
            <h3 className="font-semibold mb-4 text-sm">Files</h3>
            <div className="space-y-1 text-sm">
              <div className="p-1 hover:bg-gray-700 rounded cursor-pointer">📁 src</div>
              <div className="p-1 hover:bg-gray-700 rounded cursor-pointer ml-4">📄 index.ts</div>
              <div className="p-1 hover:bg-gray-700 rounded cursor-pointer ml-4">📄 app.ts</div>
              <div className="p-1 hover:bg-gray-700 rounded cursor-pointer">📁 components</div>
              <div className="p-1 hover:bg-gray-700 rounded cursor-pointer ml-4">📄 Button.tsx</div>
              <div className="p-1 hover:bg-gray-700 rounded cursor-pointer">📄 package.json</div>
            </div>
          </div>
        </UiResizablePanel>
        <ResizableHandle withHandle />
        
        {/* Editor */}
        <UiResizablePanel defaultSize={75}>
          <UiResizablePanelGroup direction="vertical">
            <UiResizablePanel defaultSize={70}>
              <div className="h-full bg-gray-900 text-green-400 p-4 font-mono text-sm overflow-auto">
                <div className="space-y-1">
                  <div><span className="text-blue-400">import</span> React <span className="text-blue-400">from</span> <span className="text-yellow-300">'react'</span>;</div>
                  <div></div>
                  <div><span className="text-blue-400">const</span> <span className="text-purple-400">App</span> = () =&gt; &#123;</div>
                  <div className="ml-4"><span className="text-blue-400">return</span> (</div>
                  <div className="ml-8">&lt;<span className="text-red-400">div</span>&gt;</div>
                  <div className="ml-12">&lt;<span className="text-red-400">h1</span>&gt;Hello World&lt;/<span className="text-red-400">h1</span>&gt;</div>
                  <div className="ml-8">&lt;/<span className="text-red-400">div</span>&gt;</div>
                  <div className="ml-4">);</div>
                  <div>&#125;;</div>
                  <div></div>
                  <div><span className="text-blue-400">export default</span> <span className="text-purple-400">App</span>;</div>
                </div>
              </div>
            </UiResizablePanel>
            <ResizableHandle withHandle />
            
            {/* Terminal */}
            <UiResizablePanel defaultSize={30} minSize={20}>
              <div className="h-full bg-black text-white p-4 font-mono text-sm">
                <div className="text-green-400">$ npm run dev</div>
                <div className="text-gray-300 mt-2">
                  <div>Local:   http://localhost:3000</div>
                  <div>ready - started server on 0.0.0.0:3000</div>
                  <div className="text-green-400 mt-2">✓ Ready in 1.2s</div>
                </div>
                <div className="text-green-400 mt-4 flex">
                  <span>$ </span>
                  <div className="w-2 h-4 bg-white ml-1 animate-pulse"></div>
                </div>
              </div>
            </UiResizablePanel>
          </UiResizablePanelGroup>
        </UiResizablePanel>
      </UiResizablePanelGroup>
    </div>
  ),
};

export const ResponsiveBehavior: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Resize panels work on both desktop and mobile. Try resizing the panels below.
      </div>
      <div className="h-48 w-full max-w-md mx-auto border rounded">
        <UiResizablePanelGroup direction="horizontal">
          <UiResizablePanel defaultSize={40}>
            <div className="flex h-full items-center justify-center p-4 bg-blue-50 text-sm">
              <span className="text-center">Responsive<br/>Panel A</span>
            </div>
          </UiResizablePanel>
          <ResizableHandle withHandle />
          <UiResizablePanel defaultSize={60}>
            <div className="flex h-full items-center justify-center p-4 bg-green-50 text-sm">
              <span className="text-center">Responsive<br/>Panel B</span>
            </div>
          </UiResizablePanel>
        </UiResizablePanelGroup>
      </div>
    </div>
  ),
};

export const CollapsiblePanels: Story = {
  render: () => (
    <div className="h-64 w-full">
      <UiResizablePanelGroup direction="horizontal">
        <UiResizablePanel 
          defaultSize={20} 
          minSize={0} 
          collapsible={true}
          collapsedSize={0}
        >
          <div className="flex h-full items-center justify-center p-6 bg-purple-50">
            <span className="font-semibold">Collapsible</span>
          </div>
        </UiResizablePanel>
        <ResizableHandle withHandle />
        <UiResizablePanel defaultSize={60}>
          <div className="flex h-full items-center justify-center p-6 bg-blue-50">
            <span className="font-semibold">Main Content</span>
          </div>
        </UiResizablePanel>
        <ResizableHandle withHandle />
        <UiResizablePanel 
          defaultSize={20} 
          minSize={0} 
          collapsible={true}
          collapsedSize={0}
        >
          <div className="flex h-full items-center justify-center p-6 bg-green-50">
            <span className="font-semibold">Also Collapsible</span>
          </div>
        </UiResizablePanel>
      </UiResizablePanelGroup>
    </div>
  ),
};