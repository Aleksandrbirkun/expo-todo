import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Slash, Home, FolderOpen } from 'lucide-react';

import {
  UiBreadcrumb,
  UiBreadcrumbList,
  UiBreadcrumbItem,
  UiBreadcrumbLink,
  UiBreadcrumbPage,
  UiBreadcrumbSeparator,
  UiBreadcrumbEllipsis,
} from './UiBreadcrumb';

const meta: Meta<typeof UiBreadcrumb> = {
  title: 'UI/UiBreadcrumb',
  component: UiBreadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UiBreadcrumb>
      <UiBreadcrumbList>
        <UiBreadcrumbItem>
          <UiBreadcrumbLink href="/">Home</UiBreadcrumbLink>
        </UiBreadcrumbItem>
        <UiBreadcrumbSeparator />
        <UiBreadcrumbItem>
          <UiBreadcrumbPage>Current Page</UiBreadcrumbPage>
        </UiBreadcrumbItem>
      </UiBreadcrumbList>
    </UiBreadcrumb>
  ),
};

export const BasicNavigation: Story = {
  render: () => (
    <UiBreadcrumb>
      <UiBreadcrumbList>
        <UiBreadcrumbItem>
          <UiBreadcrumbLink href="/">Home</UiBreadcrumbLink>
        </UiBreadcrumbItem>
        <UiBreadcrumbSeparator />
        <UiBreadcrumbItem>
          <UiBreadcrumbLink href="/products">Products</UiBreadcrumbLink>
        </UiBreadcrumbItem>
        <UiBreadcrumbSeparator />
        <UiBreadcrumbItem>
          <UiBreadcrumbLink href="/products/laptops">Laptops</UiBreadcrumbLink>
        </UiBreadcrumbItem>
        <UiBreadcrumbSeparator />
        <UiBreadcrumbItem>
          <UiBreadcrumbPage>MacBook Pro</UiBreadcrumbPage>
        </UiBreadcrumbItem>
      </UiBreadcrumbList>
    </UiBreadcrumb>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <UiBreadcrumb>
      <UiBreadcrumbList>
        <UiBreadcrumbItem>
          <UiBreadcrumbLink href="/" className="flex items-center gap-2">
            <Home className="size-4" />
            Home
          </UiBreadcrumbLink>
        </UiBreadcrumbItem>
        <UiBreadcrumbSeparator />
        <UiBreadcrumbItem>
          <UiBreadcrumbLink href="/documents" className="flex items-center gap-2">
            <FolderOpen className="size-4" />
            Documents
          </UiBreadcrumbLink>
        </UiBreadcrumbItem>
        <UiBreadcrumbSeparator />
        <UiBreadcrumbItem>
          <UiBreadcrumbPage>Project Files</UiBreadcrumbPage>
        </UiBreadcrumbItem>
      </UiBreadcrumbList>
    </UiBreadcrumb>
  ),
};

export const CustomSeparator: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Slash Separator</h4>
        <UiBreadcrumb>
          <UiBreadcrumbList>
            <UiBreadcrumbItem>
              <UiBreadcrumbLink href="/">Home</UiBreadcrumbLink>
            </UiBreadcrumbItem>
            <UiBreadcrumbSeparator>
              <Slash className="size-4" />
            </UiBreadcrumbSeparator>
            <UiBreadcrumbItem>
              <UiBreadcrumbLink href="/category">Category</UiBreadcrumbLink>
            </UiBreadcrumbItem>
            <UiBreadcrumbSeparator>
              <Slash className="size-4" />
            </UiBreadcrumbSeparator>
            <UiBreadcrumbItem>
              <UiBreadcrumbPage>Item</UiBreadcrumbPage>
            </UiBreadcrumbItem>
          </UiBreadcrumbList>
        </UiBreadcrumb>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Bullet Separator</h4>
        <UiBreadcrumb>
          <UiBreadcrumbList>
            <UiBreadcrumbItem>
              <UiBreadcrumbLink href="/">Home</UiBreadcrumbLink>
            </UiBreadcrumbItem>
            <UiBreadcrumbSeparator>•</UiBreadcrumbSeparator>
            <UiBreadcrumbItem>
              <UiBreadcrumbLink href="/category">Category</UiBreadcrumbLink>
            </UiBreadcrumbItem>
            <UiBreadcrumbSeparator>•</UiBreadcrumbSeparator>
            <UiBreadcrumbItem>
              <UiBreadcrumbPage>Item</UiBreadcrumbPage>
            </UiBreadcrumbItem>
          </UiBreadcrumbList>
        </UiBreadcrumb>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Greater Than Separator</h4>
        <UiBreadcrumb>
          <UiBreadcrumbList>
            <UiBreadcrumbItem>
              <UiBreadcrumbLink href="/">Home</UiBreadcrumbLink>
            </UiBreadcrumbItem>
            <UiBreadcrumbSeparator>&gt;</UiBreadcrumbSeparator>
            <UiBreadcrumbItem>
              <UiBreadcrumbLink href="/category">Category</UiBreadcrumbLink>
            </UiBreadcrumbItem>
            <UiBreadcrumbSeparator>&gt;</UiBreadcrumbSeparator>
            <UiBreadcrumbItem>
              <UiBreadcrumbPage>Item</UiBreadcrumbPage>
            </UiBreadcrumbItem>
          </UiBreadcrumbList>
        </UiBreadcrumb>
      </div>
    </div>
  ),
};

