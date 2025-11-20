import { Meta, StoryObj } from "@storybook/react"
import React from "react"

import { UiImage } from "./UiImage"

const meta: Meta<typeof UiImage> = {
  title: "UI/UiImage",
  component: UiImage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default"],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=300&fit=crop&crop=face",
    alt: "Sample image",
    width: 400,
    height: 300,
  },
}

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Small (200x150)</h3>
        <UiImage
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop"
          alt="Small landscape"
          width={200}
          height={150}
          className="rounded-md"
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Medium (300x200)</h3>
        <UiImage
          src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=200&fit=crop"
          alt="Medium landscape"
          width={300}
          height={200}
          className="rounded-md"
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Large (500x300)</h3>
        <UiImage
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop"
          alt="Large landscape"
          width={500}
          height={300}
          className="rounded-md"
        />
      </div>
    </div>
  ),
}

export const DifferentShapes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Square</h3>
        <UiImage
          src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=200&h=200&fit=crop&crop=face"
          alt="Square portrait"
          width={200}
          height={200}
          className="rounded-md"
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Circle</h3>
        <UiImage
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          alt="Circular portrait"
          width={150}
          height={150}
          className="rounded-full"
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Wide Rectangle</h3>
        <UiImage
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
          alt="Wide landscape"
          width={400}
          height={200}
          className="rounded-md"
        />
      </div>
    </div>
  ),
}

export const ProfileImages: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="text-center space-y-2">
        <UiImage
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
          alt="Small profile"
          width={60}
          height={60}
          className="rounded-full border-2 border-gray-200"
        />
        <p className="text-xs text-muted-foreground">Small (60px)</p>
      </div>
      
      <div className="text-center space-y-2">
        <UiImage
          src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face"
          alt="Medium profile"
          width={80}
          height={80}
          className="rounded-full border-2 border-gray-200"
        />
        <p className="text-xs text-muted-foreground">Medium (80px)</p>
      </div>
      
      <div className="text-center space-y-2">
        <UiImage
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face"
          alt="Large profile"
          width={120}
          height={120}
          className="rounded-full border-2 border-gray-200"
        />
        <p className="text-xs text-muted-foreground">Large (120px)</p>
      </div>
    </div>
  ),
}

export const ProductImages: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
      <div className="space-y-2">
        <UiImage
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop"
          alt="Red sneakers"
          width={300}
          height={300}
          className="rounded-lg shadow-sm"
        />
        <h4 className="font-medium">Red Sneakers</h4>
        <p className="text-sm text-muted-foreground">$129.99</p>
      </div>
      
      <div className="space-y-2">
        <UiImage
          src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop"
          alt="Black headphones"
          width={300}
          height={300}
          className="rounded-lg shadow-sm"
        />
        <h4 className="font-medium">Wireless Headphones</h4>
        <p className="text-sm text-muted-foreground">$199.99</p>
      </div>
      
      <div className="space-y-2">
        <UiImage
          src="https://images.unsplash.com/photo-1586298134089-4ae8eab8fcc2?w=300&h=300&fit=crop"
          alt="Notebook and pen"
          width={300}
          height={300}
          className="rounded-lg shadow-sm"
        />
        <h4 className="font-medium">Premium Notebook</h4>
        <p className="text-sm text-muted-foreground">$24.99</p>
      </div>
    </div>
  ),
}

export const WithPlaceholder: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Loading State</h3>
        <UiImage
          src=""
          alt="Loading image"
          width={300}
          height={200}
          className="rounded-md bg-gray-100 animate-pulse"
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Broken Image (fallback)</h3>
        <UiImage
          src="https://broken-url.com/image.jpg"
          alt="Failed to load"
          width={300}
          height={200}
          className="rounded-md border-2 border-dashed border-gray-300"
        />
      </div>
    </div>
  ),
}

export const ResponsiveImages: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-4xl">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Full Width Responsive</h3>
        <UiImage
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
          alt="Responsive landscape"
          width={800}
          height={400}
          className="w-full h-auto rounded-md"
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Aspect Ratio Maintained</h3>
        <div className="w-full max-w-md">
          <UiImage
            src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop"
            alt="Aspect ratio maintained"
            width={400}
            height={300}
            className="w-full h-auto rounded-md"
          />
        </div>
      </div>
    </div>
  ),
}

export const StyledImages: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">With Shadow</h3>
        <UiImage
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
          alt="Image with shadow"
          width={300}
          height={200}
          className="rounded-lg shadow-lg"
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">With Border</h3>
        <UiImage
          src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=200&fit=crop"
          alt="Image with border"
          width={300}
          height={200}
          className="rounded-lg border-4 border-blue-200"
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Grayscale</h3>
        <UiImage
          src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&h=200&fit=crop"
          alt="Grayscale image"
          width={300}
          height={200}
          className="rounded-lg grayscale hover:grayscale-0 transition-all duration-300"
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Hover Effect</h3>
        <UiImage
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
          alt="Image with hover effect"
          width={300}
          height={200}
          className="rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer"
        />
      </div>
    </div>
  ),
}