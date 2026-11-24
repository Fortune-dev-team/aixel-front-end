"use client";

import React from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progressbar";

interface UncertainCaseItem {
    id: string;
    anggota: string;
    atribut: string;
    skor: string;
    catatanAi: string;
}

interface ConsistencyItem {
    id: string;
    jawaban: string;
    skorTigaKali: string;
    status: "Aktif" | "Belum lulus";
    note?: string;
}

const UNCERTAIN_COLUMNS: DataTableColumn<UncertainCaseItem>[] = [
    { key: "anggota", label: "Anggota", align: "left" },
    { key: "atribut", label: "Atribut", align: "left" },
    { key: "skor", label: "Skor", align: "left" },
    { key: "catatanAi", label: "Catatan AI", align: "left" },
    {
        key: "id",
        label: "Aksi",
        align: "left",
        render: () => (
            <Button variant="white" size="sm">
                Koreksi manual
            </Button>
        ),
    },
];

const UNCERTAIN_DATA: UncertainCaseItem[] = [
    {
        id: "1",
        anggota: "Runi Kusuma",
        atribut: "Komonikasi",
        skor: "2/4 (batas)",
        catatanAi: "Tetap di batas lulus",
    },
    {
        id: "2",
        anggota: "Fajar Nugroho",
        atribut: "Problem Solving",
        skor: "2/4 (batas)",
        catatanAi: "Jawaban meragukan",
    },
];

const CONSISTENCY_COLUMNS: DataTableColumn<ConsistencyItem>[] = [
    { key: "jawaban", label: "Jawaban", align: "left" },
    { key: "skorTigaKali", label: "Skor tiga kali penilaian", align: "left" },
    {
        key: "status",
        label: "Status",
        align: "left",
        render: (row) => (
            <div className="flex items-center gap-2">
                <Chip variant={row.status === "Aktif" ? "green" : "red"}>
                    {row.status}
                </Chip>
                {row.note && (
                    <span className="font-mono text-xs text-black">
                        {row.note}
                    </span>
                )}
            </div>
        ),
    },
];

const CONSISTENCY_DATA: ConsistencyItem[] = [
    {
        id: "1",
        jawaban: "Jawaban A",
        skorTigaKali: "3, 3, 3",
        status: "Aktif",
    },
    {
        id: "2",
        jawaban: "Jawaban B",
        skorTigaKali: "2, 4, 3",
        status: "Belum lulus",
        note: "rubrik perlu diperbaiki",
    },
];

export function PemantauanPenilaianContent() {
    return (
        <div className="flex flex-col gap-8 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="font-mono text-2xl md:text-3xl font-black text-black tracking-tight">
                    Pemantauan Penilaian Otomatis
                </h1>
                <p className="mt-1 text-sm text-zinc-600">
                    Mengawasi apakah penilaian Ai wajar.
                </p>
            </div>

            {/* Card: Sebaran Skor */}
            <div className="rounded-2xl border-2 border-black bg-white p-6 shadow-[4px_4px_0_0_#111111]">
                <h2 className="font-mono text-xl font-bold text-black mb-6">
                    Sebaran Skor
                </h2>
                <div className="flex flex-col gap-6">
                    {/* Item 1 */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-mono text-xs font-semibold text-black">
                                Komunikasi · lulus 92%
                            </span>
                            <Chip variant="neutral" className="text-xs">
                                Mungkin terlalu longgar
                            </Chip>
                        </div>
                        <ProgressBar value={92} size="md" />
                    </div>

                    {/* Item 2 */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-mono text-xs font-semibold text-black">
                                Problem Solving · lulus 60%
                            </span>
                            <Chip variant="neutral" className="text-xs">
                                Wajar
                            </Chip>
                        </div>
                        <ProgressBar value={60} size="md" />
                    </div>

                    {/* Item 3 */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-mono text-xs font-semibold text-black">
                                Kepemimpinan · lulus 8%
                            </span>
                            <Chip variant="neutral" className="text-xs">
                                Mungkin terlalu ketat atau bahan kurang
                            </Chip>
                        </div>
                        <ProgressBar value={8} size="md" />
                    </div>
                </div>
            </div>

            {/* Section: Kasus tidak pasti */}
            <div className="flex flex-col gap-3">
                <h2 className="font-mono text-base font-bold text-black">
                    Kasus tidak pasti
                </h2>
                <DataTable<UncertainCaseItem>
                    ariaLabel="Tabel Kasus Tidak Pasti"
                    columns={UNCERTAIN_COLUMNS}
                    rows={UNCERTAIN_DATA}
                />
            </div>

            {/* Section: Konsistensi */}
            <div className="flex flex-col gap-3">
                <h2 className="font-mono text-base font-bold text-black">
                    Konsistensi
                </h2>
                <DataTable<ConsistencyItem>
                    ariaLabel="Tabel Konsistensi"
                    columns={CONSISTENCY_COLUMNS}
                    rows={CONSISTENCY_DATA}
                />
            </div>
        </div>
    );
}
