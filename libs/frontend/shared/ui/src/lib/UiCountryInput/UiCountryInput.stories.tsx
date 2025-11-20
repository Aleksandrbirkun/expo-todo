import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { UiCountryInput } from './UiCountryInput';

const meta: Meta<typeof UiCountryInput> = {
  title: 'UI/UiCountryInput',
  component: UiCountryInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default'],
    },
    label: {
      control: { type: 'text' },
    },
    error: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof UiCountryInput>;

export default meta;
type Story = StoryObj<typeof UiCountryInput>;

export const Default: Story = {
  render: (args) => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCountryCode, setSelectedCountryCode] = useState('');
    
    return (
      <div className="w-80">
        <UiCountryInput
          {...args}
          value={selectedCountry}
          onCountrySelect={setSelectedCountry}
          onSelectCountryCode={setSelectedCountryCode}
        />
        {selectedCountry && (
          <p className="mt-2 text-sm text-muted-foreground">
            Selected: {selectedCountry} ({selectedCountryCode})
          </p>
        )}
      </div>
    );
  },
  args: {
    placeholder: 'Select a country...',
  },
};

export const WithLabel: Story = {
  render: () => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCountryCode, setSelectedCountryCode] = useState('');
    
    return (
      <div className="w-80 space-y-2">
        <label className="text-sm font-medium">Country</label>
        <UiCountryInput
          value={selectedCountry}
          onCountrySelect={setSelectedCountry}
          onSelectCountryCode={setSelectedCountryCode}
          placeholder="Choose your country"
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCountryCode, setSelectedCountryCode] = useState('');
    
    return (
      <div className="w-80 space-y-2">
        <label className="text-sm font-medium">Country *</label>
        <UiCountryInput
          value={selectedCountry}
          onCountrySelect={setSelectedCountry}
          onSelectCountryCode={setSelectedCountryCode}
          placeholder="Select a country..."
        />
        <p className="text-sm text-destructive">Country is required</p>
      </div>
    );
  },
};

export const Preselected: Story = {
  render: () => {
    const [selectedCountry, setSelectedCountry] = useState('United States');
    const [selectedCountryCode, setSelectedCountryCode] = useState('US');
    
    return (
      <div className="w-80 space-y-2">
        <label className="text-sm font-medium">Country</label>
        <UiCountryInput
          value={selectedCountry}
          onCountrySelect={setSelectedCountry}
          onSelectCountryCode={setSelectedCountryCode}
          placeholder="Select a country..."
        />
        <p className="text-xs text-muted-foreground">
          Pre-selected with United States
        </p>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCountryCode, setSelectedCountryCode] = useState('');
    
    const handleClear = () => {
      setSelectedCountry('');
      setSelectedCountryCode('');
    };
    
    return (
      <div className="w-80 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Country</label>
          <UiCountryInput
            value={selectedCountry}
            onCountrySelect={setSelectedCountry}
            onSelectCountryCode={setSelectedCountryCode}
            placeholder="Type to search countries..."
          />
        </div>
        
        {selectedCountry && (
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm font-medium">Selected:</p>
            <p className="text-sm text-muted-foreground">
              Country: {selectedCountry}
            </p>
            <p className="text-sm text-muted-foreground">
              Code: {selectedCountryCode}
            </p>
            <button
              onClick={handleClear}
              className="mt-2 text-xs text-primary hover:underline"
            >
              Clear selection
            </button>
          </div>
        )}
        
        <p className="text-xs text-muted-foreground">
          Click the input to open the country selector. Type to search through available countries.
        </p>
      </div>
    );
  },
};