export const WithEllipsis: Story = {
  render: () => (
    <UiBreadcrumb>
      <UiBreadcrumbList>
        <UiBreadcrumbItem>
          <UiBreadcrumbLink href="/">Home</UiBreadcrumbLink>
        </UiBreadcrumbItem>
        <UiBreadcrumbSeparator />
        <UiBreadcrumbItem>
          <UiBreadcrumbEllipsis />
        </UiBreadcrumbItem>
        <UiBreadcrumbSeparator />
        <UiBreadcrumbItem>
          <UiBreadcrumbLink href="/category">Category</UiBreadcrumbLink>
        </UiBreadcrumbItem>
        <UiBreadcrumbSeparator />
        <UiBreadcrumbItem>
          <UiBreadcrumbLink href="/subcategory">Subcategory</UiBreadcrumbLink>
        </UiBreadcrumbItem>
        <UiBreadcrumbSeparator />
        <UiBreadcrumbItem>
          <UiBreadcrumbPage>Current Item</UiBreadcrumbPage>
        </UiBreadcrumbItem>
      </UiBreadcrumbList>
    </UiBreadcrumb>
  ),
};

export const LongBreadcrumb: Story = {
  render: () => (
    <div className="max-w-md">
      <UiBreadcrumb>
        <UiBreadcrumbList>
          <UiBreadcrumbItem>
            <UiBreadcrumbLink href="/">Home</UiBreadcrumbLink>
          </UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem>
            <UiBreadcrumbLink href="/products">Products & Services</UiBreadcrumbLink>
          </UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem>
            <UiBreadcrumbLink href="/products/electronics">Electronics & Gadgets</UiBreadcrumbLink>
          </UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem>
            <UiBreadcrumbLink href="/products/electronics/computers">Computer Systems</UiBreadcrumbLink>
          </UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem>
            <UiBreadcrumbPage>Gaming Laptops with High Performance</UiBreadcrumbPage>
          </UiBreadcrumbItem>
        </UiBreadcrumbList>
      </UiBreadcrumb>
    </div>
  ),
};

export const InteractiveBreadcrumb: Story = {
  render: () => {
    const handleClick = (item: string) => {
      alert(`Navigating to: ${item}`);
    };

    return (
      <UiBreadcrumb>
        <UiBreadcrumbList>
          <UiBreadcrumbItem>
            <UiBreadcrumbLink 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                handleClick('Home');
              }}
            >
              Home
            </UiBreadcrumbLink>
          </UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem>
            <UiBreadcrumbLink 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleClick('Dashboard');
              }}
            >
              Dashboard
            </UiBreadcrumbLink>
          </UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem>
            <UiBreadcrumbLink 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleClick('Settings');
              }}
            >
              Settings
            </UiBreadcrumbLink>
          </UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem>
            <UiBreadcrumbPage>Profile</UiBreadcrumbPage>
          </UiBreadcrumbItem>
        </UiBreadcrumbList>
      </UiBreadcrumb>
    );
  },
};

