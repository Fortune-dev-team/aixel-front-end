import type { Meta, StoryObj } from "@storybook/react"
import { InputSearch } from "./input-search"

const meta: Meta<typeof InputSearch> = {
    title: "Molecules/InputSearch",
    component: InputSearch,
    tags: ["autodocs"],
    argTypes: {
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
type Story = StoryObj<typeof InputSearch>

// Baris 1: Default Kosong
export const Default: Story = {
    args: {
        placeholder: "Cari...",
        size: "md",
    },
}

// Baris 4: Terisi (Filled) dengan tombol clear ✕
export const Filled: Story = {
    args: {
        placeholder: "Cari...",
        defaultValue: "Catatan Proyek",
        size: "md",
    },
}

// Baris 5: Disabled
export const Disabled: Story = {
    args: {
        placeholder: "Cari...",
        disabled: true,
        size: "md",
    },
}

// Ukuran Small & Large
export const Small: Story = {
    args: {
        placeholder: "Cari...",
        size: "sm",
    },
}

export const Large: Story = {
    args: {
        placeholder: "Cari...",
        size: "lg",
    },
}