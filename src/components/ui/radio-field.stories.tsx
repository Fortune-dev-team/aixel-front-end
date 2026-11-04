import type { Meta, StoryObj } from "@storybook/react"
import { RadioField, RadioGroup } from "./radio-field"

const meta: Meta<typeof RadioField> = {
  title: "Molecules/RadioField",
  component: RadioField,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof RadioField>

export const Default: Story = {
  args: {
    label: "Pilihan 1",
    value: "1",
    checked: false,
  },
}

export const Checked: Story = {
  args: {
    label: "Pilihan 1",
    value: "1",
    checked: true,
  },
}

export const WithDescription: Story = {
  args: {
    label: "Pro Plan",
    description: "Access all features with unlimited projects.",
    value: "pro",
    checked: true,
  },
}

export const Disabled: Story = {
  args: {
    label: "Enterprise Plan (Contact us)",
    description: "Custom configuration for large organizations.",
    value: "enterprise",
    disabled: true,
  },
}

export const GroupExample: Story = {
  render: () => (
    <RadioGroup defaultValue="standard" className="max-w-md">
      <RadioField
        value="basic"
        label="Basic Plan"
        description="Ideal for hobbyists and individual learners."
      />
      <RadioField
        value="standard"
        label="Standard Plan"
        description="Great for small teams and startups."
      />
      <RadioField
        value="enterprise"
        label="Enterprise"
        description="Dedicated support and custom SLA."
        disabled
      />
    </RadioGroup>
  ),
}

