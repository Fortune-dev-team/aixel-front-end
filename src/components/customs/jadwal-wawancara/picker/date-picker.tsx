"use client"

import * as React from "react"
import {
    Calendar,
    DateField,
    DatePicker as HeroDatePicker,
    FieldError,
    I18nProvider,
    type DateValue,
} from "@heroui/react"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface DatePickerProps {
    name?: string
    ariaLabel?: string
    value?: DateValue | null
    onChange?: (value: DateValue | null) => void
    minValue?: DateValue
    maxValue?: DateValue
    errorMessage?: string
    className?: string
}

export function DatePicker({
    name = "date",
    ariaLabel = "Pilih tanggal",
    value,
    onChange,
    minValue,
    maxValue,
    errorMessage,
    className,
}: DatePickerProps) {
    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    // Render static placeholder during SSR/prerender to avoid React Aria's internal Date.now()
    if (!isMounted) {
        return (
            <div
                aria-hidden="true"
                className={cn(
                    "flex w-48 items-center justify-between rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] px-3 shadow-[2px_2px_0px_#0A0A0A]",
                    className
                )}
            >
                <span className="font-mono text-xs text-[#737373]">dd/mm/yyyy</span>
                <CalendarIcon className="size-4 text-[#0A0A0A]" />
            </div>
        )
    }

    return (
        <I18nProvider locale="id-ID">
            <HeroDatePicker
                name={name}
                aria-label={ariaLabel}
                value={value}
                onChange={onChange}
                minValue={minValue}
                maxValue={maxValue}
                isInvalid={Boolean(errorMessage)}
                className={cn("w-48", className)}
            >
                <DateField.Group
                    fullWidth
                    className="flex items-center justify-between rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] px-3 shadow-[2px_2px_0px_#0A0A0A] transition-shadow focus-within:shadow-[3px_3px_0px_#FF5722]"
                >
                    <DateField.Input className="flex items-center font-mono text-xs text-[#0A0A0A]">
                        {(segment) => (
                            <DateField.Segment
                                segment={segment}
                                className="rounded px-0.5 text-[#0A0A0A] tabular-nums outline-none focus:bg-[#0A0A0A] focus:text-[#FDFCFA] data-[placeholder=true]:text-[#737373] data-[type=literal]:px-0 data-[type=literal]:text-[#525252]"
                            />
                        )}
                    </DateField.Input>

                    <DateField.Suffix>
                        <HeroDatePicker.Trigger className="cursor-pointer rounded-md p-1 text-[#0A0A0A] transition-colors hover:bg-[#EFEFEB]">
                            <HeroDatePicker.TriggerIndicator className="size-4 text-[#0A0A0A]" />
                        </HeroDatePicker.Trigger>
                    </DateField.Suffix>
                </DateField.Group>

                {errorMessage && (
                    <FieldError className="mt-1 font-sans text-[11px] font-medium text-[#DC2626]">
                        {errorMessage}
                    </FieldError>
                )}

                <HeroDatePicker.Popover className="z-50 rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-4 text-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] outline-none">
                    <Calendar aria-label={ariaLabel} className="w-64">
                        <Calendar.Header className="mb-3 flex items-center justify-between gap-1">
                            <Calendar.YearPickerTrigger className="flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 font-mono text-xs font-bold text-[#0A0A0A] hover:bg-[#EFEFEB]">
                                <Calendar.YearPickerTriggerHeading />
                                <Calendar.YearPickerTriggerIndicator className="size-3.5" />
                            </Calendar.YearPickerTrigger>

                            <div className="flex items-center gap-1.5">
                                <Calendar.NavButton
                                    slot="previous"
                                    className="flex size-7 cursor-pointer items-center justify-center rounded-md border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] active:translate-x-px active:translate-y-px active:shadow-none"
                                />
                                <Calendar.NavButton
                                    slot="next"
                                    className="flex size-7 cursor-pointer items-center justify-center rounded-md border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] active:translate-x-px active:translate-y-px active:shadow-none"
                                />
                            </div>
                        </Calendar.Header>

                        <Calendar.Grid className="w-full border-collapse">
                            <Calendar.GridHeader>
                                {(day) => (
                                    <Calendar.HeaderCell className="pb-2 text-center font-mono text-[11px] font-bold text-[#525252]">
                                        {day}
                                    </Calendar.HeaderCell>
                                )}
                            </Calendar.GridHeader>
                            <Calendar.GridBody>
                                {(date) => (
                                    <Calendar.Cell
                                        date={date}
                                        className="mx-auto flex size-8 cursor-pointer items-center justify-center rounded-md font-mono text-xs font-medium text-[#0A0A0A] outline-none hover:bg-[#EFEFEB] data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-35 data-[outside-month=true]:text-[#A3A3A3] data-[selected=true]:border-[1.5px] data-[selected=true]:border-[#0A0A0A] data-[selected=true]:bg-[#FF5722] data-[selected=true]:font-bold data-[selected=true]:text-[#FDFCFA] data-[today=true]:underline"
                                    />
                                )}
                            </Calendar.GridBody>
                        </Calendar.Grid>

                        <Calendar.YearPickerGrid>
                            <Calendar.YearPickerGridBody>
                                {({ year }) => (
                                    <Calendar.YearPickerCell
                                        year={year}
                                        className="cursor-pointer rounded-md py-1.5 text-center font-mono text-xs font-medium text-[#0A0A0A] hover:bg-[#EFEFEB] data-[selected=true]:border-[1.5px] data-[selected=true]:border-[#0A0A0A] data-[selected=true]:bg-[#FF5722] data-[selected=true]:font-bold data-[selected=true]:text-[#FDFCFA]"
                                    />
                                )}
                            </Calendar.YearPickerGridBody>
                        </Calendar.YearPickerGrid>
                    </Calendar>
                </HeroDatePicker.Popover>
            </HeroDatePicker>
        </I18nProvider>
    )
}