import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Search, User, Mail, MessageCircle } from 'lucide-react';

import { UiVanishInput } from './UiVanishInput';

const meta: Meta<typeof UiVanishInput> = {
  title: 'UI/UiVanishInput',
  component: UiVanishInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholders: {
      control: { type: 'object' },
    },
    withSubmitButton: {
      control: { type: 'boolean' },
    },
    isMainPage: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholders: ['Type something here...', 'Enter your text', 'What\'s on your mind?'],
    onChange: (e) => console.log('Input changed:', e.target.value),
    onSubmit: (e) => {
      e.preventDefault();
      console.log('Form submitted');
    },
  },
};

export const SearchInput: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      alert(`Searching for: ${value}`);
      setValue('');
    };

    return (
      <div className="w-96">
        <UiVanishInput
          placeholders={[
            'Search for products...',
            'Find what you need',
            'Discover amazing items',
            'Type to search'
          ]}
          onChange={handleChange}
          onSubmit={handleSubmit}
          className="w-full"
        >
          <Search className="size-4 text-gray-400" />
        </UiVanishInput>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="w-96">
        <h4 className="text-sm font-medium mb-2">Search with Icon</h4>
        <UiVanishInput
          placeholders={['Search anything...', 'Find what you need']}
          onChange={(e) => console.log(e.target.value)}
          onSubmit={(e) => e.preventDefault()}
        >
          <Search className="size-4 text-gray-400" />
        </UiVanishInput>
      </div>
      
      <div className="w-96">
        <h4 className="text-sm font-medium mb-2">User Input with Icon</h4>
        <UiVanishInput
          placeholders={['Enter your username...', 'Your handle', 'User identifier']}
          onChange={(e) => console.log(e.target.value)}
          onSubmit={(e) => e.preventDefault()}
        >
          <User className="size-4 text-gray-400" />
        </UiVanishInput>
      </div>
      
      <div className="w-96">
        <h4 className="text-sm font-medium mb-2">Email Input with Icon</h4>
        <UiVanishInput
          placeholders={['Enter your email...', 'Your email address', 'Email here']}
          onChange={(e) => console.log(e.target.value)}
          onSubmit={(e) => e.preventDefault()}
          type="email"
        >
          <Mail className="size-4 text-gray-400" />
        </UiVanishInput>
      </div>
    </div>
  ),
};

export const WithoutSubmitButton: Story = {
  render: () => (
    <div className="w-96">
      <UiVanishInput
        placeholders={[
          'Type without submit button...',
          'Just input field',
          'Press Enter to submit'
        ]}
        onChange={(e) => console.log('Input:', e.target.value)}
        onSubmit={(e) => {
          e.preventDefault();
          console.log('Form submitted without button');
        }}
        withSubmitButton={false}
      >
        <MessageCircle className="size-4 text-gray-400" />
      </UiVanishInput>
    </div>
  ),
};

