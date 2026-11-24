"use client"

import { FieldError, Label, Radio, RadioGroup } from "@heroui/react"
import { cn } from "@/lib/utils"
import { KEPUTUSAN_OPTIONS } from "../constants"
import type { KeputusanType } from "../interfaces"

interface KeputusanRadioGroupProps {
    value: KeputusanType | ""
    onChange: (value: KeputusanType) => void
    errorMessage?: string
    isDisabled?: boolean
}

export function KeputusanRadioGroup({
    value,
    onChange,
    errorMessage,
    isDisabled = false,
}: KeputusanRadioGroupProps) {
    return (
        <RadioGroup
            name="keputusan"
            aria-label="Keputusan"
            orientation="horizontal"
            value={value}
            onChange={(nextValue) => onChange(nextValue as KeputusanType)}
            isDisabled={isDisabled}
            isInvalid={Boolean(errorMessage)}
            className="flex flex-col gap-2"
        >
            <Label className="font-mono text-xs font-medium text-[#0A0A0A]">
                Keputusan
            </Label>

            <div className="flex flex-wrap items-center gap-6">
                {KEPUTUSAN_OPTIONS.map((option) => (
                    <Radio
                        key={option}
                        value={option}
                        className="group cursor-pointer select-none"
                    >
                        <Radio.Content className="flex flex-row items-center gap-2 font-mono text-xs text-[#0A0A0A]">
                            <Radio.Control
                                className={cn(
                                    "flex size-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] transition-colors",
                                    "group-data-[selected=true]:border-[#0A0A0A] group-data-[selected=true]:bg-[#FF5722]"
                                )}
                            >
                                <Radio.Indicator className="size-1.5 rounded-full opacity-0 transition-opacity before:hidden group-data-[selected=true]:opacity-100" />
                            </Radio.Control>
                            {option}
                        </Radio.Content>
                    </Radio>
                ))}
            </div>

            {errorMessage && (
                <FieldError className="font-sans text-[11px] font-medium text-[#DC2626]">
                    {errorMessage}
                </FieldError>
            )}
        </RadioGroup>
    )
}