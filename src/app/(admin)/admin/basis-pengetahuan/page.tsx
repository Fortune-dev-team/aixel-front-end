"use client";

import React from "react";
import { DataTable, DataTableColumn } from "@/components/ui/tableheader";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/button";

interface KnowledgeItem {
    id: string;
    judul: string;
    atribut: string;
    level: number;
    jenis: string;
    asal: string;
    bahasa: string;
    verifikasi: string;
    statusLink: "Aktif" | "Mati";
}

const COLUMNS: DataTableColumn<KnowledgeItem>[] = [
    { key: "judul", label: "Judul", align: "left" },
    { key: "atribut", label: "Atribut", align: "left" },
    { key: "level", label: "Level", align: "left" },
    { key: "jenis", label: "Jenis", align: "left" },
    { key: "asal", label: "Asal", align: "left" },
    { key: "bahasa", label: "Bahasa", align: "left" },
    { key: "verifikasi", label: "Verifikasi", align: "left" },
    {
        key: "statusLink",
        label: "Link",
        align: "left",
        render: (row) => (
            <Chip variant={row.statusLink === "Aktif" ? "green" : "red"}>
                {row.statusLink}
            </Chip>
        ),
    },
    {
        key: "id",
        label: "Aksi",
        align: "left",
        render: () => (
            <div className="flex items-center gap-2">
                <Button variant="white" size="sm">
                    Tandai mati
                </Button>
                <Button variant="red" size="sm">
                    Hapus
                </Button>
            </div>
        ),
    },
];

const DATA: KnowledgeItem[] = [
    {
        id: "1",
        judul: "Dasar Presentasi Efektif",
        atribut: "Komunikasi",
        level: 1,
        jenis: "Video",
        asal: "YouTube",
        bahasa: "ID",
        verifikasi: "12 Sep 2026",
        statusLink: "Aktif",
    },
    {
        id: "2",
        judul: "Matriks Prioritas",
        atribut: "Problem Solving",
        level: 1,
        jenis: "Artikel",
        asal: "Blog resmi",
        bahasa: "ID",
        verifikasi: "03 Okt 2026",
        statusLink: "Aktif",
    },
    {
        id: "3",
        judul: "Fasilitasi Konflik Tim",
        atribut: "Kepemimpinan",
        level: 2,
        jenis: "Video",
        asal: "Kanal X",
        bahasa: "EN",
        verifikasi: "20 Agu 2026",
        statusLink: "Mati",
    },
    {
        id: "4",
        judul: "Root Cause Analysis",
        atribut: "Problem Solving",
        level: 2,
        jenis: "Modul",
        asal: "Internal",
        bahasa: "ID",
        verifikasi: "01 Nov 2026",
        statusLink: "Aktif",
    },
];

export default function BasisPengetahuanPage() {
    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="font-mono text-2xl md:text-3xl font-black text-black tracking-tight">
                    Basis Pengetahuan
                </h1>
                <p className="mt-1 text-sm text-zinc-600">
                    Perpustakaan bahan belajar per atribut dan level. AI hanya mengambil data dari sini.
                </p>
            </div>

            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                    <Chip variant="neutral" className="bg-[#f0ede6] text-black">
                        Link mati: 1
                    </Chip>
                    <Chip variant="amber" className="bg-[#fff1c2] text-[#b45309]">
                        Bahan kurang: Komunikasi L2, Kepemimpinan L1, Kepemimpinan L2
                    </Chip>
                </div>
                <Button variant="coral" size="md">
                    Tambah sumber
                </Button>
            </div>

            {/* Table */}
            <DataTable<KnowledgeItem>
                ariaLabel="Tabel Basis Pengetahuan"
                columns={COLUMNS}
                rows={DATA}
            />
        </div>
    );
}
