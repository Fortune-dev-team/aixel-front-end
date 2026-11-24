"use client";

import { Button } from "@/components/ui/button";
import { Chip, type ChipVariant } from "@/components/ui/Chip";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import type {
    AttributeRenewalItem,
    AttributeRenewalStatus,
} from "../interfaces";

interface PerpanjanganTableProps {
    items: AttributeRenewalItem[];
    onUploadClick: (item: AttributeRenewalItem) => void;
}

function getStatusBadge(status: AttributeRenewalStatus): { label: string; variant: ChipVariant } {
    switch (status) {
        case "active":
            return {
                label: "Aktif",
                variant: "green",
            };
        case "expiring_soon":
            return {
                label: "Hampir habis",
                variant: "amber",
            };
        case "pending_review":
            return {
                label: "Menunggu tinjauan",
                variant: "amber",
            };
        case "rejected":
            return {
                label: "Ditolak",
                variant: "red",
            };
    }
}

export function PerpanjanganTable({
    items,
    onUploadClick,
}: PerpanjanganTableProps) {
    const hasNotes = items.some((item) => Boolean(item.note));

    const columns: DataTableColumn<AttributeRenewalItem>[] = [
        {
            key: "attributeTitle",
            label: "Atribut",
            width: "25%",
            render: (row) => (
                <span className="font-sans text-xs font-medium text-[#0A0A0A]">
                    {row.attributeTitle}
                </span>
            ),
        },
        {
            key: "expiresAt",
            label: "Berakhir",
            width: "18%",
            render: (row) => (
                <span className="font-mono text-xs text-[#262626]">
                    {row.expiresAt}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            width: "20%",
            render: (row) => {
                const badge = getStatusBadge(row.status);
                return (
                    <Chip variant={badge.variant}>
                        {badge.label}
                    </Chip>
                );
            },
        },
        ...(hasNotes
            ? [
                {
                    key: "note",
                    label: "Catatan",
                    width: "22%",
                    render: (row: AttributeRenewalItem) => (
                        <span className="font-sans text-xs leading-relaxed text-[#404040]">
                            {row.note ?? "-"}
                        </span>
                    ),
                },
            ]
            : []),
        {
            key: "aksi",
            label: "Aksi",
            width: "15%",
            render: (row) => {
                const canUpload =
                    row.status === "expiring_soon" || row.status === "rejected";

                return canUpload ? (
                    <Button
                        variant="coral"
                        size="sm"
                        onPress={() => onUploadClick(row)}
                    >
                        Unggah bukti
                    </Button>
                ) : (
                    <Button
                        variant="white"
                        size="sm"
                        className="pointer-events-none opacity-55 select-none"
                    >
                        Unggah bukti
                    </Button>
                );
            },
        },
    ];

    return (
        <DataTable
            ariaLabel="Tabel Perpanjangan Atribut"
            columns={columns}
            rows={items}
            className="w-full"
        />
    );
}
