import { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Settings, Star, Heart, Share2, MoreHorizontal } from "lucide-react"

import {
  UiCard,
  UiCardAction,
  UiCardContent,
  UiCardDescription,
  UiCardFooter,
  UiCardHeader,
  UiCardTitle
} from "./UiCard"
import { UiButton } from "../UiButton"

const meta: Meta<typeof UiCard> = {
  title: "UI/UiCard",
  component: UiCard,
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
  render: () => (
    <UiCard className="w-80">
      <UiCardHeader>
        <UiCardTitle>Card Title</UiCardTitle>
        <UiCardDescription>
          This is a card description that provides more context about the card content.
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <p>
          This is the main content area of the card. You can put any content here,
          including text, images, or other components.
        </p>
      </UiCardContent>
      <UiCardFooter>
        <UiButton size="sm">Action</UiButton>
        <UiButton variant="outline" size="sm">
          Cancel
        </UiButton>
      </UiCardFooter>
    </UiCard>
  ),
}

export const WithActions: Story = {
  render: () => (
    <UiCard className="w-80">
      <UiCardHeader>
        <UiCardTitle>Settings</UiCardTitle>
        <UiCardDescription>
          Manage your account settings and preferences.
        </UiCardDescription>
        <UiCardAction>
          <UiButton variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </UiButton>
        </UiCardAction>
      </UiCardHeader>
      <UiCardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <UiButton variant="outline" size="sm">
              Configure
            </UiButton>
          </div>
          <div className="flex items-center justify-between">
            <span>Privacy Settings</span>
            <UiButton variant="outline" size="sm">
              Configure
            </UiButton>
          </div>
        </div>
      </UiCardContent>
      <UiCardFooter>
        <UiButton>Save Changes</UiButton>
      </UiCardFooter>
    </UiCard>
  ),
}

export const ProductCard: Story = {
  render: () => (
    <UiCard className="w-80">
      <UiCardHeader>
        <UiCardTitle>Premium Plan</UiCardTitle>
        <UiCardDescription>
          Everything you need for professional use
        </UiCardDescription>
        <UiCardAction>
          <div className="flex gap-1">
            <UiButton variant="ghost" size="icon">
              <Heart className="h-4 w-4" />
            </UiButton>
            <UiButton variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </UiButton>
          </div>
        </UiCardAction>
      </UiCardHeader>
      <UiCardContent>
        <div className="text-3xl font-bold mb-2">$29/month</div>
        <ul className="space-y-2 text-sm">
          <li>✓ Unlimited projects</li>
          <li>✓ Advanced analytics</li>
          <li>✓ Priority support</li>
          <li>✓ Team collaboration</li>
        </ul>
      </UiCardContent>
      <UiCardFooter>
        <UiButton className="w-full">Choose Plan</UiButton>
      </UiCardFooter>
    </UiCard>
  ),
}

export const ArticleCard: Story = {
  render: () => (
    <UiCard className="w-96">
      <UiCardHeader>
        <UiCardTitle>10 Tips for Better React Performance</UiCardTitle>
        <UiCardDescription>
          Learn how to optimize your React applications for better performance and user experience.
        </UiCardDescription>
        <UiCardAction>
          <UiButton variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </UiButton>
        </UiCardAction>
      </UiCardHeader>
      <UiCardContent>
        <div className="aspect-video bg-gray-100 rounded-md mb-4 flex items-center justify-center text-gray-500">
          [Article Image]
        </div>
        <p className="text-sm text-muted-foreground">
          React performance optimization is crucial for building scalable applications. 
          In this article, we'll explore various techniques...
        </p>
      </UiCardContent>
      <UiCardFooter className="justify-between">
        <div className="text-sm text-muted-foreground">
          5 min read • Dec 15, 2023
        </div>
        <div className="flex items-center gap-2">
          <UiButton variant="ghost" size="sm">
            <Star className="h-4 w-4 mr-1" />
            24
          </UiButton>
          <UiButton variant="ghost" size="sm">
            Read More
          </UiButton>
        </div>
      </UiCardFooter>
    </UiCard>
  ),
}

export const SimpleCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Header Only</UiCardTitle>
          <UiCardDescription>
            A simple card with just a header section.
          </UiCardDescription>
        </UiCardHeader>
      </UiCard>

      <UiCard>
        <UiCardContent>
          <div className="text-center py-8">
            <h3 className="font-semibold mb-2">Content Only</h3>
            <p className="text-muted-foreground">
              This card only has content, no header or footer.
            </p>
          </div>
        </UiCardContent>
      </UiCard>

      <UiCard>
        <UiCardHeader>
          <UiCardTitle>With Footer</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p>Some content here</p>
        </UiCardContent>
        <UiCardFooter>
          <UiButton size="sm" variant="outline">
            Learn More
          </UiButton>
        </UiCardFooter>
      </UiCard>
    </div>
  ),
}

export const StatCard: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
      <UiCard>
        <UiCardHeader className="pb-2">
          <UiCardTitle className="text-sm font-medium">Total Users</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <div className="text-2xl font-bold">12,543</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </UiCardContent>
      </UiCard>

      <UiCard>
        <UiCardHeader className="pb-2">
          <UiCardTitle className="text-sm font-medium">Revenue</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <div className="text-2xl font-bold">$45,231</div>
          <p className="text-xs text-muted-foreground">
            +15.3% from last month
          </p>
        </UiCardContent>
      </UiCard>

      <UiCard>
        <UiCardHeader className="pb-2">
          <UiCardTitle className="text-sm font-medium">Orders</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <div className="text-2xl font-bold">2,845</div>
          <p className="text-xs text-muted-foreground">
            +7.4% from last month
          </p>
        </UiCardContent>
      </UiCard>

      <UiCard>
        <UiCardHeader className="pb-2">
          <UiCardTitle className="text-sm font-medium">Conversion</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <div className="text-2xl font-bold">3.24%</div>
          <p className="text-xs text-muted-foreground">
            +2.1% from last month
          </p>
        </UiCardContent>
      </UiCard>
    </div>
  ),
}

export const InteractiveCard: Story = {
  render: () => {
    const [liked, setLiked] = React.useState(false);
    const [starred, setStarred] = React.useState(false);

    return (
      <UiCard className="w-80">
        <UiCardHeader>
          <UiCardTitle>Interactive Card</UiCardTitle>
          <UiCardDescription>
            This card has interactive elements that respond to user actions.
          </UiCardDescription>
          <UiCardAction>
            <div className="flex gap-1">
              <UiButton
                variant={starred ? "default" : "ghost"}
                size="icon"
                onClick={() => setStarred(!starred)}
              >
                <Star className={`h-4 w-4 ${starred ? 'fill-current' : ''}`} />
              </UiButton>
              <UiButton
                variant={liked ? "default" : "ghost"}
                size="icon"
                onClick={() => setLiked(!liked)}
              >
                <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
              </UiButton>
            </div>
          </UiCardAction>
        </UiCardHeader>
        <UiCardContent>
          <p>
            Click the star and heart buttons to interact with this card.
            The buttons will change their appearance based on their state.
          </p>
        </UiCardContent>
        <UiCardFooter>
          <div className="text-sm text-muted-foreground">
            {starred && liked && "Starred and liked!"}
            {starred && !liked && "Starred"}
            {!starred && liked && "Liked"}
            {!starred && !liked && "No interactions yet"}
          </div>
        </UiCardFooter>
      </UiCard>
    );
  },
}