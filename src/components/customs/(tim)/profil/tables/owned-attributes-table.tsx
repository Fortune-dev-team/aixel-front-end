"use client";

import { Chip } from "@/components/ui/Chip";
import { DataTable } from "@/components/ui/data-table";
import type { OwnedAttributeItem } from "../interfaces";

interface OwnedAttributesTableProps {
    data: OwnedAttributeItem[];
}

export function OwnedAttributesTable({ data }: OwnedAttributesTableProps) {
    const columns = [
        { key: "attribute", label: "Atribut" },
        { key: "source", label: "Asal" },
        { key: "passedDate", label: "Tanggal lulus" },
        { key: "approvedBy", label: "Mentor yang menyetujui" },
        { key: "expiresAt", label: "Berakhir" },
        {
            key: "status",
            label: "Status",
            render: (row: OwnedAttributeItem) => (
                <Chip variant={row.status === "Aktif" ? "green" : "red"}>
                    {row.status}
                </Chip>
            ),
        },
    ];

    return (
        <section className="mt-6">
            <h2 className="mb-3 font-mono text-sm font-bold text-[#0A0A0A]">
                Atribut dimiliki
            </h2>
            <DataTable<OwnedAttributeItem>
                ariaLabel="Tabel atribut dimiliki"
                columns={columns}
                rows={data}
            />
        </section>
    );
}