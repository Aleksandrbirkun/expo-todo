import { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { AlertTriangle, Check, Info, X, User, Mail, Phone } from "lucide-react"

import { UiButton } from "../UiButton"
import { UiTextInput } from "../UiTextInput"
import { UiModal } from "./UiModal"

const meta: Meta<typeof UiModal> = {
  title: "UI/UiModal",
  component: UiModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "plain"],
    },
    scrollType: {
      control: { type: "select" },
      options: ["behavior", "container"],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <UiButton onClick={() => setOpen(true)}>Open Modal</UiButton>
        <UiModal open={open} onOpenChange={setOpen}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Modal Title</h2>
            <p className="text-muted-foreground">
              This is a basic modal dialog. You can put any content here including
              forms, images, or other components. The modal will automatically
              handle focus management and keyboard navigation.
            </p>
            <div className="flex gap-2 justify-end">
              <UiButton variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </UiButton>
              <UiButton onClick={() => setOpen(false)}>
                Confirm
              </UiButton>
            </div>
          </div>
        </UiModal>
      </>
    )
  },
}

export const AllVariants: Story = {
  render: () => {
    const [defaultOpen, setDefaultOpen] = useState(false)
    const [plainOpen, setPlainOpen] = useState(false)
    
    return (
      <div className="flex gap-4">
        <UiButton onClick={() => setDefaultOpen(true)}>Default Modal</UiButton>
        <UiButton onClick={() => setPlainOpen(true)}>Plain Modal</UiButton>
        
        <UiModal variant="default" open={defaultOpen} onOpenChange={setDefaultOpen}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Default Variant</h2>
            <p>This modal uses the default styling with padding and rounded corners.</p>
            <UiButton onClick={() => setDefaultOpen(false)}>Close</UiButton>
          </div>
        </UiModal>
        
        <UiModal variant="plain" open={plainOpen} onOpenChange={setPlainOpen}>
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Plain Variant</h2>
            <p>This modal uses the plain variant with minimal styling.</p>
            <UiButton onClick={() => setPlainOpen(false)}>Close</UiButton>
          </div>
        </UiModal>
      </div>
    )
  },
}

export const ConfirmationModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [result, setResult] = useState<string>("")
    
    const handleConfirm = () => {
      setResult("Action confirmed!")
      setOpen(false)
    }
    
    const handleCancel = () => {
      setResult("Action cancelled")
      setOpen(false)
    }
    
    return (
      <>
        <div className="space-y-4">
          <UiButton 
            variant="destructive" 
            onClick={() => setOpen(true)}
          >
            Delete Item
          </UiButton>
          {result && (
            <p className="text-sm text-muted-foreground">{result}</p>
          )}
        </div>
        
        <UiModal open={open} onOpenChange={setOpen}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Delete Item</h2>
                <p className="text-sm text-muted-foreground">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            
            <p>
              Are you sure you want to delete this item? This will permanently 
              remove the item and all associated data from your account.
            </p>
            
            <div className="flex gap-2 justify-end">
              <UiButton variant="outline" onClick={handleCancel}>
                Cancel
              </UiButton>
              <UiButton variant="destructive" onClick={handleConfirm}>
                Delete
              </UiButton>
            </div>
          </div>
        </UiModal>
      </>
    )
  },
}

export const FormModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
    })
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      console.log("Form submitted:", formData)
      alert(`User created: ${formData.name}`)
      setOpen(false)
      setFormData({ name: "", email: "", phone: "" })
    }
    
    return (
      <>
        <UiButton onClick={() => setOpen(true)}>Add User</UiButton>
        
        <UiModal open={open} onOpenChange={setOpen}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Add New User</h2>
              <p className="text-muted-foreground">
                Fill out the form below to add a new user to your account.
              </p>
            </div>
            
            <div className="space-y-4">
              <UiTextInput
                id="name"
                label="Full Name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                icon={<User className="h-4 w-4" />}
                required
              />
              
              <UiTextInput
                id="email"
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                icon={<Mail className="h-4 w-4" />}
                required
              />
              
              <UiTextInput
                id="phone"
                label="Phone Number"
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                icon={<Phone className="h-4 w-4" />}
              />
            </div>
            
            <div className="flex gap-2 justify-end">
              <UiButton 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </UiButton>
              <UiButton type="submit">
                Create User
              </UiButton>
            </div>
          </form>
        </UiModal>
      </>
    )
  },
}

export const ScrollableContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    
    return (
      <>
        <UiButton onClick={() => setOpen(true)}>Long Content Modal</UiButton>
        
        <UiModal scrollType="container" open={open} onOpenChange={setOpen}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Terms of Service</h2>
            
            <div className="space-y-4 text-sm">
              {Array.from({ length: 20 }, (_, i) => (
                <p key={i}>
                  {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                  culpa qui officia deserunt mollit anim id est laborum.
                </p>
              ))}
            </div>
            
            <div className="flex gap-2 justify-end">
              <UiButton variant="outline" onClick={() => setOpen(false)}>
                Decline
              </UiButton>
              <UiButton onClick={() => setOpen(false)}>
                Accept
              </UiButton>
            </div>
          </div>
        </UiModal>
      </>
    )
  },
}

export const SuccessModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    
    return (
      <>
        <UiButton onClick={() => setOpen(true)}>Show Success</UiButton>
        
        <UiModal open={open} onOpenChange={setOpen}>
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Success!</h2>
              <p className="text-muted-foreground">
                Your changes have been saved successfully. The updates will be 
                reflected across your account immediately.
              </p>
            </div>
            
            <UiButton onClick={() => setOpen(false)}>
              Continue
            </UiButton>
          </div>
        </UiModal>
      </>
    )
  },
}

export const InfoModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    
    return (
      <>
        <UiButton variant="outline" onClick={() => setOpen(true)}>
          Show Information
        </UiButton>
        
        <UiModal open={open} onOpenChange={setOpen}>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <Info className="h-6 w-6 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Feature Update</h2>
                <div className="space-y-3 text-sm">
                  <p>
                    We've updated our privacy policy to be more transparent about 
                    how we collect and use your data. Here are the key changes:
                  </p>
                  <ul className="space-y-1 ml-4 list-disc">
                    <li>Clearer language about data collection</li>
                    <li>New opt-out options for analytics</li>
                    <li>Updated contact information</li>
                    <li>Enhanced security measures</li>
                  </ul>
                  <p>
                    These changes take effect immediately. You can review the full 
                    policy in your account settings.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 justify-end">
              <UiButton variant="outline" onClick={() => setOpen(false)}>
                Review Later
              </UiButton>
              <UiButton onClick={() => setOpen(false)}>
                Got It
              </UiButton>
            </div>
          </div>
        </UiModal>
      </>
    )
  },
}