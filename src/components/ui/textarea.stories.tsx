import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "./textarea"

const meta: Meta<typeof Textarea> = {
    title: "Atoms/Textarea",
    component: Textarea,
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <div className="w-[320px]">
                <Story />
            </div>
        ),
    ],
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
type Story = StoryObj<typeof Textarea>

// 1. Default (Kosong dengan Placeholder)
export const Default: Story = {
    args: {
        placeholder: "Tulis catatan Anda...",
        variant: "default",
        size: "md",
    },
}

// 2. Filled (Teks terisi)
export const Filled: Story = {
    args: {
        defaultValue: "Tulis catatan Anda...",
        variant: "default",
        size: "md",
    },
}

// 3. Error State
export const ErrorState: Story = {
    args: {
        defaultValue: "Tulis catatan Anda...",
        variant: "error",
        size: "md",
    },
}

// 4. Success State
export const SuccessState: Story = {
    args: {
        defaultValue: "Tulis catatan Anda...",
        variant: "success",
        size: "md",
    },
}

// 5. Disabled State
export const Disabled: Story = {
    args: {
        placeholder: "Tulis catatan Anda...",
        disabled: true,
        size: "md",
    },
}

// 6. Figma Comparison (Semua state sesuai frame Figma)
export const FigmaArtboard: Story = {
    render: () => (
        <div className="flex flex-col gap-4 p-4 border-2 border-dashed border-purple-500 rounded-lg w-[320px] bg-white">
            {/* 1. Default */}
            <Textarea placeholder="Tulis catatan Anda..." />

            {/* 2. Hover representation */}
            <Textarea
                placeholder="Tulis catatan Anda..."
                className="shadow-hard-sm"
            />

            {/* 3. Focus representation (Orange shadow) */}
            <Textarea
                placeholder="Tulis catatan Anda..."
                className="shadow-hard-primary"
            />

            {/* 4. Filled */}
            <Textarea defaultValue="Tulis catatan Anda..." />

            {/* 5. Error */}
            <Textarea defaultValue="Tulis catatan Anda..." variant="error" />

            {/* 6. Success */}
            <Textarea defaultValue="Tulis catatan Anda..." variant="success" />

            {/* 7. Disabled */}
            <Textarea placeholder="Tulis catatan Anda..." disabled />
        </div>
    ),
}