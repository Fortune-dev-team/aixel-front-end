"use client"

import { Button } from "@heroui/react"
import { cn } from "@/lib/utils"

interface KonfirmasiJadwalButtonProps {
    onPress?: () => void
    isDisabled?: boolean
    isLoading?: boolean
    className?: string
}

export function KonfirmasiJadwalButton({
    onPress,
    isDisabled = false,
    isLoading = false,
    className,
}: KonfirmasiJadwalButtonProps) {
    return (
        <Button
            type="button"
            size="sm"
            isDisabled={isDisabled || isLoading}
            onPress={onPress}
            className={cn(
                "cursor-pointer rounded-lg border-2 border-[#0A0A0A] bg-[#FF5722] px-5 font-mono text-xs font-semibold text-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] transition-transform hover:-translate-x-px hover:-translate-y-px hover:bg-[#FF6A3D] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
        >
            {isLoading ? "Menyimpan..." : "Konfirmasi waktu"}
        </Button>
    )
}