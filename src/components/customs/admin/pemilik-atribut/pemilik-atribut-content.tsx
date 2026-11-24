"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/button";

interface AttributeOwnerItem {
    id: string;
    anggota: string;
    atribut: string;
    asal: string;
    lulus: string;
    berlakuSampai: string;
    statusMentor: "Aktif" | "Belum diundang";
}

const COLUMNS: DataTableColumn<AttributeOwnerItem>[] = [
    { key: "anggota", label: "Anggota", align: "left" },
    { key: "atribut", label: "Atribut", align: "left" },
    { key: "asal", label: "Asal", align: "left" },
    { key: "lulus", label: "Lulus", align: "left" },
    { key: "berlakuSampai", label: "Berlaku sampai", align: "left" },
    {
        key: "sertifikat",
        label: "Sertifikat",
        align: "left",
        render: () => (
            <Button variant="white" size="sm">
                Lihat
            </Button>
        ),
    },
    {
        key: "statusMentor",
        label: "Status mentor",
        align: "left",
        render: (row) => (
            <Chip variant={row.statusMentor === "Aktif" ? "green" : "neutral"}>
                {row.statusMentor}
            </Chip>
        ),
    },
    {
        key: "aksi",
        label: "Aksi",
        align: "left",
        render: (row) =>
            row.statusMentor === "Aktif" ? (
                <Button variant="red" size="sm">
                    Cabut status
                </Button>
            ) : (
                <Button variant="coral" size="sm">
                    Undang
                </Button>
            ),
    },
];

const DATA: AttributeOwnerItem[] = [
    {
        id: "1",
        anggota: "Budi Santoso",
        atribut: "Komunikasi",
        asal: "Ditetapkan Admin",
        lulus: "05 Des 2025",
        berlakuSampai: "05 Des 2026",
        statusMentor: "Aktif",
    },
    {
        id: "2",
        anggota: "Admin Aixel",
        atribut: "Komunikasi",
        asal: "Lulus wawancara",
        lulus: "01 Okt 2026",
        berlakuSampai: "01 Okt 2027",
        statusMentor: "Belum diundang",
    },
];

export function PemilikAtributContent() {
    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="font-mono text-2xl md:text-3xl font-black text-black tracking-tight">
                    Pemilik Atribut
                </h1>
                <p className="mt-1 text-sm text-zinc-600 max-w-3xl">
                    Anggota yang sudah memiliki atribut. Undang yang layak menjadi mentor, lalu anggota memilih bersedia atau tidak.
                </p>
            </div>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                <Card
                    step="6"
                    title="Pemilik atribut"
                    className="w-full"
                />
                <Card
                    step="6"
                    title="Mentor aktif"
                    className="w-full"
                />
                <Card
                    step="1"
                    title="Menunggu jawaban"
                    className="w-full"
                />
                <Card
                    step="3"
                    title="Menolak undangan"
                    className="w-full"
                />
            </div>

            {/* Filter / Action Box */}
            <div className="rounded-2xl border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_#111111]">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Select Atribut */}
                        <div className="flex flex-col gap-1 min-w-[200px]">
                            <label className="font-mono text-xs font-bold text-black">
                                Atribut
                            </label>
                            <select className="h-10 rounded-lg border-[1.5px] border-black bg-[#fdfcfa] px-3 font-mono text-xs text-zinc-600 outline-none focus:border-[#ff4a1c]">
                                <option value="">Select option</option>
                                <option value="komunikasi">Komunikasi</option>
                                <option value="problem-solving">Problem Solving</option>
                                <option value="kepemimpinan">Kepemimpinan</option>
                            </select>
                        </div>

                        {/* Select Status */}
                        <div className="flex flex-col gap-1 min-w-[200px]">
                            <label className="font-mono text-xs font-bold text-black">
                                Status
                            </label>
                            <select className="h-10 rounded-lg border-[1.5px] border-black bg-[#fdfcfa] px-3 font-mono text-xs text-zinc-600 outline-none focus:border-[#ff4a1c]">
                                <option value="">Select option</option>
                                <option value="aktif">Aktif</option>
                                <option value="belum-diundang">Belum diundang</option>
                            </select>
                        </div>
                    </div>

                    <Button variant="coral" size="md">
                        Tetapkan pemilik atribut
                    </Button>
                </div>
            </div>

            {/* Table */}
            <DataTable<AttributeOwnerItem>
                ariaLabel="Tabel Pemilik Atribut"
                columns={COLUMNS}
                rows={DATA}
            />
        </div>
    );
}
