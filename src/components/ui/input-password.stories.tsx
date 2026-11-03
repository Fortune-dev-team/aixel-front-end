import type { Meta, StoryObj } from "@storybook/react"
import { InputPassword } from "./input-password"

const meta: Meta<typeof InputPassword> = {
    title: "Molecules/InputPassword",
    component: InputPassword,
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
type Story = StoryObj<typeof InputPassword>

// 1. Default (Masked)
export const Default: Story = {
    args: {
        placeholder: "Kata sandi",
        defaultValue: "rahasia123",
        size: "md",
        variant: "default",
    },
}

// 2. Revealed / Unmasked (Teks terlihat)
export const Revealed: Story = {
    args: {
        placeholder: "Kata sandi",
        defaultValue: "rahasia123",
        defaultShowPassword: true,
        size: "md",
        variant: "default",
    },
}

// 3. Error State
export const ErrorState: Story = {
    args: {
        defaultValue: "rahasia123",
        variant: "error",
        size: "md",
    },
}

// 4. Success State
export const SuccessState: Story = {
    args: {
        defaultValue: "rahasia123",
        variant: "success",
        size: "md",
    },
}

// 5. Disabled State
export const Disabled: Story = {
    args: {
        placeholder: "Kata sandi",
        disabled: true,
        size: "md",
    },
}