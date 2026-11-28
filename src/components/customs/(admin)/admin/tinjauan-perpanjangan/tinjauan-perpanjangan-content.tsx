"use client";

import React, { useState } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/button";
import { ReasonModal } from "../widgets/reason-modal";

interface ExtensionReviewItem {
    id: string;
    anggota: string;
    atribut: string;
    bukti: string;
    status: "Menunggu tinjauan" | "Diterima" | "Ditolak";
}

const INITIAL_DATA: ExtensionReviewItem[] = [
    {
        id: "1",
        anggota: "Raka Mahendra",
        atribut: "Kepemimpinan",
        bukti: "laporan-proyek-q3.pdf",
        status: "Menunggu tinjauan",
    },
];

export function TinjauanPerpanjanganContent() {
    const [rows, setRows] = useState<ExtensionReviewItem[]>(INITIAL_DATA);
    const [rejectTarget, setRejectTarget] = useState<ExtensionReviewItem | null>(null);

    const handleApprove = (id: string) => {
        setRows((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, status: "Diterima" } : item
            )
        );
    };

    const handleReject = () => {
        if (!rejectTarget) return;
        setRows((prev) =>
            prev.map((item) =>
                item.id === rejectTarget.id ? { ...item, status: "Ditolak" } : item
            )
        );
        setRejectTarget(null);
    };

    const columns: DataTableColumn<ExtensionReviewItem>[] = [
        { key: "anggota", label: "Anggota", align: "left" },
        { key: "atribut", label: "Atribut", align: "left" },
        {
            key: "bukti",
            label: "Bukti",
            align: "left",
            render: (row) => (
                <span className="font-mono text-xs text-black underline cursor-pointer hover:text-[#ff4a1c]">
                    {row.bukti}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            align: "left",
            render: (row) => {
                const variant =
                    row.status === "Diterima"
                        ? "green"
                        : row.status === "Ditolak"
                          ? "red"
                          : "amber";
                return <Chip variant={variant}>{row.status}</Chip>;
            },
        },
        {
            key: "id",
            label: "Aksi",
            align: "left",
            render: (row) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="green"
                        size="sm"
                        onPress={() => handleApprove(row.id)}
                    >
                        Terima
                    </Button>
                    <Button
                        variant="red"
                        size="sm"
                        onPress={() => setRejectTarget(row)}
                    >
                        Tolak
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="font-mono text-2xl md:text-3xl font-black text-black tracking-tight">
                    Tinjauan Perpanjangan
                </h1>
                <p className="mt-1 text-sm text-zinc-600">
                    Periksa bukti kontribusi proyek, lalu terima atau tolak perpanjangan.
                </p>
            </div>

            {/* Table */}
            <DataTable<ExtensionReviewItem>
                ariaLabel="Tabel Tinjauan Perpanjangan"
                columns={columns}
                rows={rows}
            />

            <ReasonModal
                isOpen={Boolean(rejectTarget)}
                onOpenChange={(open) => {
                    if (!open) setRejectTarget(null);
                }}
                title="Tolak perpanjangan atribut"
                subtitle="Alasan Anda akan dibaca team sebelum mempertimbangkan pengajuan berikutnya."
                confirmLabel="Kirim penolakan"
                onSubmit={handleReject}
            />
        </div>
    );
}
