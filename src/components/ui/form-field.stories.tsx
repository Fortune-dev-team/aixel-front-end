import type { Meta, StoryObj } from "@storybook/react"
import { FormField } from "./form-field"
import { Input } from "./input"
import { Textarea } from "./textarea"

const meta: Meta<typeof FormField> = {
  title: "Molecules/FormField",
  component: FormField,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    required: { control: "boolean" },
    description: { control: "text" },
    error: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof FormField>

export const Default: Story = {
  args: {
    label: "Email Address",
    description: "We'll never share your email with anyone else.",
    children: <Input type="email" placeholder="you@example.com" />,
  },
}

export const RequiredField: Story = {
  args: {
    label: "Username",
    required: true,
    children: <Input placeholder="johndoe" />,
  },
}

export const ErrorState: Story = {
  args: {
    label: "Password",
    required: true,
    error: "Password must be at least 8 characters long.",
    children: <Input type="password" defaultValue="123" />,
  },
}

export const WithTextarea: Story = {
  args: {
    label: "Bio / Notes",
    description: "Write a short summary about yourself.",
    children: <Textarea placeholder="Tell us about yourself..." />,
  },
}

