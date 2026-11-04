import type { Meta, StoryObj } from "@storybook/react"
import { AnswerOption } from "./answer-option"

const meta: Meta<typeof AnswerOption> = {
  title: "Molecules/AnswerOption",
  component: AnswerOption,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    description: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof AnswerOption>

export const Unchecked: Story = {
  args: {
    label: "Option A",
    description: "This is a detailed explanation of Option A.",
    value: "option-a",
    checked: false,
  },
}

export const Checked: Story = {
  args: {
    label: "Option B",
    description: "This is a selected answer option.",
    value: "option-b",
    checked: true,
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

export const GroupExample: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-3 max-w-md">
        <AnswerOption
          name="quiz"
          value="1"
          label="HTML & CSS"
          description="Basic web structure and styling"
          defaultChecked
        />
        <AnswerOption
          name="quiz"
          value="2"
          label="JavaScript / TypeScript"
          description="Interactive logic and strong typing"
        />
        <AnswerOption
          name="quiz"
          value="3"
          label="Assembly Language"
          description="Low level hardware programming"
          disabled
        />
      </div>
    )
  },
}

