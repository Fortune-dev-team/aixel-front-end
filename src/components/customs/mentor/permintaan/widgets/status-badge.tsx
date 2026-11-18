"use client"

import { Chip } from "@heroui/react"
import { cn } from "@/lib/utils"
import type { PermintaanStatus } from "../interfaces"

interface PermintaanStatusBadgeProps {
    status: PermintaanStatus
}

const STATUS_CONFIG: Record<
    PermintaanStatus,
    { color: "warning" | "success" | "danger"; className: string }
> = {
    Menunggu: {
        color: "warning",
        className: "border-[#D97706] bg-[#FEF3C7] text-[#92400E]",
    },
    Diterima: {
        color: "success",
        className: "border-[#16A34A] bg-[#DCFCE7] text-[#166534]",
    },
    Ditolak: {
        color: "danger",
        className: "border-[#DC2626] bg-[#FEE2E2] text-[#991B1B]",
    },
}

export function PermintaanStatusBadge({
    status,
}: PermintaanStatusBadgeProps) {
    const config = STATUS_CONFIG[status]

    return (
        <Chip
            size="sm"
            variant="soft"
            color={config.color}
            className={cn(
                "rounded-md border px-2 py-0.5 font-mono text-[11px] font-semibold",
                config.className
            )}
        >
            {status}
        </Chip>
    )
}