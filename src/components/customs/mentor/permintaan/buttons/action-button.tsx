"use client"

import { Button } from "@heroui/react"
import { cn } from "@/lib/utils"

export type PermintaanActionVariant = "tolak" | "terima"

interface PermintaanActionButtonProps {
    variant: PermintaanActionVariant
    onPress: () => void
}

const VARIANT_CONFIG: Record<
    PermintaanActionVariant,
    { label: string; className: string }
> = {
    tolak: {
        label: "Tolak",
        className: "bg-[#DC2626] text-[#FDFCFA] hover:bg-[#B91C1C]",
    },
    terima: {
        label: "Terima",
        className: "bg-[#16A34A] text-[#FDFCFA] hover:bg-[#15803D]",
    },
}

export function PermintaanActionButton({
    variant,
    onPress,
}: PermintaanActionButtonProps) {
    const config = VARIANT_CONFIG[variant]

    return (
        <Button
            size="sm"
            onPress={onPress}
            className={cn(
                "h-auto cursor-pointer rounded-md border-[1.5px] border-[#0A0A0A] px-2.5 py-1 font-mono text-[11px] font-bold shadow-[2px_2px_0px_#0A0A0A] transition-transform hover:-translate-x-px hover:-translate-y-px active:translate-x-px active:translate-y-px active:shadow-none",
                config.className
            )}
        >
            {config.label}
        </Button>
    )
}