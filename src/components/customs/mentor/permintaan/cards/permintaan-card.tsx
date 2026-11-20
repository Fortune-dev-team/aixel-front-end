"use client"

import { Card } from "@heroui/react"
import { PermintaanActionButtons } from "../buttons/action-button"
import type { PermintaanItem } from "../interfaces"
import { PermintaanStatusBadge } from "../widgets/status-badge"

interface PermintaanCardProps {
    data: PermintaanItem
    onApprove: (id: string) => void
    onOpenReject: (item: PermintaanItem) => void
    onOpenPropose: (item: PermintaanItem) => void
    isProcessing?: boolean
}

export function PermintaanCard({
    data,
    onApprove,
    onOpenReject,
    onOpenPropose,
    isProcessing = false,
}: PermintaanCardProps) {
    const isPending = data.status === "Menunggu"

    return (
        <Card className="w-full rounded-xl border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] px-5 py-4 text-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A]">
            <Card.Content className="flex flex-col p-0">
                <div className="flex flex-row items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-mono text-xs font-medium text-[#0A0A0A] sm:text-sm">
                            {data.peranAtribut} · {data.namaMentee}
                        </h2>
                        <p className="font-sans text-xs text-[#404040]">
                            jadwal diajukan:{" "}
                            <span className="font-medium text-[#0A0A0A]">
                                {data.jadwalDiajukan}
                            </span>
                        </p>
                        {data.catatan && (
                            <p className="font-sans text-xs text-[#525252]">
                                catatan: {data.catatan}
                            </p>
                        )}
                    </div>

                    <PermintaanStatusBadge status={data.status} />
                </div>

                {isPending && (
                    <PermintaanActionButtons
                        isDisabled={isProcessing}
                        onApprove={() => onApprove(data.id)}
                        onOpenReject={() => onOpenReject(data)}
                        onOpenPropose={() => onOpenPropose(data)}
                    />
                )}
            </Card.Content>
        </Card>
    )
}