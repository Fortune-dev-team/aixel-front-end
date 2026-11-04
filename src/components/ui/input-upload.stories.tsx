import type { Meta, StoryObj } from "@storybook/react"
import { InputUpload } from "./input-upload"

const meta: Meta<typeof InputUpload> = {
  title: "Molecules/InputUpload",
  component: InputUpload,
  tags: ["autodocs"],
  argTypes: {
    buttonText: {
      control: "text",
      description: "Label teks tombol",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
      description: "Status nonaktif",
    },
  },
}

export default meta
type Story = StoryObj<typeof InputUpload>

// 1. Default (Hover memunculkan shadow hitam, Tab/Focus memunculkan shadow oranye)
export const Default: Story = {
  args: {
    buttonText: "Pilih berkas",
    size: "md",
    disabled: false,
  },
}

// 2. Focused State (Preview langsung bayangan oranye)
export const Focused: Story = {
  args: {
    buttonText: "Pilih berkas",
    size: "md",
    buttonClassName: "shadow-hard-primary",
  },
}

// 3. Hover State (Preview langsung bayangan hitam)
export const Hovered: Story = {
  args: {
    buttonText: "Pilih berkas",
    size: "md",
    buttonClassName: "shadow-hard-sm",
  },
}

// 4. Disabled State
export const Disabled: Story = {
  args: {
    buttonText: "Pilih berkas",
    size: "md",
    disabled: true,
  },
}