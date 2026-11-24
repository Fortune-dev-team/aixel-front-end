"use client"

import { Button } from "@heroui/react"
import { cn } from "@/lib/utils"

interface TandaiDibacaButtonProps {
    onPress?: () => void
    isDisabled?: boolean
    isLoading?: boolean
    className?: string
}

export function TandaiDibacaButton({
    onPress,
    isDisabled = false,
    isLoading = false,
    className,
}: TandaiDibacaButtonProps) {
    return (
        <Button
            type="button"
            size="sm"
            isDisabled={isDisabled || isLoading}
            onPress={onPress}
            className={cn(
                "h-8 cursor-pointer rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] px-3.5 font-mono text-xs font-semibold text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] transition-transform hover:-translate-x-px hover:-translate-y-px hover:bg-[#EFEFEB] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
        >
            {isLoading ? "Memproses..." : "Tandai Semua Dibaca"}
        </Button>
    )
}