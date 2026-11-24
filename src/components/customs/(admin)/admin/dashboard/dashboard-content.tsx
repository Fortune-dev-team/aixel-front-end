"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Chip } from "@/components/ui/Chip";

interface SebaranAtributRow {
    id: string;
    atribut: string;
    mentorAktif: number;
    bahanL1: number;
    bahanL2: string | number;
    segeraHabis: number;
}

interface ProgresAnggotaRow {
    id: string;
    anggota: string;
    goal: string;
    posisi: string;
}

const SEBARAN_ATRIBUT_COLUMNS: DataTableColumn<SebaranAtributRow>[] = [
    { key: "atribut", label: "Atribut", align: "left" },
    { key: "mentorAktif", label: "Mentor aktif", align: "left" },
    { key: "bahanL1", label: "Bahan L1", align: "left" },
    {
        key: "bahanL2",
        label: "Bahan L2",
        align: "left",
        render: (row) =>
            row.bahanL2 === "Belum ada" ? (
                <Chip variant="neutral">Belum ada</Chip>
            ) : (
                <span>{row.bahanL2}</span>
            ),
    },
    { key: "segeraHabis", label: "Segera habis", align: "left" },
];

const SEBARAN_ATRIBUT_DATA: SebaranAtributRow[] = [
    {
        id: "1",
        atribut: "Komunikasi",
        mentorAktif: 3,
        bahanL1: 1,
        bahanL2: "Belum ada",
        segeraHabis: 1,
    },
    {
        id: "2",
        atribut: "Problem Solving",
        mentorAktif: 1,
        bahanL1: 1,
        bahanL2: 1,
        segeraHabis: 0,
    },
    {
        id: "3",
        atribut: "Kepemimpinan",
        mentorAktif: 2,
        bahanL1: 0,
        bahanL2: "Belum ada",
        segeraHabis: 0,
    },
];

const PROGRES_ANGGOTA_COLUMNS: DataTableColumn<ProgresAnggotaRow>[] = [
    { key: "anggota", label: "Anggota", align: "left" },
    { key: "goal", label: "Goal", align: "left" },
    { key: "posisi", label: "Posisi", align: "left" },
];

const PROGRES_ANGGOTA_DATA: ProgresAnggotaRow[] = [
    {
        id: "1",
        anggota: "Rani Kusuma",
        goal: "Komunikasi",
        posisi: "Level 2",
    },
    {
        id: "2",
        anggota: "Fajar Nugroho",
        goal: "Problem Solving",
        posisi: "Level 1",
    },
    {
        id: "3",
        anggota: "Tia Anggraini",
        goal: "Kepemimpinan",
        posisi: "Level 3, menunggu jadwal",
    },
];

export function DashboardContent() {
    return (
        <div className="flex flex-col gap-8 max-w-full mx-auto">
            {/* Page Header */}
            <div>
                <h1 className="font-mono text-2xl md:text-3xl font-black text-black tracking-tight">
                    Dashboard
                </h1>
                <p className="mt-1 text-sm text-zinc-600">
                    Ringkasan seluruh sistem.
                </p>
            </div>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                <Card
                    step="6"
                    title="Anggota"
                    className="w-full"
                />
                <Card
                    step="6"
                    title="Mentor Aktif"
                    className="w-full"
                />
                <Card
                    step="1"
                    title="Atribut Segera Habis"
                    className="w-full"
                />
                <Card
                    step="3"
                    title="Kurang Bahan Lavel"
                    className="w-full"
                />
            </div>

            {/* Section: Sebaran Atribut */}
            <div className="flex flex-col gap-3">
                <h2 className="font-mono text-base font-bold text-black">
                    Sebaran Atribut
                </h2>
                <DataTable<SebaranAtributRow>
                    ariaLabel="Tabel Sebaran Atribut"
                    columns={SEBARAN_ATRIBUT_COLUMNS}
                    rows={SEBARAN_ATRIBUT_DATA}
                />
            </div>

            {/* Section: Progres Anggota */}
            <div className="flex flex-col gap-3">
                <h2 className="font-mono text-base font-bold text-black">
                    Progres Anggota
                </h2>
                <DataTable<ProgresAnggotaRow>
                    ariaLabel="Tabel Progres Anggota"
                    columns={PROGRES_ANGGOTA_COLUMNS}
                    rows={PROGRES_ANGGOTA_DATA}
                />
            </div>
        </div>
    );
}