export const ApplicationExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-2">E-commerce</h4>
        <UiBreadcrumb>
          <UiBreadcrumbList>
            <UiBreadcrumbItem>
              <UiBreadcrumbLink href="/">Store</UiBreadcrumbLink>
            </UiBreadcrumbItem>
            <UiBreadcrumbSeparator />
            <UiBreadcrumbItem>
              <UiBreadcrumbLink href="/men">Men</UiBreadcrumbLink>
            </UiBreadcrumbItem>
            <UiBreadcrumbSeparator />
            <UiBreadcrumbItem>
              <UiBreadcrumbLink href="/men/clothing">Clothing</UiBreadcrumbLink>
            </UiBreadcrumbItem>
            <UiBreadcrumbSeparator />
            <UiBreadcrumbItem>
              <UiBreadcrumbLink href="/men/clothing/shirts">Shirts</UiBreadcrumbLink>
            </UiBreadcrumbItem>
            <UiBreadcrumbSeparator />
            <UiBreadcrumbItem>
              <UiBreadcrumbPage>Cotton Polo Shirt</UiBreadcrumbPage>
            </UiBreadcrumbItem>
          </UiBreadcrumbList>
        </UiBreadcrumb>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Documentation</h4>
        <UiBreadcrumb>
          <UiBreadcrumbList>
            <UiBreadcrumbItem>
              <UiBreadcrumbLink href="/">Docs</UiBreadcrumbLink>
            </UiBreadcrumbItem>
            <UiBreadcrumbSeparator />
            <UiBreadcrumbItem>
              <UiBreadcrumbLink href="/components">Components</UiBreadcrumbLink>
            </UiBreadcrumbItem>
            <UiBreadcrumbSeparator />
            <UiBreadcrumbItem>
              <UiBreadcrumbLink href="/components/navigation">Navigation</UiBreadcrumbLink>
            </UiBreadcrumbItem>
            <UiBreadcrumbSeparator />
            <UiBreadcrumbItem>
              <UiBreadcrumbPage>Breadcrumb</UiBreadcrumbPage>
            </UiBreadcrumbItem>
          </UiBreadcrumbList>
        </UiBreadcrumb>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">File System</h4>
        <UiBreadcrumb>
          <UiBreadcrumbList>
            <UiBreadcrumbItem>
              <UiBreadcrumbLink href="/">Root</UiBreadcrumbLink>
            </UiBreadcrumbItem>
            <UiBreadcrumbSeparator />
            <UiBreadcrumbItem>
              <UiBreadcrumbLink href="/users">Users</UiBreadcrumbLink>
            </UiBreadcrumbItem>
            <UiBreadcrumbSeparator />
            <UiBreadcrumbItem>
              <UiBreadcrumbLink href="/users/john">john</UiBreadcrumbLink>
            </UiBreadcrumbItem>
            <UiBreadcrumbSeparator />
            <UiBreadcrumbItem>
              <UiBreadcrumbLink href="/users/john/documents">Documents</UiBreadcrumbLink>
            </UiBreadcrumbItem>
            <UiBreadcrumbSeparator />
            <UiBreadcrumbItem>
              <UiBreadcrumbPage>project.pdf</UiBreadcrumbPage>
            </UiBreadcrumbItem>
          </UiBreadcrumbList>
        </UiBreadcrumb>
      </div>
    </div>
  ),
};

export const ResponsiveBehavior: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        This breadcrumb demonstrates responsive behavior. On smaller screens, long paths will wrap to new lines.
      </div>
      <div className="max-w-xs border p-4 rounded">
        <UiBreadcrumb>
          <UiBreadcrumbList>
            <UiBreadcrumbItem>
              <UiBreadcrumbLink href="/">Home</UiBreadcrumbLink>
            </UiBreadcrumbItem>
            <UiBreadcrumbSeparator />
            <UiBreadcrumbItem>
              <UiBreadcrumbLink href="/very-long-category-name">Very Long Category Name</UiBreadcrumbLink>
            </UiBreadcrumbItem>
            <UiBreadcrumbSeparator />
            <UiBreadcrumbItem>
              <UiBreadcrumbLink href="/another-long-subcategory">Another Long Subcategory</UiBreadcrumbLink>
            </UiBreadcrumbItem>
            <UiBreadcrumbSeparator />
            <UiBreadcrumbItem>
              <UiBreadcrumbPage>Current Item with Long Name</UiBreadcrumbPage>
            </UiBreadcrumbItem>
          </UiBreadcrumbList>
        </UiBreadcrumb>
      </div>
    </div>
  ),
};

export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        This breadcrumb includes proper accessibility features:
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li>aria-label="breadcrumb" on the nav element</li>
          <li>aria-current="page" on the current page</li>
          <li>Proper semantic structure with nav, ol, and li elements</li>
          <li>Screen reader friendly separators</li>
        </ul>
      </div>
      <UiBreadcrumb>
        <UiBreadcrumbList>
          <UiBreadcrumbItem>
            <UiBreadcrumbLink href="/">Home</UiBreadcrumbLink>
          </UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem>
            <UiBreadcrumbLink href="/products">Products</UiBreadcrumbLink>
          </UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem>
            <UiBreadcrumbPage>Current Product</UiBreadcrumbPage>
          </UiBreadcrumbItem>
        </UiBreadcrumbList>
      </UiBreadcrumb>
    </div>
  ),
};