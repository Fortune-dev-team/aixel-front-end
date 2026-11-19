"use client"

import { Card } from "@heroui/react"

interface StatCardProps {
    label: string
    value: string
}

export function StatCard({ label, value }: StatCardProps) {
    return (
        <Card className="rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-4 shadow-[3px_3px_0px_#0A0A0A]">
            <Card.Content className="p-0">
                <div className="font-mono text-2xl font-bold text-[#FF5722]">
                    {value}
                </div>
                <div className="mt-1 font-sans text-xs text-[#404040]">{label}</div>
            </Card.Content>
        </Card>
    )
}