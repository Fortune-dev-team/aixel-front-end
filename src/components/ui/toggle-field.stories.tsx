import type { Meta, StoryObj } from "@storybook/react"
import { ToggleField } from "./toggle-field"

const meta: Meta<typeof ToggleField> = {
  title: "Molecules/ToggleField",
  component: ToggleField,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof ToggleField>

export const Default: Story = {
  args: {
    label: "Enable notifications",
    defaultChecked: false,
  },
}

export const Checked: Story = {
  args: {
    label: "Enable notifications",
    defaultChecked: true,
  },
}

export const WithDescription: Story = {
  args: {
    label: "Dark Mode",
    description: "Switch between light and dark neo-brutalist theme.",
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    label: "Airplane mode",
    description: "Feature is unavailable on this device.",
    disabled: true,
  },
}

