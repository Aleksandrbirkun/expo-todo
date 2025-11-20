import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import {
  UiToast,
  UiToastClose,
  UiToastDescription,
  UiToastProvider,
  UiToastTitle,
  UiToastViewport,
  ToastAction,
} from './UiToast';

const meta: Meta<typeof UiToast> = {
  title: 'UI/UiToast',
  component: UiToast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'info', 'success', 'destructive'],
    },
  },
  decorators: [
    (Story) => (
      <UiToastProvider>
        <Story />
        <UiToastViewport />
      </UiToastProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <UiToast {...args}>
      <div className="grid gap-1">
        <UiToastTitle>Default Toast</UiToastTitle>
        <UiToastDescription>
          This is a default toast message.
        </UiToastDescription>
      </div>
      <UiToastClose />
    </UiToast>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <UiToast variant="default">
        <div className="grid gap-1">
          <UiToastTitle>Default</UiToastTitle>
          <UiToastDescription>
            This is a default toast notification.
          </UiToastDescription>
        </div>
        <UiToastClose />
      </UiToast>
      
      <UiToast variant="info">
        <div className="grid gap-1">
          <UiToastTitle>Information</UiToastTitle>
          <UiToastDescription>
            This is an informational toast.
          </UiToastDescription>
        </div>
        <UiToastClose />
      </UiToast>
      
      <UiToast variant="success">
        <div className="grid gap-1">
          <UiToastTitle>Success</UiToastTitle>
          <UiToastDescription>
            Operation completed successfully!
          </UiToastDescription>
        </div>
        <UiToastClose />
      </UiToast>
      
      <UiToast variant="destructive">
        <div className="grid gap-1">
          <UiToastTitle>Error</UiToastTitle>
          <UiToastDescription>
            Something went wrong. Please try again.
          </UiToastDescription>
        </div>
        <UiToastClose />
      </UiToast>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div className="space-y-4">
      <UiToast>
        <div className="grid gap-1">
          <UiToastTitle>Scheduled: Catch up</UiToastTitle>
          <UiToastDescription>
            Friday, February 10, 2023 at 5:57 PM
          </UiToastDescription>
        </div>
        <ToastAction altText="Goto schedule to undo">
          Undo
        </ToastAction>
        <UiToastClose />
      </UiToast>
      
      <UiToast variant="success">
        <div className="grid gap-1">
          <UiToastTitle>File uploaded</UiToastTitle>
          <UiToastDescription>
            Your file has been uploaded successfully.
          </UiToastDescription>
        </div>
        <ToastAction altText="View file">
          View
        </ToastAction>
        <UiToastClose />
      </UiToast>
      
      <UiToast variant="destructive">
        <div className="grid gap-1">
          <UiToastTitle>Deletion failed</UiToastTitle>
          <UiToastDescription>
            Could not delete the selected items.
          </UiToastDescription>
        </div>
        <ToastAction altText="Try again">
          Retry
        </ToastAction>
        <UiToastClose />
      </UiToast>
    </div>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <div className="space-y-4">
      <UiToast variant="info">
        <UiToastTitle>System update available</UiToastTitle>
        <UiToastClose />
      </UiToast>
      
      <UiToast variant="success">
        <UiToastTitle>Settings saved</UiToastTitle>
        <UiToastClose />
      </UiToast>
    </div>
  ),
};

export const DescriptionOnly: Story = {
  render: () => (
    <div className="space-y-4">
      <UiToast>
        <UiToastDescription>
          Your session will expire in 5 minutes.
        </UiToastDescription>
        <UiToastClose />
      </UiToast>
      
      <UiToast variant="destructive">
        <UiToastDescription>
          Network connection lost. Please check your internet connection.
        </UiToastDescription>
        <UiToastClose />
      </UiToast>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <UiToast>
      <div className="grid gap-1">
        <UiToastTitle>Update Available</UiToastTitle>
        <UiToastDescription>
          A new version of the application is available with bug fixes, performance improvements, 
          and new features. Would you like to update now or schedule it for later? 
          The update will take approximately 5-10 minutes to complete.
        </UiToastDescription>
      </div>
      <div className="flex gap-2">
        <ToastAction altText="Update now">
          Update
        </ToastAction>
        <ToastAction altText="Schedule for later">
          Later
        </ToastAction>
      </div>
      <UiToastClose />
    </UiToast>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [toasts, setToasts] = useState<Array<{
      id: number;
      variant: 'default' | 'info' | 'success' | 'destructive';
      title: string;
      description: string;
    }>>([]);

    const showToast = (
      variant: 'default' | 'info' | 'success' | 'destructive',
      title: string,
      description: string
    ) => {
      const newToast = {
        id: Date.now(),
        variant,
        title,
        description,
      };
      setToasts(prev => [...prev, newToast]);
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToast.id));
      }, 5000);
    };

    const removeToast = (id: number) => {
      setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => showToast('default', 'Default Toast', 'This is a default toast message.')}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Show Default
          </button>
          <button
            onClick={() => showToast('info', 'Info Toast', 'This is an informational message.')}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Show Info
          </button>
          <button
            onClick={() => showToast('success', 'Success Toast', 'Operation completed successfully!')}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Show Success
          </button>
          <button
            onClick={() => showToast('destructive', 'Error Toast', 'Something went wrong!')}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Show Error
          </button>
        </div>
        
        <div className="space-y-2">
          {toasts.map((toast) => (
            <UiToast key={toast.id} variant={toast.variant}>
              <div className="grid gap-1">
                <UiToastTitle>{toast.title}</UiToastTitle>
                <UiToastDescription>{toast.description}</UiToastDescription>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-auto"
              >
                <UiToastClose />
              </button>
            </UiToast>
          ))}
        </div>
      </div>
    );
  },
};

export const NotificationExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <UiToast variant="info">
        <div className="grid gap-1">
          <UiToastTitle>New message</UiToastTitle>
          <UiToastDescription>
            You have received a new message from John Doe.
          </UiToastDescription>
        </div>
        <ToastAction altText="View message">
          View
        </ToastAction>
        <UiToastClose />
      </UiToast>
      
      <UiToast variant="success">
        <div className="grid gap-1">
          <UiToastTitle>Payment successful</UiToastTitle>
          <UiToastDescription>
            Your payment of $99.99 has been processed successfully.
          </UiToastDescription>
        </div>
        <ToastAction altText="View receipt">
          Receipt
        </ToastAction>
        <UiToastClose />
      </UiToast>
      
      <UiToast variant="destructive">
        <div className="grid gap-1">
          <UiToastTitle>Connection lost</UiToastTitle>
          <UiToastDescription>
            Unable to connect to the server. Retrying...
          </UiToastDescription>
        </div>
        <ToastAction altText="Retry connection">
          Retry
        </ToastAction>
        <UiToastClose />
      </UiToast>
    </div>
  ),
};