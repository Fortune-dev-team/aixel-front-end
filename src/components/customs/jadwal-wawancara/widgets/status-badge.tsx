"use client"

import { Chip } from "@heroui/react"
import { cn } from "@/lib/utils"
import { JADWAL_STATUS_STYLES } from "../constants"
import type { JadwalStatusType } from "../interfaces"

interface JadwalStatusBadgeProps {
    status: JadwalStatusType
    className?: string
}

export function JadwalStatusBadge({
    status,
    className,
}: JadwalStatusBadgeProps) {
    return (
        <Chip
            size="sm"
            className={cn(
                "inline-flex h-auto shrink-0 items-center rounded-md border px-2.5 py-0.5 font-mono text-[11px] font-medium",
                JADWAL_STATUS_STYLES[status],
                className
            )}
        >
            {status}
        </Chip>
    )
}