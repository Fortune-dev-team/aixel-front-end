"use client"

import { DataTable, type DataTableColumn } from "@/components/ui/data-table"
import { Chip } from "@/components/ui/Chip"
import { EmptyState } from "@/components/ui/EmptyState"
import type { OwnedAttributeRow } from "../interfaces"

interface OwnedAttributesTableProps {
    rows: OwnedAttributeRow[]
}

const COLUMNS: DataTableColumn<OwnedAttributeRow>[] = [
    {
        key: "atribut",
        label: "Atribut",
        width: "20%",
        render: (row) => (
            <span className="font-sans text-xs font-medium text-[#0A0A0A]">
                {row.atribut}
            </span>
        ),
    },
    {
        key: "keterangan",
        label: "Keterangan",
        width: "18%",
        render: (row) => (
            <span className="font-sans text-xs text-[#262626]">{row.keterangan}</span>
        ),
    },
    {
        key: "tanggalLulus",
        label: "Tanggal Lulus",
        width: "16%",
        render: (row) => (
            <span className="font-mono text-xs text-[#262626]">
                {row.tanggalLulus}
            </span>
        ),
    },
    {
        key: "mentor",
        label: "Mentor",
        width: "18%",
        render: (row) => (
            <span className="font-sans text-xs text-[#262626]">{row.mentor}</span>
        ),
    },
    {
        key: "berlakuHingga",
        label: "Berlaku Hingga",
        width: "16%",
        render: (row) => (
            <span className="font-mono text-xs text-[#262626]">
                {row.berlakuHingga}
            </span>
        ),
    },
    {
        key: "status",
        label: "Status",
        width: "12%",
        render: () => <Chip variant="green">Aktif</Chip>,
    },
]

export function OwnedAttributesTable({ rows }: OwnedAttributesTableProps) {
    return (
        <section className="mt-8 w-full">
            <h2 className="mb-3 font-sans text-sm font-bold text-[#0A0A0A]">
                Atribut dimiliki
            </h2>

            {rows.length === 0 ? (
                <EmptyState message="Belum memiliki atribut. Lulus Level 3 untuk mendapatkannya." />
            ) : (
                <DataTable
                    ariaLabel="Daftar atribut yang dimiliki"
                    columns={COLUMNS}
                    rows={rows}
                    className="w-full"
                />
            )}
        </section>
    )
}