export const MainPageStyle: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <UiVanishInput
        placeholders={[
          'What can I help you with today?',
          'Ask me anything...',
          'How can I assist you?',
          'Type your question here'
        ]}
        onChange={(e) => console.log('Main input:', e.target.value)}
        onSubmit={(e) => {
          e.preventDefault();
          console.log('Main form submitted');
        }}
        isMainPage={true}
        className="w-full"
      />
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: () => {
    const [submissions, setSubmissions] = useState<string[]>([]);
    const [currentValue, setCurrentValue] = useState('');
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentValue(e.target.value);
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (currentValue.trim()) {
        setSubmissions(prev => [...prev, currentValue.trim()]);
        setCurrentValue('');
      }
    };

    return (
      <div className="w-96 space-y-4">
        <UiVanishInput
          placeholders={[
            'Type a message...',
            'Enter your text',
            'What would you like to say?',
            'Share your thoughts'
          ]}
          onChange={handleChange}
          onSubmit={handleSubmit}
          value={currentValue}
        />
        
        {submissions.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium">Submitted messages:</h4>
            <div className="space-y-1">
              {submissions.map((submission, index) => (
                <div
                  key={index}
                  className="p-2 bg-gray-100 rounded text-sm"
                >
                  {submission}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const DifferentUseCases: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="w-96">
        <h4 className="text-sm font-medium mb-2">Chat Interface</h4>
        <UiVanishInput
          placeholders={[
            'Type a message...',
            'Say something...',
            'Chat with us',
            'How can we help?'
          ]}
          onChange={(e) => console.log('Chat:', e.target.value)}
          onSubmit={(e) => e.preventDefault()}
        >
          <MessageCircle className="size-4 text-gray-400" />
        </UiVanishInput>
      </div>
      
      <div className="w-96">
        <h4 className="text-sm font-medium mb-2">Command Line Style</h4>
        <UiVanishInput
          placeholders={[
            '$ type command...',
            '> execute action',
            '$ run script',
            '> system command'
          ]}
          onChange={(e) => console.log('Command:', e.target.value)}
          onSubmit={(e) => e.preventDefault()}
          className="font-mono"
        />
      </div>
      
      <div className="w-96">
        <h4 className="text-sm font-medium mb-2">Newsletter Signup</h4>
        <UiVanishInput
          placeholders={[
            'Enter your email for updates...',
            'Subscribe to our newsletter',
            'Join our mailing list',
            'Get the latest news'
          ]}
          onChange={(e) => console.log('Email:', e.target.value)}
          onSubmit={(e) => e.preventDefault()}
          type="email"
        >
          <Mail className="size-4 text-gray-400" />
        </UiVanishInput>
      </div>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="w-96">
        <h4 className="text-sm font-medium mb-2">Dark Theme</h4>
        <UiVanishInput
          placeholders={['Dark theme input...', 'Styled differently']}
          onChange={(e) => console.log(e.target.value)}
          onSubmit={(e) => e.preventDefault()}
          className="!bg-gray-900 border border-gray-700"
        />
      </div>
      
      <div className="w-96">
        <h4 className="text-sm font-medium mb-2">Colored Border</h4>
        <UiVanishInput
          placeholders={['Colorful input...', 'With custom styling']}
          onChange={(e) => console.log(e.target.value)}
          onSubmit={(e) => e.preventDefault()}
          className="border-2 border-blue-300 focus-within:border-blue-500"
        />
      </div>
      
      <div className="w-96">
        <h4 className="text-sm font-medium mb-2">Rounded Style</h4>
        <UiVanishInput
          placeholders={['Rounded input...', 'Smooth corners']}
          onChange={(e) => console.log(e.target.value)}
          onSubmit={(e) => e.preventDefault()}
          className="rounded-full"
        />
      </div>
    </div>
  ),
};

export const AnimationShowcase: Story = {
  render: () => {
    const [showDemo, setShowDemo] = useState(false);
    
    return (
      <div className="w-96 space-y-4">
        <div className="text-sm text-muted-foreground">
          This input features a unique vanishing animation when text is submitted. 
          Type some text and press Enter or click the submit button to see the effect.
        </div>
        
        <UiVanishInput
          placeholders={[
            'Type to see the animation...',
            'Watch the text vanish',
            'Amazing particle effect',
            'Try submitting text'
          ]}
          onChange={(e) => console.log('Animation demo:', e.target.value)}
          onSubmit={(e) => {
            e.preventDefault();
            console.log('Text vanished with animation!');
          }}
        />
        
        <div className="text-xs text-muted-foreground mt-2">
          ✨ The text will animate into particles and vanish when submitted
        </div>
      </div>
    );
  },
};

export const ResponsiveWidths: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="w-64">
        <h4 className="text-sm font-medium mb-2">Small Width</h4>
        <UiVanishInput
          placeholders={['Small...', 'Compact']}
          onChange={(e) => console.log(e.target.value)}
          onSubmit={(e) => e.preventDefault()}
        />
      </div>
      
      <div className="w-96">
        <h4 className="text-sm font-medium mb-2">Medium Width</h4>
        <UiVanishInput
          placeholders={['Medium width input...', 'Standard size']}
          onChange={(e) => console.log(e.target.value)}
          onSubmit={(e) => e.preventDefault()}
        />
      </div>
      
      <div className="w-full max-w-2xl">
        <h4 className="text-sm font-medium mb-2">Full Width</h4>
        <UiVanishInput
          placeholders={[
            'Full width input with longer placeholder text...',
            'Spans the entire container width',
            'Perfect for main search interfaces'
          ]}
          onChange={(e) => console.log(e.target.value)}
          onSubmit={(e) => e.preventDefault()}
        />
      </div>
    </div>
  ),
};