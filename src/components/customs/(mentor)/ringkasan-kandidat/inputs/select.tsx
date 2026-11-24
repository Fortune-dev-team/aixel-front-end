"use client"

import { Label, ListBox, Select, type Key } from "@heroui/react"
import { cn } from "@/lib/utils"
import type { KandidatRingkasanDetail } from "../interfaces"

interface KandidatSelectProps {
    candidates: KandidatRingkasanDetail[]
    selectedId: string
    onChange: (id: string) => void
    isDisabled?: boolean
    className?: string
}

export function KandidatSelect({
    candidates,
    selectedId,
    onChange,
    isDisabled = false,
    className,
}: KandidatSelectProps) {
    const handleSelectionChange = (key: Key | null) => {
        onChange(key ? String(key) : "")
    }

    return (
        <Select
            aria-label="Kandidat"
            placeholder="Select option"
            selectedKey={selectedId || null}
            onSelectionChange={handleSelectionChange}
            isDisabled={isDisabled}
            className={cn("flex w-44 flex-col gap-1.5", className)}
        >
            <Label className="font-mono text-xs font-medium text-[#0A0A0A]">
                Kandidat
            </Label>

            <Select.Trigger className="flex w-full cursor-pointer items-center justify-between rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] font-sans text-xs text-[#0A0A0A] transition-shadow outline-none focus-visible:shadow-[2px_2px_0px_#FF5722] disabled:cursor-not-allowed disabled:opacity-50">
                <Select.Value className="truncate text-left data-[placeholder=true]:text-[#737373]" />
                <Select.Indicator className="size-3.5 shrink-0 text-[#0A0A0A]" />
            </Select.Trigger>

            <Select.Popover className="z-50 min-w-[var(--trigger-width)] rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-1 text-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] outline-none">
                <ListBox className="flex max-h-60 flex-col gap-0.5 overflow-y-auto outline-none">
                    {candidates.map((candidate) => (
                        <ListBox.Item
                            key={candidate.id}
                            id={candidate.id}
                            textValue={candidate.nama}
                            className="flex cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 font-sans text-xs text-[#0A0A0A] outline-none hover:bg-[#EFEFEB] data-[focused=true]:bg-[#EFEFEB] data-[selected=true]:bg-[#FF5722] data-[selected=true]:font-bold data-[selected=true]:text-[#FDFCFA]"
                        >
                            {candidate.nama}
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                    ))}
                </ListBox>
            </Select.Popover>
        </Select>
    )
}