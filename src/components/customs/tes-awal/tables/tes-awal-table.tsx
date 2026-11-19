"use client"

import { DataTable, type DataTableColumn } from "@/components/ui/data-table"
import { StatusChip } from "../widgets/status-chip"
import type { TesAwalResultRow, TesAwalTableProps } from "../interfaces"

export function TesAwalTable({ rows }: TesAwalTableProps) {
    const columns: DataTableColumn<TesAwalResultRow>[] = [
        {
            key: "atribut",
            label: "Atribut",
            width: "35%",
            render: (row) => (
                <span className="font-sans text-xs font-medium text-[#0A0A0A]">
                    {row.atribut}
                </span>
            ),
        },
        {
            key: "penilaianDiri",
            label: "Penilaian diri",
            width: "35%",
            render: (row) => (
                <span className="font-mono text-xs text-[#0A0A0A]">
                    {row.penilaianDiri}
                </span>
            ),
        },
        {
            key: "statusKasus",
            label: "Kasus singkat",
            width: "30%",
            render: (row) => <StatusChip status={row.statusKasus} />,
        },
    ]

    return (
        <DataTable
            ariaLabel="Hasil Tes Awal Atribut Tim"
            columns={columns}
            rows={rows}
            className="w-full"
        />
    )
}
