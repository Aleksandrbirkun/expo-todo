import { Meta, StoryObj } from '@storybook/react';

import { UiTypewriter, UiTypewriterSmooth } from './UiTypewriter';

const meta: Meta<typeof UiTypewriter> = {
  title: 'UI/UiTypewriter',
  component: UiTypewriter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default'],
    },
    containerVariant: {
      control: { type: 'select' },
      options: ['default'],
    },
    wordVariant: {
      control: { type: 'select' },
      options: ['default'],
    },
    charVariant: {
      control: { type: 'select' },
      options: ['default'],
    },
    cursorVariant: {
      control: { type: 'select' },
      options: ['default'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    words: [
      { text: "Hello" },
      { text: "World!" },
    ],
  },
};

export const BasicExample: Story = {
  render: () => (
    <UiTypewriter
      words={[
        { text: "Welcome" },
        { text: "to" },
        { text: "our" },
        { text: "application!" },
      ]}
    />
  ),
};

export const ColorfulText: Story = {
  render: () => (
    <UiTypewriter
      words={[
        { text: "Create", className: "text-blue-500" },
        { text: "amazing", className: "text-green-500" },
        { text: "user", className: "text-purple-500" },
        { text: "experiences", className: "text-red-500" },
      ]}
    />
  ),
};

export const LongText: Story = {
  render: () => (
    <div className="max-w-2xl">
      <UiTypewriter
        words={[
          { text: "Building" },
          { text: "modern" },
          { text: "web" },
          { text: "applications" },
          { text: "with" },
          { text: "React," },
          { text: "TypeScript," },
          { text: "and" },
          { text: "Tailwind" },
          { text: "CSS" },
        ]}
      />
    </div>
  ),
};

export const CustomCursor: Story = {
  render: () => (
    <UiTypewriter
      words={[
        { text: "Custom" },
        { text: "cursor" },
        { text: "animation" },
      ]}
      cursorClassName="bg-red-500 w-1"
    />
  ),
};

export const SmallText: Story = {
  render: () => (
    <div className="text-sm">
      <UiTypewriter
        className="text-sm"
        words={[
          { text: "This" },
          { text: "is" },
          { text: "small" },
          { text: "text" },
        ]}
      />
    </div>
  ),
};

export const SmoothTypewriter: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Smooth Typewriter Effect</h3>
        <UiTypewriterSmooth
          words={[
            { text: "Smooth" },
            { text: "typing" },
            { text: "animation" },
          ]}
        />
      </div>
    </div>
  ),
};

export const SmoothColorful: Story = {
  render: () => (
    <UiTypewriterSmooth
      words={[
        { text: "Build", className: "text-blue-500" },
        { text: "beautiful", className: "text-green-500" },
        { text: "interfaces", className: "text-purple-500" },
      ]}
    />
  ),
};

export const MultipleTypewriters: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Regular Typewriter</h3>
        <UiTypewriter
          words={[
            { text: "Fast" },
            { text: "character-by-character" },
            { text: "animation" },
          ]}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Smooth Typewriter</h3>
        <UiTypewriterSmooth
          words={[
            { text: "Smooth" },
            { text: "word-by-word" },
            { text: "animation" },
          ]}
        />
      </div>
    </div>
  ),
};

export const HeaderExample: Story = {
  render: () => (
    <div className="text-center space-y-4">
      <UiTypewriter
        words={[
          { text: "Welcome" },
          { text: "to" },
          { text: "the" },
          { text: "future" },
        ]}
      />
      <p className="text-muted-foreground mt-4">
        Experience the power of animated text
      </p>
    </div>
  ),
};

export const CodeExample: Story = {
  render: () => (
    <div className="bg-black p-6 rounded-lg font-mono">
      <UiTypewriter
        className="text-green-400 font-mono text-sm"
        words={[
          { text: "const" },
          { text: "message" },
          { text: "=" },
          { text: "'Hello" },
          { text: "World!';" },
        ]}
        cursorClassName="bg-green-400"
      />
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: () => {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Interactive Demo</h3>
          <p className="text-sm text-muted-foreground">
            Scroll down to see the animation trigger
          </p>
        </div>
        
        <div className="h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-muted-foreground">
          <span>Scroll past this area</span>
        </div>
        
        <UiTypewriter
          words={[
            { text: "Animation" },
            { text: "triggers" },
            { text: "on" },
            { text: "scroll!" },
          ]}
        />
        
        <div className="h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-muted-foreground">
          <span>More content below</span>
        </div>
      </div>
    );
  },
};