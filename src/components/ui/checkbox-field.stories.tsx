import type { Meta, StoryObj } from "@storybook/react"
import { CheckboxField } from "./checkbox-field"

const meta: Meta<typeof CheckboxField> = {
    title: "Molecules/CheckboxField",
    component: CheckboxField,
    tags: ["autodocs"],
    argTypes: {
        checked: {
            control: "select",
            options: [false, true, "indeterminate"],
        },
        disabled: {
            control: "boolean",
        },
    },
}

export default meta
type Story = StoryObj<typeof CheckboxField>

// 1. Default (Kosong tanpa shadow)
export const Default: Story = {
    args: {
        label: "Setuju dengan syarat dan ketentuan.",
        defaultChecked: false,
    },
}

// 2. Hover State (Simulasi shadow oranye aktif)
export const HoverState: Story = {
    args: {
        label: "Setuju dengan syarat dan ketentuan.",
        defaultChecked: false,
        className: "shadow-hard-primary",
    },
}

// 3. Checked
export const Checked: Story = {
    args: {
        label: "Setuju dengan syarat dan ketentuan.",
        defaultChecked: true,
    },
}

// 4. Indeterminate
export const Indeterminate: Story = {
    args: {
        label: "Setuju dengan syarat dan ketentuan.",
        checked: "indeterminate",
    },
}

// Figma Artboard (4 baris sesuai desain)
export const FigmaArtboard: Story = {
    render: () => {
        return (
            <div className="flex flex-col gap-5 p-6 bg-white max-w-sm rounded-lg border border-dashed border-purple-400">
                {/* Baris 1: Default */}
                <CheckboxField
                    label="Setuju dengan syarat dan ketentuan."
                    checked={false}
                />

                {/* Baris 2: Hover (shadow oranye menyala) */}
                <CheckboxField
                    label="Setuju dengan syarat dan ketentuan."
                    checked={false}
                    className="shadow-hard-primary"
                />

                {/* Baris 3: Checked (centang oranye) */}
                <CheckboxField
                    label="Setuju dengan syarat dan ketentuan."
                    checked={true}
                />

                {/* Baris 4: Indeterminate (strip oranye) */}
                <CheckboxField
                    label="Setuju dengan syarat dan ketentuan."
                    checked="indeterminate"
                />
            </div>
        )
    },
}