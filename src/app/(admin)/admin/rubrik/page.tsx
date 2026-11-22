"use client";

import React from "react";
import { DataTable, DataTableColumn } from "@/components/ui/tableheader";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/button";

interface RubrikItem {
    id: string;
    atribut: string;
    statusMandiri: "Disetujui" | "Draf" | "Belum ada";
    statusWawancara: "Disetujui";
}

const COLUMNS: DataTableColumn<RubrikItem>[] = [
    { key: "atribut", label: "Atribut", align: "left" },
    {
        key: "statusMandiri",
        label: "Rubrik Level Mandiri",
        align: "left",
        render: (row) => {
            if (row.statusMandiri === "Disetujui") {
                return <Chip variant="green">Disetujui</Chip>;
            }
            if (row.statusMandiri === "Draf") {
                return <Chip variant="amber">Draf</Chip>;
            }
            return <Chip variant="neutral">Belum ada</Chip>;
        },
    },
    {
        key: "id",
        label: "Aksi",
        align: "left",
        render: (row) => {
            if (row.statusMandiri === "Draf") {
                return (
                    <div className="flex items-center gap-2">
                        <Button variant="white" size="sm">
                            Edit
                        </Button>
                        <Button variant="green" size="sm">
                            Setujui
                        </Button>
                    </div>
                );
            }
            if (row.statusMandiri === "Belum ada") {
                return (
                    <Button variant="coral" size="sm">
                        Buat draf AI
                    </Button>
                );
            }
            return null;
        },
    },
    {
        key: "statusWawancara",
        label: "Rubrik Wawancara",
        align: "left",
        render: (row) => (
            <div className="flex items-center gap-2">
                <Chip variant="green">{row.statusWawancara}</Chip>
                <Button variant="white" size="sm">
                    Lihat
                </Button>
            </div>
        ),
    },
];

const DATA: RubrikItem[] = [
    {
        id: "1",
        atribut: "Komunikasi",
        statusMandiri: "Disetujui",
        statusWawancara: "Disetujui",
    },
    {
        id: "2",
        atribut: "Problem Solving",
        statusMandiri: "Disetujui",
        statusWawancara: "Disetujui",
    },
    {
        id: "3",
        atribut: "Kepemimpinan",
        statusMandiri: "Draf",
        statusWawancara: "Disetujui",
    },
    {
        id: "4",
        atribut: "UI/UX",
        statusMandiri: "Belum ada",
        statusWawancara: "Disetujui",
    },
];

export default function RubrikPage() {
    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="font-mono text-2xl md:text-3xl font-black text-black tracking-tight">
                    Kelola Rubrik
                </h1>
                <p className="mt-1 text-sm text-zinc-600 max-w-3xl leading-relaxed">
                    Rubrik Level Mandiri: AI membuat draft, admin mengedit lalu menyetujui. Hanya rubrik yang disetujui boleh di pakai AI. Rubrik wawancara disusun admin
                </p>
            </div>

            {/* Table */}
            <DataTable<RubrikItem>
                ariaLabel="Tabel Kelola Rubrik"
                columns={COLUMNS}
                rows={DATA}
            />
        </div>
    );
}
