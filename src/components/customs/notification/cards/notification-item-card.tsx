"use client"

import { Button, Card } from "@heroui/react"
import { AlertCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { NotifikasiItem } from "../interfaces"

interface NotifikasiItemCardProps {
    item: NotifikasiItem
    onDismiss?: (id: string) => void
    isDisabled?: boolean
}

export function NotifikasiItemCard({
    item,
    onDismiss,
    isDisabled = false,
}: NotifikasiItemCardProps) {
    return (
        <Card
            className={cn(
                "w-full rounded-lg border border-[#0A0A0A]/60 px-3.5 py-2.5 text-[#0A0A0A] shadow-none transition-colors",
                item.isRead ? "bg-[#FDFCFA]" : "bg-[#FBE4DF]"
            )}
        >
            <Card.Content className="flex flex-row items-center justify-between gap-4 p-0">
                <div className="flex min-w-0 items-center gap-2.5">
                    <span
                        aria-hidden="true"
                        className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#DC2626] text-[#FDFCFA]"
                    >
                        <AlertCircle className="size-3 stroke-[2.5]" />
                    </span>

                    <p className="truncate font-sans text-xs font-medium text-[#0A0A0A]">
                        {item.pesan}
                    </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                    <span className="font-mono text-[11px] text-[#737373]">
                        {item.waktu}
                    </span>

                    <Button
                        type="button"
                        isIconOnly
                        size="sm"
                        aria-label="Hapus notifikasi"
                        isDisabled={isDisabled}
                        onPress={() => onDismiss?.(item.id)}
                        className="size-5 min-w-5 cursor-pointer rounded border-0 bg-transparent p-0 text-[#525252] transition-colors hover:text-[#0A0A0A]"
                    >
                        <X className="size-3.5" />
                    </Button>
                </div>
            </Card.Content>
        </Card>
    )
}