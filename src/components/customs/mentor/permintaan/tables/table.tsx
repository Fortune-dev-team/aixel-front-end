"use client"

import { Table } from "@heroui/react"
import { PermintaanActionButton } from "../buttons/action-button"
import { EmptyStateCard } from "../cards/empty-card"
import type { PermintaanRow } from "../interfaces"
import { PermintaanStatusBadge } from "../widgets/status-badge"

interface PermintaanTableProps {
    rows: PermintaanRow[]
    onAccept: (id: string) => void
    onReject: (id: string) => void
}

export function PermintaanTable({
    rows,
    onAccept,
    onReject,
}: PermintaanTableProps) {
    if (rows.length === 0) {
        return <EmptyStateCard message="Belum ada permintaan." />
    }

    return (
        <Table className="w-full overflow-hidden rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-0 shadow-[3px_3px_0px_#0A0A0A]">
            <Table.ScrollContainer className="w-full overflow-x-auto p-0">
                <Table.Content
                    aria-label="Daftar permintaan wawancara"
                    className="w-full border-collapse text-left"
                >
                    <Table.Header className="rounded-none bg-[#0A0A0A] text-[#FDFCFA] [&>tr]:rounded-none">
                        <Table.Column
                            isRowHeader
                            className="w-[30%] rounded-none bg-[#0A0A0A] px-4 py-3 font-mono text-xs font-bold text-[#FDFCFA] before:hidden after:hidden"
                        >
                            Kandidat
                        </Table.Column>
                        <Table.Column className="w-[25%] rounded-none bg-[#0A0A0A] px-4 py-3 font-mono text-xs font-bold text-[#FDFCFA] before:hidden after:hidden">
                            Atribut
                        </Table.Column>
                        <Table.Column className="w-[22%] rounded-none bg-[#0A0A0A] px-4 py-3 font-mono text-xs font-bold text-[#FDFCFA] before:hidden after:hidden">
                            Status
                        </Table.Column>
                        <Table.Column className="w-[23%] rounded-none bg-[#0A0A0A] px-4 py-3 font-mono text-xs font-bold text-[#FDFCFA] before:hidden after:hidden">
                            Aksi
                        </Table.Column>
                    </Table.Header>

                    <Table.Body
                        items={rows}
                        className="rounded-none bg-transparent p-0 shadow-none"
                    >
                        {(row) => (
                            <Table.Row
                                id={row.id}
                                className="border-b border-[#0A0A0A]/20 bg-[#FDFCFA] transition-colors last:border-b-0 hover:bg-[#F5F5F2]/60"
                            >
                                <Table.Cell className="px-4 py-3 font-sans text-xs font-medium text-[#0A0A0A]">
                                    {row.kandidat}
                                </Table.Cell>

                                <Table.Cell className="px-4 py-3 font-sans text-xs text-[#262626]">
                                    {row.atribut}
                                </Table.Cell>

                                <Table.Cell className="px-4 py-3">
                                    <PermintaanStatusBadge status={row.status} />
                                </Table.Cell>

                                <Table.Cell className="px-4 py-3">
                                    {row.status === "Menunggu" ? (
                                        <div className="flex items-center gap-2">
                                            <PermintaanActionButton
                                                variant="tolak"
                                                onPress={() => onReject(row.id)}
                                            />
                                            <PermintaanActionButton
                                                variant="terima"
                                                onPress={() => onAccept(row.id)}
                                            />
                                        </div>
                                    ) : null}
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    )
}