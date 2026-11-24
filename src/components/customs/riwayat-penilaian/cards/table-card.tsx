"use client"

import { Card } from "@heroui/react"
import type { RiwayatPenilaianItem } from "../interfaces"
import { KeputusanBadge } from "../widgets/badge"

interface RiwayatTableCardProps {
    items: RiwayatPenilaianItem[]
    isLoading?: boolean
}

export function RiwayatTableCard({
    items,
    isLoading = false,
}: RiwayatTableCardProps) {
    return (
        <Card className="w-full overflow-hidden rounded-xl border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] p-0 text-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A]">
            <Card.Content className="p-0">
                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse text-left">
                        <thead>
                            <tr className="bg-[#0A0A0A] text-[#FDFCFA]">
                                <th className="w-[24%] px-4 py-2.5 font-mono text-xs font-semibold">
                                    Anggota
                                </th>
                                <th className="w-[24%] px-4 py-2.5 font-mono text-xs font-semibold">
                                    Atribut
                                </th>
                                <th className="w-[24%] px-4 py-2.5 font-mono text-xs font-semibold">
                                    Keputusan
                                </th>
                                <th className="w-[28%] px-4 py-2.5 font-mono text-xs font-semibold">
                                    Catatan
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-4 py-8 text-center font-mono text-xs text-[#525252]"
                                    >
                                        Memuat riwayat penilaian...
                                    </td>
                                </tr>
                            ) : (
                                items.map((row, index) => {
                                    const isLast = index === items.length - 1
                                    return (
                                        <tr
                                            key={row.id}
                                            className={
                                                isLast
                                                    ? "bg-[#FDFCFA]"
                                                    : "border-b border-[#0A0A0A]/25 bg-[#FDFCFA]"
                                            }
                                        >
                                            <td className="px-4 py-3 align-middle font-sans text-xs font-medium text-[#262626]">
                                                {row.anggota}
                                            </td>
                                            <td className="px-4 py-3 align-middle font-sans text-xs text-[#0A0A0A]">
                                                {row.atribut}
                                            </td>
                                            <td className="px-4 py-3 align-middle">
                                                <KeputusanBadge status={row.keputusan} />
                                            </td>
                                            <td className="px-4 py-3 align-middle font-sans text-xs leading-relaxed text-[#0A0A0A]">
                                                {row.catatan}
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </Card.Content>
        </Card>
    )
}