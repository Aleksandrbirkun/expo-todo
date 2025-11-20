import { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"

import { UiMultiSelect } from "./UiMultiSelect"

const meta: Meta<typeof UiMultiSelect> = {
  title: "UI/UiMultiSelect",
  component: UiMultiSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "default", "lg"],
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const FRAMEWORKS = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "wordpress",
    label: "WordPress",
  },
  {
    value: "express.js",
    label: "Express.js",
  },
  {
    value: "nest.js",
    label: "Nest.js",
  },
]

const SKILLS = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "nodejs", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "go", label: "Go" },
]

const COUNTRIES = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "gb", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "au", label: "Australia" },
  { value: "br", label: "Brazil" },
]

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <UiMultiSelect 
        data={FRAMEWORKS} 
        placeholder="Select frameworks..."
      />
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h3 className="text-sm font-medium mb-2">Small</h3>
        <UiMultiSelect 
          data={SKILLS.slice(0, 5)} 
          placeholder="Select skills..."
          size="sm"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Default</h3>
        <UiMultiSelect 
          data={SKILLS.slice(0, 5)} 
          placeholder="Select skills..."
          size="default"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Large</h3>
        <UiMultiSelect 
          data={SKILLS.slice(0, 5)} 
          placeholder="Select skills..."
          size="lg"
        />
      </div>
    </div>
  ),
}

export const WithInitialSelection: Story = {
  render: () => (
    <div className="w-80">
      <UiMultiSelect 
        data={FRAMEWORKS} 
        placeholder="Select frameworks..."
        defaultValue={["next.js", "react"]}
      />
    </div>
  ),
}

export const DisabledState: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <h3 className="text-sm font-medium mb-2">Disabled (empty)</h3>
        <UiMultiSelect 
          data={FRAMEWORKS} 
          placeholder="Disabled multiselect..."
          disabled
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Disabled (with selection)</h3>
        <UiMultiSelect 
          data={FRAMEWORKS} 
          placeholder="Disabled with items..."
          defaultValue={["next.js", "remix"]}
          disabled
        />
      </div>
    </div>
  ),
}

export const LongList: Story = {
  render: () => {
    const longList = Array.from({ length: 50 }, (_, i) => ({
      value: `option-${i}`,
      label: `Option ${i + 1}`,
    }));

    return (
      <div className="w-80">
        <UiMultiSelect 
          data={longList} 
          placeholder="Select from many options..."
        />
      </div>
    );
  },
}

export const Interactive: Story = {
  render: () => {
    const [selectedCountries, setSelectedCountries] = useState<string[]>(['us']);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    return (
      <div className="space-y-6 w-80">
        <div>
          <h3 className="text-lg font-medium mb-2">Profile Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Countries you've worked in:
              </label>
              <UiMultiSelect 
                data={COUNTRIES} 
                placeholder="Select countries..."
                value={selectedCountries}
                onValueChange={setSelectedCountries}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Technical skills:
              </label>
              <UiMultiSelect 
                data={SKILLS} 
                placeholder="Select your skills..."
                value={selectedSkills}
                onValueChange={setSelectedSkills}
              />
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h4 className="text-sm font-medium mb-2">Selected Values:</h4>
            <div className="text-xs text-gray-600">
              <div>
                <strong>Countries:</strong> {selectedCountries.join(', ') || 'None'}
              </div>
              <div>
                <strong>Skills:</strong> {selectedSkills.join(', ') || 'None'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
}

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h3 className="text-sm font-medium mb-2">Custom width</h3>
        <div className="w-full">
          <UiMultiSelect 
            data={FRAMEWORKS} 
            placeholder="Full width multiselect..."
            className="w-full"
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Compact styling</h3>
        <UiMultiSelect 
          data={SKILLS.slice(0, 6)} 
          placeholder="Compact multiselect..."
          size="sm"
          className="min-w-[300px]"
        />
      </div>
    </div>
  ),
}

export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      frameworks: [] as string[],
      skills: [] as string[],
      countries: [] as string[],
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      alert(`Selected items:\n${JSON.stringify(formData, null, 2)}`);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6 w-80">
        <div className="space-y-4">
          <div>
            <label htmlFor="frameworks" className="block text-sm font-medium mb-1">
              Preferred Frameworks *
            </label>
            <UiMultiSelect 
              id="frameworks"
              data={FRAMEWORKS.slice(0, 6)} 
              placeholder="Select frameworks..."
              value={formData.frameworks}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, frameworks: value }))
              }
              required
            />
          </div>
          
          <div>
            <label htmlFor="skills" className="block text-sm font-medium mb-1">
              Technical Skills
            </label>
            <UiMultiSelect 
              id="skills"
              data={SKILLS.slice(0, 8)} 
              placeholder="Select your skills..."
              value={formData.skills}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, skills: value }))
              }
            />
          </div>
          
          <div>
            <label htmlFor="countries" className="block text-sm font-medium mb-1">
              Available Countries
            </label>
            <UiMultiSelect 
              id="countries"
              data={COUNTRIES} 
              placeholder="Where can you work?"
              value={formData.countries}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, countries: value }))
              }
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={formData.frameworks.length === 0}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Profile
        </button>
      </form>
    );
  },
}