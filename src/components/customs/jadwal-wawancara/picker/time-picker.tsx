"use client"

import * as React from "react"
import {
    FieldError,
    TimeField as HeroTimeField,
    type TimeValue,
} from "@heroui/react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimePickerProps {
    name?: string
    ariaLabel?: string
    value?: TimeValue | null
    onChange?: (value: TimeValue | null) => void
    minValue?: TimeValue
    maxValue?: TimeValue
    errorMessage?: string
    className?: string
}

export function TimePicker({
    name = "time",
    ariaLabel = "Pilih waktu",
    value,
    onChange,
    minValue,
    maxValue,
    errorMessage,
    className,
}: TimePickerProps) {
    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return (
            <div
                aria-hidden="true"
                className={cn(
                    "flex w-36 items-center justify-between rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] px-3 shadow-[2px_2px_0px_#0A0A0A]",
                    className
                )}
            >
                <span className="font-mono text-xs text-[#737373]">--:--</span>
                <Clock className="size-4 text-[#0A0A0A]" />
            </div>
        )
    }

    return (
        <HeroTimeField
            name={name}
            aria-label={ariaLabel}
            hourCycle={24}
            value={value}
            onChange={onChange}
            minValue={minValue}
            maxValue={maxValue}
            isInvalid={Boolean(errorMessage)}
            className={cn("w-36", className)}
        >
            <HeroTimeField.Group
                fullWidth
                className="flex items-center justify-between rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] px-3 shadow-[2px_2px_0px_#0A0A0A] transition-shadow focus-within:shadow-[3px_3px_0px_#FF5722]"
            >
                <HeroTimeField.Input className="flex items-center gap-0.5 font-mono text-xs text-[#0A0A0A]">
                    {(segment) => (
                        <HeroTimeField.Segment
                            segment={segment}
                            className="rounded px-0.5 tabular-nums outline-none focus:bg-[#0A0A0A] focus:text-[#FDFCFA] data-[placeholder=true]:text-[#737373]"
                        />
                    )}
                </HeroTimeField.Input>

                <HeroTimeField.Suffix>
                    <Clock className="size-4 text-[#0A0A0A]" />
                </HeroTimeField.Suffix>
            </HeroTimeField.Group>

            {errorMessage && (
                <FieldError className="mt-1 font-sans text-[11px] font-medium text-[#DC2626]">
                    {errorMessage}
                </FieldError>
            )}
        </HeroTimeField>
    )
}