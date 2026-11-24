"use client"

import { Button } from "@heroui/react"
import { cn } from "@/lib/utils"
import type { RiwayatViewState } from "../interfaces"

interface RiwayatPenilaianHeaderProps {
    viewState?: RiwayatViewState
    onViewStateChange?: (state: RiwayatViewState) => void
}

export function RiwayatPenilaianHeader({
    viewState,
    onViewStateChange,
}: RiwayatPenilaianHeaderProps) {
    return (
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
                <h1 className="font-heading text-xl font-extrabold tracking-tight text-[#0A0A0A]">
                    Riwayat Penilaian
                </h1>
                <p className="mt-1 font-sans text-xs text-[#404040]">
                    Wawancara yang pernah dilakukan.
                </p>
            </div>

            {viewState && onViewStateChange && (
                <div className="flex items-center gap-1.5 rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] p-1 shadow-[2px_2px_0px_#0A0A0A]">
                    {(
                        [
                            { key: "active", label: "Ada Riwayat" },
                            { key: "empty", label: "Kosong" },
                        ] as const
                    ).map((item) => {
                        const isActive = viewState === item.key
                        return (
                            <Button
                                key={item.key}
                                type="button"
                                size="sm"
                                onPress={() => onViewStateChange(item.key)}
                                className={cn(
                                    "h-auto cursor-pointer rounded-md px-2.5 py-1 font-mono text-[11px] font-bold transition-colors",
                                    isActive
                                        ? "bg-[#0A0A0A] text-[#FDFCFA]"
                                        : "bg-transparent text-[#0A0A0A] hover:bg-[#EFEFEB]"
                                )}
                            >
                                {item.label}
                            </Button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}