"use client"

import { Button } from "@heroui/react"

interface PermintaanActionButtonsProps {
    onApprove: () => void
    onOpenReject: () => void
    onOpenPropose: () => void
    isDisabled?: boolean
}

export function PermintaanActionButtons({
    onApprove,
    onOpenReject,
    onOpenPropose,
    isDisabled = false,
}: PermintaanActionButtonsProps) {
    return (
        <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button
                type="button"
                size="sm"
                isDisabled={isDisabled}
                onPress={onApprove}
                className="h-7 cursor-pointer rounded-md border-[1.5px] border-[#0A0A0A] bg-[#16A34A] px-3 font-mono text-[11px] font-medium text-[#FDFCFA] shadow-[2px_2px_0px_#0A0A0A] transition-transform hover:-translate-x-px hover:-translate-y-px active:translate-x-px active:translate-y-px active:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
            >
                Setujui
            </Button>

            <Button
                type="button"
                size="sm"
                isDisabled={isDisabled}
                onPress={onOpenReject}
                className="h-7 cursor-pointer rounded-md border-[1.5px] border-[#0A0A0A] bg-[#DC2626] px-3 font-mono text-[11px] font-medium text-[#FDFCFA] shadow-[2px_2px_0px_#0A0A0A] transition-transform hover:-translate-x-px hover:-translate-y-px active:translate-x-px active:translate-y-px active:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
            >
                Tolak
            </Button>

            <Button
                type="button"
                size="sm"
                isDisabled={isDisabled}
                onPress={onOpenPropose}
                className="h-7 cursor-pointer rounded-md border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] px-3 font-mono text-[11px] font-medium text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] transition-transform hover:-translate-x-px hover:-translate-y-px hover:bg-[#EFEFEB] active:translate-x-px active:translate-y-px active:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
            >
                Usulkan jadwal lain
            </Button>
        </div>
    )
}