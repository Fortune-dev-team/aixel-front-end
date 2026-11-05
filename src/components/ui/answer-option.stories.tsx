import type { Meta, StoryObj } from "@storybook/react"
import { AnswerOption } from "./answer-option"
import { RadioGroup } from "./radio-field"

const meta: Meta<typeof AnswerOption> = {
  title: "Molecules/AnswerOption",
  component: AnswerOption,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    description: { control: "text" },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof AnswerOption>

// Gunakan defaultChecked agar bisa diklik dan interaktif di Storybook
export const Unchecked: Story = {
  args: {
    label: "Option A",
    description: "This is a detailed explanation of Option A.",
    value: "option-a",
    defaultChecked: false,
  },
}

export const Checked: Story = {
  args: {
    label: "Option B",
    description: "This is a selected answer option.",
    value: "option-b",
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    label: "Option C (Disabled)",
    description: "This option cannot be selected.",
    value: "option-c",
    disabled: true,
  },
}

// Bungkus dengan RadioGroup agar transisi pilih antar opsi berjalan normal
export const GroupExample: Story = {
  render: () => {
    return (
      <RadioGroup defaultValue="1" className="flex flex-col gap-3 max-w-md">
        <AnswerOption
          value="1"
          label="HTML & CSS"
          description="Basic web structure and styling"
        />
        <AnswerOption
          value="2"
          label="JavaScript / TypeScript"
          description="Interactive logic and strong typing"
        />
        <AnswerOption
          value="3"
          label="Assembly Language"
          description="Low level hardware programming"
          disabled
        />
      </RadioGroup>
    )
  },
}