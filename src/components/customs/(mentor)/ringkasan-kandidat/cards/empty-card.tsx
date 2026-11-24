"use client"

import { Card } from "@heroui/react"

interface EmptyKandidatCardProps {
    message?: string
}

export function EmptyKandidatCard({
    message = "Belum ada data kandidat.",
}: EmptyKandidatCardProps) {
    return (
        <Card className="flex min-h-24 w-full items-center justify-center rounded-xl border border-dashed border-[#0A0A0A]/50 bg-[#FDFCFA] px-6 py-8 shadow-[2px_2px_0px_#0A0A0A]">
            <Card.Content className="flex items-center justify-center p-0">
                <p className="font-mono text-xs text-[#525252]">{message}</p>
            </Card.Content>
        </Card>
    )
}