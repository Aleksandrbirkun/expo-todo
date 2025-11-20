import { Meta, StoryObj } from '@storybook/react';

import { UiPrice } from './UiPrice';

const meta: Meta<typeof UiPrice> = {
  title: 'UI/UiPrice',
  component: UiPrice,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'success', 'large'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
    },
    alignment: {
      control: { type: 'select' },
      options: ['start', 'center', 'baseline'],
    },
    value: {
      control: { type: 'number' },
    },
    pattern: {
      control: { type: 'text' },
    },
    currency: {
      control: { type: 'text' },
    },
    hideDecimals: {
      control: { type: 'boolean' },
    },
    hideCurrency: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 29.99,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default</h4>
        <UiPrice variant="default" value={29.99} />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Secondary</h4>
        <UiPrice variant="secondary" value={29.99} />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Success</h4>
        <UiPrice variant="success" value={29.99} />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Destructive (Sale/Discount)</h4>
        <UiPrice variant="destructive" value={29.99} />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Large</h4>
        <UiPrice variant="large" value={29.99} />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Small</h4>
        <UiPrice size="sm" value={19.99} />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default</h4>
        <UiPrice size="default" value={29.99} />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Large</h4>
        <UiPrice size="lg" value={39.99} />
      </div>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Start Aligned</h4>
        <UiPrice alignment="start" value={99.99} />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Center Aligned</h4>
        <UiPrice alignment="center" value={99.99} />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Baseline Aligned</h4>
        <UiPrice alignment="baseline" value={99.99} />
      </div>
    </div>
  ),
};

export const DifferentValues: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Small Amount</h4>
          <UiPrice value={5.99} />
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Medium Amount</h4>
          <UiPrice value={49.99} />
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Large Amount</h4>
          <UiPrice value={1299.99} />
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Huge Amount</h4>
          <UiPrice value={99999.99} />
        </div>
      </div>
    </div>
  ),
};

export const CurrencyOptions: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">USD ($)</h4>
          <UiPrice value={29.99} currency="$" />
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">EUR (€)</h4>
          <UiPrice value={25.99} currency="€" />
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">GBP (£)</h4>
          <UiPrice value={22.99} currency="£" />
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">YEN (¥)</h4>
          <UiPrice value={3500} currency="¥" pattern="0,0" />
        </div>
      </div>
    </div>
  ),
};

export const HideElements: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Show All (Default)</h4>
        <UiPrice value={29.99} />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Hide Currency</h4>
        <UiPrice value={29.99} hideCurrency />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Hide Decimals</h4>
        <UiPrice value={29.99} hideDecimals />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Hide Both Currency and Decimals</h4>
        <UiPrice value={29.99} hideCurrency hideDecimals />
      </div>
    </div>
  ),
};

export const CustomPatterns: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default Pattern (0,0.00)</h4>
        <UiPrice value={1234.56} />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">No Decimals (0,0)</h4>
        <UiPrice value={1234.56} pattern="0,0" />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Three Decimals (0,0.000)</h4>
        <UiPrice value={1234.567} pattern="0,0.000" />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Percentage (0.00%)</h4>
        <UiPrice value={0.1547} pattern="0.00%" currency="" />
      </div>
    </div>
  ),
};

export const ProductPricing: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="max-w-sm bg-card border rounded-lg p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Premium Plan</h3>
          <UiPrice size="lg" value={99.99} />
          <p className="text-sm text-muted-foreground">per month</p>
          <ul className="text-sm space-y-2">
            <li>✓ Unlimited projects</li>
            <li>✓ Priority support</li>
            <li>✓ Advanced analytics</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};

export const PriceComparison: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="text-sm text-muted-foreground line-through">
            <UiPrice variant="secondary" size="sm" value={49.99} />
          </div>
          <UiPrice variant="success" value={29.99} />
        </div>
        <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
          40% OFF
        </div>
      </div>
    </div>
  ),
};

export const ECommerceExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Product Card 1 */}
        <div className="border rounded-lg p-4 space-y-3">
          <div className="h-32 bg-muted rounded"></div>
          <h3 className="font-medium">Wireless Headphones</h3>
          <UiPrice value={79.99} />
          <button className="w-full bg-primary text-primary-foreground py-2 rounded">
            Add to Cart
          </button>
        </div>
        
        {/* Product Card 2 */}
        <div className="border rounded-lg p-4 space-y-3">
          <div className="h-32 bg-muted rounded"></div>
          <h3 className="font-medium">Smart Watch</h3>
          <div className="space-y-1">
            <UiPrice variant="secondary" size="sm" value={299.99} className="line-through" />
            <UiPrice variant="destructive" value={199.99} />
          </div>
          <button className="w-full bg-primary text-primary-foreground py-2 rounded">
            Add to Cart
          </button>
        </div>
        
        {/* Product Card 3 */}
        <div className="border rounded-lg p-4 space-y-3">
          <div className="h-32 bg-muted rounded"></div>
          <h3 className="font-medium">Laptop Stand</h3>
          <UiPrice variant="success" value={39.99} />
          <button className="w-full bg-primary text-primary-foreground py-2 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  ),
};

export const InternationalPricing: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">International Pricing</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 border rounded-lg">
          <div className="text-sm font-medium mb-2">United States</div>
          <UiPrice value={99.99} currency="$" />
        </div>
        
        <div className="text-center p-4 border rounded-lg">
          <div className="text-sm font-medium mb-2">Europe</div>
          <UiPrice value={89.99} currency="€" />
        </div>
        
        <div className="text-center p-4 border rounded-lg">
          <div className="text-sm font-medium mb-2">United Kingdom</div>
          <UiPrice value={79.99} currency="£" />
        </div>
        
        <div className="text-center p-4 border rounded-lg">
          <div className="text-sm font-medium mb-2">Japan</div>
          <UiPrice value={12000} currency="¥" pattern="0,0" />
        </div>
      </div>
    </div>
  ),
};