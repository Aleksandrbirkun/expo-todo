import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { UiCheckbox } from './UiCheckbox';
import { UiLabel } from '../UiLabel';

const meta: Meta<typeof UiCheckbox> = {
  title: 'UI/UiCheckbox',
  component: UiCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    checked: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CheckedStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <UiCheckbox id="unchecked" />
        <UiLabel htmlFor="unchecked">Unchecked</UiLabel>
      </div>
      <div className="flex items-center space-x-2">
        <UiCheckbox id="checked" defaultChecked />
        <UiLabel htmlFor="checked">Checked</UiLabel>
      </div>
      <div className="flex items-center space-x-2">
        <UiCheckbox id="indeterminate" checked="indeterminate" />
        <UiLabel htmlFor="indeterminate">Indeterminate</UiLabel>
      </div>
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <UiCheckbox id="terms" />
        <UiLabel htmlFor="terms">Accept terms and conditions</UiLabel>
      </div>
      <div className="flex items-center space-x-2">
        <UiCheckbox id="newsletter" />
        <UiLabel htmlFor="newsletter">Subscribe to our newsletter</UiLabel>
      </div>
      <div className="flex items-center space-x-2">
        <UiCheckbox id="marketing" />
        <UiLabel htmlFor="marketing">I want to receive marketing emails</UiLabel>
      </div>
    </div>
  ),
};

export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <UiCheckbox id="disabled-unchecked" disabled />
        <UiLabel htmlFor="disabled-unchecked" className="text-muted-foreground">
          Disabled unchecked
        </UiLabel>
      </div>
      <div className="flex items-center space-x-2">
        <UiCheckbox id="disabled-checked" disabled defaultChecked />
        <UiLabel htmlFor="disabled-checked" className="text-muted-foreground">
          Disabled checked
        </UiLabel>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = useState({
      item1: false,
      item2: true,
      item3: false,
    });

    const handleCheckedChange = (itemId: string) => (checked: boolean | 'indeterminate') => {
      setCheckedItems(prev => ({
        ...prev,
        [itemId]: checked === true,
      }));
    };

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-2">
          <UiCheckbox
            id="interactive-1"
            checked={checkedItems.item1}
            onCheckedChange={handleCheckedChange('item1')}
          />
          <UiLabel htmlFor="interactive-1">
            Interactive checkbox 1 {checkedItems.item1 ? '(checked)' : '(unchecked)'}
          </UiLabel>
        </div>
        <div className="flex items-center space-x-2">
          <UiCheckbox
            id="interactive-2"
            checked={checkedItems.item2}
            onCheckedChange={handleCheckedChange('item2')}
          />
          <UiLabel htmlFor="interactive-2">
            Interactive checkbox 2 {checkedItems.item2 ? '(checked)' : '(unchecked)'}
          </UiLabel>
        </div>
        <div className="flex items-center space-x-2">
          <UiCheckbox
            id="interactive-3"
            checked={checkedItems.item3}
            onCheckedChange={handleCheckedChange('item3')}
          />
          <UiLabel htmlFor="interactive-3">
            Interactive checkbox 3 {checkedItems.item3 ? '(checked)' : '(unchecked)'}
          </UiLabel>
        </div>
      </div>
    );
  },
};

export const GroupSelection: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState(['apple']);
    
    const fruits = [
      { id: 'apple', name: 'Apple' },
      { id: 'banana', name: 'Banana' },
      { id: 'cherry', name: 'Cherry' },
      { id: 'date', name: 'Date' },
    ];

    const toggleItem = (itemId: string) => {
      setSelectedItems(prev =>
        prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    };

    return (
      <div className="space-y-4">
        <div className="font-medium">Select your favorite fruits:</div>
        <div className="flex flex-col gap-2">
          {fruits.map((fruit) => (
            <div key={fruit.id} className="flex items-center space-x-2">
              <UiCheckbox
                id={fruit.id}
                checked={selectedItems.includes(fruit.id)}
                onCheckedChange={() => toggleItem(fruit.id)}
              />
              <UiLabel htmlFor={fruit.id}>{fruit.name}</UiLabel>
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          Selected: {selectedItems.join(', ') || 'none'}
        </div>
      </div>
    );
  },
};