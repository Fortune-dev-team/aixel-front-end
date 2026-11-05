import type { Meta, StoryObj } from "@storybook/react"
import { InputCode } from "./input-code"

const meta: Meta<typeof InputCode> = {
    title: "Molecules/InputCode",
    component: InputCode,
    tags: ["autodocs"],
    argTypes: {
        length: {
            control: { type: "number", min: 3, max: 8 },
            description: "Jumlah kotak input kode",
        },
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
        errorMessage: {
            control: "text",
        },
    },
}

export default meta
type Story = StoryObj<typeof InputCode>

// 1. Default Kosong (6 Digit)
export const Default: Story = {
    args: {
        length: 6,
        size: "md",
    },
}

// 2. Focused / Active (Slot pertama fokus dengan hard shadow oranye)
export const ActiveFocus: Story = {
    args: {
        length: 6,
        defaultValue: "0",
        size: "md",
    },
}

// 3. Opsi 4 Digit (PIN)
export const FourDigits: Story = {
    args: {
        length: 4,
        size: "md",
    },
}

// 4. Filled (Terisi 1-6)
export const Filled: Story = {
    args: {
        length: 6,
        defaultValue: "123456",
        size: "md",
    },
}

// 5. Error State dengan Pesan Figma
export const ErrorState: Story = {
    args: {
        length: 6,
        defaultValue: "000000",
        variant: "error",
        errorMessage: "Kode tidak valid.",
        size: "md",
    },
}

// 6. Disabled
export const Disabled: Story = {
    args: {
        length: 6,
        defaultValue: "000000",
        disabled: true,
        size: "md",
    },
}

// 7. Figma Comparison (Semua 5 State sesuai screenshot Figma)
export const FigmaArtboard: Story = {
    render: () => (
        <div className="flex flex-col items-center gap-10 p-6 border-2 border-dashed border-purple-500 rounded-lg w-fit bg-white">
            {/* Baris 1: Default Kosong */}
            <InputCode length={6} />

            {/* Baris 2: Active / Focused (Kotak pertama memiliki shadow oranye) */}
            <div className="inline-flex flex-col gap-2">
                <div className="flex items-center gap-2.5 sm:gap-3">
                    <input
                        type="text"
                        defaultValue="0"
                        readOnly
                        className="w-12 h-16 shrink-0 p-0 text-center font-mono font-bold text-2xl leading-none border-2 border-[#111111] bg-[#FDFDFC] text-foreground rounded-lg shadow-[3px_3px_0px_#FF5722] focus:outline-none"
                    />
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-12 h-16 shrink-0 border-2 border-[#111111] bg-[#FDFDFC] rounded-lg"
                        />
                    ))}
                </div>
            </div>

            {/* Baris 3: Filled 1-6 */}
            <InputCode length={6} defaultValue="123456" />

            {/* Baris 4: Error dengan pesan 'Kode tidak valid.' */}
            <InputCode
                length={6}
                defaultValue="000000"
                variant="error"
                errorMessage="Kode tidak valid."
            />

            {/* Baris 5: Disabled */}
            <InputCode length={6} defaultValue="000000" disabled />
        </div>
    ),
}