import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { UiToaster } from './UiToaster';
import { useToast } from './hooks/useToast';

const meta: Meta<typeof UiToaster> = {
  title: 'UI/UiToaster',
  component: UiToaster,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Helper component to demonstrate toast functionality
const ToasterDemo = () => {
  const { toast } = useToast();

  const showToast = (type: 'default' | 'info' | 'success' | 'destructive', title: string, description: string) => {
    toast({
      variant: type,
      title,
      description,
    });
  };

  const showActionToast = () => {
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
      action: (
        <button 
          className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
          onClick={() => alert('Undo action triggered')}
        >
          Undo
        </button>
      ),
    });
  };

  return (
    <div className="p-8 space-y-4">
      <div>
        <h2 className="text-xl font-bold mb-4">Toast Management System</h2>
        <p className="text-muted-foreground mb-6">
          Click the buttons below to show different types of toast notifications.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => showToast('default', 'Default Toast', 'This is a default notification.')}
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
          onClick={() => showToast('success', 'Success!', 'Operation completed successfully!')}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Show Success
        </button>
        
        <button
          onClick={() => showToast('destructive', 'Error', 'Something went wrong!')}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Show Error
        </button>
      </div>

      <div className="border-t pt-4">
        <button
          onClick={showActionToast}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
        >
          Show Toast with Action
        </button>
      </div>

      <UiToaster />
    </div>
  );
};

export const Default: Story = {
  render: () => <ToasterDemo />,
};

export const ToastTypes: Story = {
  render: () => {
    const { toast } = useToast();

    const showExamples = () => {
      // Show different types with delays
      setTimeout(() => {
        toast({
          variant: 'info',
          title: 'Information',
          description: 'Here is some important information.',
        });
      }, 500);

      setTimeout(() => {
        toast({
          variant: 'success',
          title: 'Success',
          description: 'Your action was completed successfully.',
        });
      }, 1000);

      setTimeout(() => {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'There was a problem with your request.',
        });
      }, 1500);
    };

    return (
      <div className="p-8">
        <h2 className="text-xl font-bold mb-4">Different Toast Types</h2>
        <button
          onClick={showExamples}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          Show All Toast Types
        </button>
        <UiToaster />
      </div>
    );
  },
};

export const PersistentToast: Story = {
  render: () => {
    const { toast } = useToast();

    const showPersistentToast = () => {
      toast({
        title: "Important Notice",
        description: "This toast will stay until manually dismissed.",
        variant: 'info',
        // Note: The current implementation auto-removes after a very long delay
        // In a real app, you might want to set duration: Infinity or similar
      });
    };

    return (
      <div className="p-8">
        <h2 className="text-xl font-bold mb-4">Persistent Toast</h2>
        <p className="text-muted-foreground mb-4">
          This toast will remain visible until manually closed.
        </p>
        <button
          onClick={showPersistentToast}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          Show Persistent Toast
        </button>
        <UiToaster />
      </div>
    );
  },
};

export const NotificationQueue: Story = {
  render: () => {
    const { toast } = useToast();

    const showMultipleToasts = () => {
      const messages = [
        { title: 'First', description: 'This is the first notification', variant: 'default' as const },
        { title: 'Second', description: 'This is the second notification', variant: 'info' as const },
        { title: 'Third', description: 'This is the third notification', variant: 'success' as const },
      ];

      messages.forEach((msg, index) => {
        setTimeout(() => {
          toast(msg);
        }, index * 300);
      });
    };

    return (
      <div className="p-8">
        <h2 className="text-xl font-bold mb-4">Notification Queue</h2>
        <p className="text-muted-foreground mb-4">
          Show multiple toasts in sequence. Only one toast is shown at a time based on the current limit.
        </p>
        <button
          onClick={showMultipleToasts}
          className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
        >
          Show Multiple Toasts
        </button>
        <UiToaster />
      </div>
    );
  },
};

export const ApplicationExamples: Story = {
  render: () => {
    const { toast } = useToast();

    const examples = {
      saveFile: () => {
        toast({
          variant: 'success',
          title: 'File saved',
          description: 'Your document has been saved successfully.',
        });
      },
      
      deleteItem: () => {
        toast({
          variant: 'destructive',
          title: 'Item deleted',
          description: 'The selected item has been permanently deleted.',
          action: (
            <button 
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => alert('Undo delete action')}
            >
              Undo
            </button>
          ),
        });
      },
      
      networkError: () => {
        toast({
          variant: 'destructive',
          title: 'Network Error',
          description: 'Unable to connect to the server. Please try again.',
        });
      },
      
      newMessage: () => {
        toast({
          variant: 'info',
          title: 'New Message',
          description: 'You have received a new message from John Doe.',
          action: (
            <button 
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => alert('View message')}
            >
              View
            </button>
          ),
        });
      },
      
      updateAvailable: () => {
        toast({
          variant: 'info',
          title: 'Update Available',
          description: 'A new version is available. Update now?',
          action: (
            <button 
              className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => alert('Starting update...')}
            >
              Update
            </button>
          ),
        });
      }
    };

    return (
      <div className="p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Real-world Examples</h2>
          <p className="text-muted-foreground mb-6">
            Common toast notification patterns used in applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium">File Operations</h3>
            <button
              onClick={examples.saveFile}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
            >
              Save File
            </button>
            <button
              onClick={examples.deleteItem}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
            >
              Delete Item
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">System Messages</h3>
            <button
              onClick={examples.networkError}
              className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-sm"
            >
              Network Error
            </button>
            <button
              onClick={examples.updateAvailable}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
            >
              Update Available
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Communications</h3>
            <button
              onClick={examples.newMessage}
              className="w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 text-sm"
            >
              New Message
            </button>
          </div>
        </div>

        <UiToaster />
      </div>
    );
  },
};

export const CustomizedToaster: Story = {
  render: () => {
    const { toast } = useToast();

    const showCustomToast = () => {
      toast({
        title: "Custom Toast",
        description: "This toast has custom styling applied.",
        variant: 'success',
      });
    };

    return (
      <div className="p-8">
        <h2 className="text-xl font-bold mb-4">Customized Toaster</h2>
        <p className="text-muted-foreground mb-4">
          The toaster can be customized through the variant prop and CSS classes.
        </p>
        <button
          onClick={showCustomToast}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600"
        >
          Show Custom Toast
        </button>
        <UiToaster variant="default" />
      </div>
    );
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const { toast } = useToast();
    const [count, setCount] = useState(0);

    const showCounterToast = () => {
      const newCount = count + 1;
      setCount(newCount);
      
      toast({
        title: `Toast #${newCount}`,
        description: `This is toast notification number ${newCount}`,
        variant: newCount % 4 === 0 ? 'destructive' : 
                newCount % 3 === 0 ? 'success' :
                newCount % 2 === 0 ? 'info' : 'default',
      });
    };

    return (
      <div className="p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Interactive Toast Demo</h2>
          <p className="text-muted-foreground mb-4">
            Each click shows a new toast with different styling based on the counter.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={showCounterToast}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 font-medium"
          >
            Show Toast #{count + 1}
          </button>
          
          <div className="text-sm text-muted-foreground">
            Total toasts shown: {count}
          </div>
        </div>

        <div className="text-xs text-muted-foreground max-w-md">
          Note: The toaster is configured to show only one toast at a time. Each new toast will replace the previous one.
        </div>

        <UiToaster />
      </div>
    );
  },
};