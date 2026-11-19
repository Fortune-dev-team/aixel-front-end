"use client"

import { Button } from "@heroui/react"
import { cn } from "@/lib/utils"

interface KirimPenilaianButtonProps {
    onPress?: () => void
    isDisabled?: boolean
    isLoading?: boolean
    className?: string
}

export function KirimPenilaianButton({
    onPress,
    isDisabled = false,
    isLoading = false,
    className,
}: KirimPenilaianButtonProps) {
    return (
        <Button
            type="button"
            size="sm"
            isDisabled={isDisabled || isLoading}
            onPress={onPress}
            className={cn(
                "h-9 cursor-pointer rounded-lg border-2 border-[#0A0A0A] bg-[#FF5722] px-4 font-mono text-xs font-semibold text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] transition-transform hover:-translate-x-px hover:-translate-y-px hover:bg-[#FF6A3D] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
        >
            {isLoading ? "Mengirim..." : "Kirim penilaian"}
        </Button>
    )
}