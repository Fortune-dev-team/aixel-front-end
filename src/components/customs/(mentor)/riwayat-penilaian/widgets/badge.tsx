"use client"

import { Chip } from "@heroui/react"
import { cn } from "@/lib/utils"
import { KEPUTUSAN_BADGE_STYLES } from "../constants"
import type { RiwayatKeputusanStatus } from "../interfaces"

interface KeputusanBadgeProps {
    status: RiwayatKeputusanStatus
    className?: string
}

export function KeputusanBadge({ status, className }: KeputusanBadgeProps) {
    return (
        <Chip
            size="sm"
            className={cn(
                "inline-flex h-auto items-center rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium",
                KEPUTUSAN_BADGE_STYLES[status],
                className
            )}
        >
            {status}
        </Chip>
    )
}