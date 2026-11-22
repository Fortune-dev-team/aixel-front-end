"use client";

import React from "react";
import { DataTable, DataTableColumn } from "@/components/ui/tableheader";
import { Button } from "@/components/ui/button";

interface AtributItem {
    id: string;
    atribut: string;
    kategori: string;
    level: number;
    indikator: string;
}

const COLUMNS: DataTableColumn<AtributItem>[] = [
    { key: "atribut", label: "Atribut", align: "left" },
    { key: "kategori", label: "Kategori", align: "left" },
    { key: "level", label: "Level", align: "left" },
    { key: "indikator", label: "Indikator", align: "left" },
    {
        key: "id",
        label: "Aksi",
        align: "left",
        render: () => (
            <Button variant="red" size="sm">
                Hapus
            </Button>
        ),
    },
];

const DATA: AtributItem[] = [
    {
        id: "1",
        atribut: "Komunikasi",
        kategori: "Soft Skill",
        level: 3,
        indikator: "L1 konseptual · L2 studi kasus · L3 wawancara",
    },
    {
        id: "2",
        atribut: "Problem Solving",
        kategori: "Soft Skill",
        level: 3,
        indikator: "L1 konseptual · L2 studi kasus · L3 wawancara",
    },
    {
        id: "3",
        atribut: "Kepemimpinan",
        kategori: "Manajemen",
        level: 3,
        indikator: "L1 konseptual · L2 studi kasus · L3 wawancara",
    },
];

export default function AtributPage() {
    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="font-mono text-2xl md:text-3xl font-black text-black tracking-tight">
                    Kelola Atribut
                </h1>
                <p className="mt-1 text-sm text-zinc-600">
                    Atribut, Kategori, Jumlah Level, dan indikator tiap level.
                </p>
            </div>

            {/* Action Toolbar */}
            <div>
                <Button variant="coral" size="md">
                    Tambah atribut
                </Button>
            </div>

            {/* Table */}
            <DataTable<AtributItem>
                ariaLabel="Tabel Kelola Atribut"
                columns={COLUMNS}
                rows={DATA}
            />
        </div>
    );
}
