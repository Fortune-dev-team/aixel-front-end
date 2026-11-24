"use client";

import React from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/button";

interface ExtensionReviewItem {
    id: string;
    anggota: string;
    atribut: string;
    bukti: string;
    status: "Menunggu tinjauan" | "Diterima" | "Ditolak";
}

const COLUMNS: DataTableColumn<ExtensionReviewItem>[] = [
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
        render: (row) => (
            <Chip variant="amber">{row.status}</Chip>
        ),
    },
    {
        key: "id",
        label: "Aksi",
        align: "left",
        render: () => (
            <div className="flex items-center gap-2">
                <Button variant="green" size="sm">
                    Terima
                </Button>
                <Button variant="red" size="sm">
                    Tolak
                </Button>
            </div>
        ),
    },
];

const DATA: ExtensionReviewItem[] = [
    {
        id: "1",
        anggota: "Raka Mahendra",
        atribut: "Kepemimpinan",
        bukti: "laporan-proyek-q3.pdf",
        status: "Menunggu tinjauan",
    },
];

export function TinjauanPerpanjanganContent() {
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
                columns={COLUMNS}
                rows={DATA}
            />
        </div>
    );
}
