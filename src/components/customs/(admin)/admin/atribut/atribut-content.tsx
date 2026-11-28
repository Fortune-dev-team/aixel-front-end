"use client";

import React, { useState } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "../widgets/confirm-modal";
import { TambahAtributModal } from "./modals/tambah-atribut-modal";

interface AtributItem {
    id: string;
    atribut: string;
    kategori: string;
    level: number;
    indikator: string;
}

const INITIAL_DATA: AtributItem[] = [
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

export function AtributContent() {
    const [rows, setRows] = useState<AtributItem[]>(INITIAL_DATA);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<AtributItem | null>(null);

    const handleAddAtribut = ({ nama, kategori }: { nama: string; kategori: string }) => {
        setRows((prev) => [
            ...prev,
            {
                id: String(Date.now()),
                atribut: nama,
                kategori,
                level: 3,
                indikator: "L1 konseptual · L2 studi kasus · L3 wawancara",
            },
        ]);
    };

    const handleDeleteAtribut = () => {
        if (!deleteTarget) return;
        setRows((prev) => prev.filter((item) => item.id !== deleteTarget.id));
        setDeleteTarget(null);
    };

    const columns: DataTableColumn<AtributItem>[] = [
        { key: "atribut", label: "Atribut", align: "left" },
        { key: "kategori", label: "Kategori", align: "left" },
        { key: "level", label: "Level", align: "left" },
        { key: "indikator", label: "Indikator", align: "left" },
        {
            key: "id",
            label: "Aksi",
            align: "left",
            render: (row) => (
                <Button variant="red" size="sm" onPress={() => setDeleteTarget(row)}>
                    Hapus
                </Button>
            ),
        },
    ];

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
                <Button variant="coral" size="md" onPress={() => setIsAddOpen(true)}>
                    Tambah atribut
                </Button>
            </div>

            {/* Table */}
            <DataTable<AtributItem>
                ariaLabel="Tabel Kelola Atribut"
                columns={columns}
                rows={rows}
            />

            <TambahAtributModal
                isOpen={isAddOpen}
                onOpenChange={setIsAddOpen}
                onSubmit={handleAddAtribut}
            />

            <ConfirmModal
                isOpen={Boolean(deleteTarget)}
                onOpenChange={(open) => {
                    if (!open) setDeleteTarget(null);
                }}
                title="Konfirmasi"
                message={`Hapus atribut ${deleteTarget?.atribut ?? ""}?`}
                confirmLabel="Hapus"
                confirmVariant="red"
                onConfirm={handleDeleteAtribut}
            />
        </div>
    );
}
