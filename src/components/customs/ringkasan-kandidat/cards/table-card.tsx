"use client"

import { Card } from "@heroui/react"
import { mapDetailToRows } from "../constants"
import type { KandidatRingkasanDetail } from "../interfaces"

interface RingkasanTableCardProps {
    detail: KandidatRingkasanDetail | null
    isLoading?: boolean
}

export function RingkasanTableCard({
    detail,
    isLoading = false,
}: RingkasanTableCardProps) {
    const rows = detail ? mapDetailToRows(detail) : []

    return (
        <Card className="w-full overflow-hidden rounded-xl border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] p-0 text-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A]">
            <Card.Content className="p-0">
                <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="bg-[#0A0A0A] text-[#FDFCFA]">
                                <th className="w-[36%] px-4 py-2.5 font-mono text-xs font-semibold">
                                    Bagian
                                </th>
                                <th className="w-[64%] px-4 py-2.5 font-mono text-xs font-semibold">
                                    Isi
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td
                                        colSpan={2}
                                        className="px-4 py-6 text-center font-mono text-xs text-[#525252]"
                                    >
                                        Memuat ringkasan kandidat...
                                    </td>
                                </tr>
                            ) : !detail ? (
                                <tr>
                                    <td
                                        colSpan={2}
                                        className="px-4 py-6 text-center font-mono text-xs text-[#525252]"
                                    >
                                        Pilih kandidat pada dropdown di atas untuk melihat ringkasan.
                                    </td>
                                </tr>
                            ) : (
                                rows.map((row, index) => {
                                    const isLast = index === rows.length - 1
                                    return (
                                        <tr
                                            key={row.bagian}
                                            className={
                                                isLast
                                                    ? "bg-[#FDFCFA]"
                                                    : "border-b border-[#0A0A0A]/25 bg-[#FDFCFA]"
                                            }
                                        >
                                            <td className="px-4 py-3 align-top font-sans text-xs font-medium text-[#262626]">
                                                {row.bagian}
                                            </td>
                                            <td className="px-4 py-3 align-top font-sans text-xs leading-relaxed text-[#0A0A0A]">
                                                {row.isi}
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