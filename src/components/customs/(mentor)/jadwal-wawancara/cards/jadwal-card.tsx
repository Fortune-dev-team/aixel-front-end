"use client"

import { Card } from "@heroui/react"
import type { JadwalWawancaraItem } from "../interfaces"
import { JadwalStatusBadge } from "../widgets/status-badge"

interface JadwalCardProps {
    data: JadwalWawancaraItem
}

export function JadwalCard({ data }: JadwalCardProps) {
    return (
        <Card className="w-full rounded-xl border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] px-5 py-4 text-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A]">
            <Card.Content className="flex flex-row items-start justify-between gap-4 p-0">
                <div className="flex flex-col gap-1.5">
                    <h2 className="font-mono text-xs font-semibold text-[#0A0A0A] sm:text-sm">
                        {data.peranAtribut} · {data.namaMentee}
                    </h2>
                    <p className="font-sans text-xs text-[#0A0A0A]">
                        jadwal:{" "}
                        <span className="text-[#0A0A0A]">
                            {data.jadwalFormatted}
                        </span>
                    </p>
                </div>

                <JadwalStatusBadge status={data.status} />
            </Card.Content>
        </Card>
    )
}