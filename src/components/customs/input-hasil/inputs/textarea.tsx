"use client"

import { FieldError, Label, TextArea, TextField } from "@heroui/react"

interface CatatanTextareaProps {
    label?: string
    placeholder?: string
    value: string
    onChange: (value: string) => void
    errorMessage?: string
    isDisabled?: boolean
}

export function CatatanTextarea({
    label = "Catatan hasil wawancara",
    placeholder = "Tulis ringkasan...",
    value,
    onChange,
    errorMessage,
    isDisabled = false,
}: CatatanTextareaProps) {
    return (
        <TextField
            value={value}
            onChange={onChange}
            isInvalid={Boolean(errorMessage)}
            isDisabled={isDisabled}
            className="flex w-full flex-col gap-1.5"
        >
            <Label className="font-mono text-xs font-medium text-[#0A0A0A]">
                {label}
            </Label>

            <TextArea
                rows={4}
                placeholder={placeholder}
                className="w-full resize-y rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] p-3 font-sans text-xs text-[#0A0A0A] placeholder:text-[#737373] focus:shadow-[2px_2px_0px_#FF5722] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />

            {errorMessage && (
                <FieldError className="font-sans text-[11px] font-medium text-[#DC2626]">
                    {errorMessage}
                </FieldError>
            )}
        </TextField>
    )
}