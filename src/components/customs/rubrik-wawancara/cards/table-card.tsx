"use client"

import { Card } from "@heroui/react"
import { DEFAULT_RUBRIK_ITEMS, RUBRIK_LEVEL_COLUMNS } from "../constants"
import type { RubrikAspekItem, RubrikLevelColumn } from "../interfaces"

interface RubrikTableCardProps {
    items?: RubrikAspekItem[]
    columns?: RubrikLevelColumn[]
    isLoading?: boolean
}

export function RubrikTableCard({
    items = DEFAULT_RUBRIK_ITEMS,
    columns = RUBRIK_LEVEL_COLUMNS,
    isLoading = false,
}: RubrikTableCardProps) {
    return (
        <Card className="w-full overflow-hidden rounded-xl border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] p-0 text-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A]">
            <Card.Content className="p-0">
                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[720px] border-collapse text-left">
                        <thead>
                            <tr className="bg-[#0A0A0A] text-[#FDFCFA]">
                                <th className="w-[22%] px-4 py-2.5 font-mono text-xs font-semibold">
                                    Aspek
                                </th>
                                {columns.map((col) => (
                                    <th
                                        key={col.score}
                                        className="w-[19.5%] px-4 py-2.5 font-mono text-xs font-semibold"
                                    >
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td
                                        colSpan={columns.length + 1}
                                        className="px-4 py-8 text-center font-mono text-xs text-[#525252]"
                                    >
                                        Memuat rubrik wawancara...
                                    </td>
                                </tr>
                            ) : items.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length + 1}
                                        className="px-4 py-8 text-center font-mono text-xs text-[#525252]"
                                    >
                                        Belum ada rubrik penilaian.
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
                                            <td className="px-4 py-3.5 align-top font-sans text-xs font-medium text-[#262626]">
                                                {row.aspek}
                                            </td>
                                            <td className="px-4 py-3.5 align-top font-sans text-xs leading-relaxed text-[#0A0A0A]">
                                                {row.level1}
                                            </td>
                                            <td className="px-4 py-3.5 align-top font-sans text-xs leading-relaxed text-[#0A0A0A]">
                                                {row.level2}
                                            </td>
                                            <td className="px-4 py-3.5 align-top font-sans text-xs leading-relaxed text-[#0A0A0A]">
                                                {row.level3}
                                            </td>
                                            <td className="px-4 py-3.5 align-top font-sans text-xs leading-relaxed text-[#0A0A0A]">
                                                {row.level4}
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