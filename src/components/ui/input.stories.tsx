import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"

const LeftIcon = () => <span className="text-xs">←</span>
const RightIcon = () => <span className="text-xs">→</span>

const meta: Meta<typeof Input> = {
    title: "Atoms/Input",
    component: Input,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "error", "success"],
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
        },
        disabled: {
            control: "boolean",
        },
        placeholder: {
            control: "text",
        },
    },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
    args: {
        placeholder: "Placeholder",
        variant: "default",
        size: "md",
        leftIcon: <LeftIcon />,
        rightIcon: <RightIcon />,
    },
}

export const Small: Story = {
    args: {
        placeholder: "Placeholder",
        variant: "default",
        size: "sm",
        leftIcon: <LeftIcon />,
        rightIcon: <RightIcon />,
    },
}

export const Large: Story = {
    args: {
        placeholder: "Placeholder",
        variant: "default",
        size: "lg",
        leftIcon: <LeftIcon />,
        rightIcon: <RightIcon />,
    },
}

export const ErrorState: Story = {
    args: {
        placeholder: "Placeholder",
        variant: "error",
        size: "md",
        leftIcon: <LeftIcon />,
        rightIcon: <RightIcon />,
    },
}

export const SuccessState: Story = {
    args: {
        placeholder: "Placeholder",
        variant: "success",
        size: "md",
        leftIcon: <LeftIcon />,
        rightIcon: <RightIcon />,
    },
}

export const Disabled: Story = {
    args: {
        placeholder: "Placeholder",
        disabled: true,
        size: "md",
        leftIcon: <LeftIcon />,
        rightIcon: <RightIcon />,
    },
}