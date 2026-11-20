"use client"

import { Chip } from "@heroui/react"
import { cn } from "@/lib/utils"
import { PERMINTAAN_STATUS_STYLES } from "../constants"
import type { PermintaanStatusType } from "../interfaces"

interface PermintaanStatusBadgeProps {
    status: PermintaanStatusType
    className?: string
}

export function PermintaanStatusBadge({
    status,
    className,
}: PermintaanStatusBadgeProps) {
    return (
        <Chip
            size="sm"
            className={cn(
                "inline-flex h-auto shrink-0 items-center rounded-md border px-2.5 py-0.5 font-mono text-[11px] font-medium",
                PERMINTAAN_STATUS_STYLES[status],
                className
            )}
        >
            {status}
        </Chip>
    )
}