"use client"

import { Card } from "@heroui/react"

interface EmptyStateCardProps {
    message?: string
}

export function EmptyStateCard({
    message = "Belum ada wawancara. Terima permintaan lebih dulu",
}: EmptyStateCardProps) {
    return (
        <Card className="w-full rounded-xl border-2 border-dashed border-[#0A0A0A]/40 bg-[#FDFCFA]/60 shadow-none">
            <Card.Content className="flex items-center justify-center px-4 py-8 text-center">
                <p className="font-sans text-xs text-[#525252]">{message}</p>
            </Card.Content>
        </Card>
    )
}