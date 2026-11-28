"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/button";
import { ReasonModal } from "../widgets/reason-modal";
import { TetapkanPemilikModal } from "./modals/tetapkan-pemilik-modal";

interface AttributeOwnerItem {
    id: string;
    anggota: string;
    atribut: string;
    asal: string;
    lulus: string;
    berlakuSampai: string;
    statusMentor: "Aktif" | "Belum diundang";
}

const INITIAL_DATA: AttributeOwnerItem[] = [
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
    {
        id: "3",
        anggota: "Rani Kusuma",
        atribut: "Problem Solving",
        asal: "Ditetapkan Admin",
        lulus: "12 Nov 2025",
        berlakuSampai: "12 Nov 2026",
        statusMentor: "Aktif",
    },
    {
        id: "4",
        anggota: "Fajar Nugroho",
        atribut: "Kepemimpinan",
        asal: "Lulus wawancara",
        lulus: "20 Nov 2025",
        berlakuSampai: "20 Nov 2026",
        statusMentor: "Belum diundang",
    },
    {
        id: "5",
        anggota: "Tia Anggraini",
        atribut: "Komunikasi",
        asal: "Ditetapkan Admin",
        lulus: "05 Jan 2026",
        berlakuSampai: "05 Jan 2027",
        statusMentor: "Aktif",
    },
];

export function PemilikAtributContent() {
    const [rows, setRows] = useState<AttributeOwnerItem[]>(INITIAL_DATA);
    const [filterAtribut, setFilterAtribut] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [isAssignOpen, setIsAssignOpen] = useState(false);
    const [revokeTarget, setRevokeTarget] = useState<AttributeOwnerItem | null>(null);
    const [page, setPage] = useState(1);

    const filteredRows = rows.filter((row) => {
        const matchAtribut =
            !filterAtribut ||
            row.atribut.toLowerCase().replace(/\s+/g, "-") === filterAtribut;
        const matchStatus =
            !filterStatus ||
            row.statusMentor.toLowerCase().replace(/\s+/g, "-") === filterStatus;
        return matchAtribut && matchStatus;
    });

    const ITEMS_PER_PAGE = 3;
    const totalPages = Math.ceil(filteredRows.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedData = filteredRows.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleAssign = ({ anggota, atribut }: { anggota: string; atribut: string }) => {
        setRows((prev) => [
            ...prev,
            {
                id: String(Date.now()),
                anggota,
                atribut,
                asal: "Ditetapkan Admin",
                lulus: "28 Nov 2026",
                berlakuSampai: "28 Nov 2027",
                statusMentor: "Belum diundang",
            },
        ]);
    };

    const handleRevoke = () => {
        if (!revokeTarget) return;
        setRows((prev) =>
            prev.map((item) =>
                item.id === revokeTarget.id
                    ? { ...item, statusMentor: "Belum diundang" }
                    : item
            )
        );
        setRevokeTarget(null);
    };

    const columns: DataTableColumn<AttributeOwnerItem>[] = [
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
                    <Button
                        variant="red"
                        size="sm"
                        onPress={() => setRevokeTarget(row)}
                    >
                        Cabut status
                    </Button>
                ) : (
                    <Button variant="coral" size="sm">
                        Undang
                    </Button>
                ),
        },
    ];

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
                            <select
                                value={filterAtribut}
                                onChange={(e) => setFilterAtribut(e.target.value)}
                                className="h-10 rounded-lg border-[1.5px] border-black bg-[#fdfcfa] px-3 font-mono text-xs text-zinc-600 outline-none focus:border-[#ff4a1c]"
                            >
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
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="h-10 rounded-lg border-[1.5px] border-black bg-[#fdfcfa] px-3 font-mono text-xs text-zinc-600 outline-none focus:border-[#ff4a1c]"
                            >
                                <option value="">Select option</option>
                                <option value="aktif">Aktif</option>
                                <option value="belum-diundang">Belum diundang</option>
                            </select>
                        </div>
                    </div>

                    <Button
                        variant="coral"
                        size="md"
                        onPress={() => setIsAssignOpen(true)}
                    >
                        Tetapkan pemilik atribut
                    </Button>
                </div>
            </div>

            {/* Table */}
            <DataTable<AttributeOwnerItem>
                ariaLabel="Tabel Pemilik Atribut"
                columns={columns}
                rows={paginatedData}
            />

            {/* Pagination Controls */}
            <div className="flex justify-end items-center gap-2 pt-2">
                <button
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                    className={`rounded-lg border-2 border-black px-3 py-1.5 font-mono text-xs font-bold transition-all ${
                        page === 1
                            ? "bg-[#d4d4d8] text-zinc-600 cursor-not-allowed opacity-80"
                            : "bg-white text-black hover:bg-zinc-100"
                    }`}
                >
                    Sebelumnya
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`rounded-lg border-2 border-black px-3 py-1.5 font-mono text-xs font-bold transition-all ${
                            page === pageNum
                                ? "bg-[#ff4a1c] text-white shadow-[2px_2px_0_0_#111111]"
                                : "bg-white text-black hover:bg-zinc-100"
                        }`}
                    >
                        {pageNum}
                    </button>
                ))}
                <button
                    disabled={page === totalPages}
                    onClick={() => handlePageChange(page + 1)}
                    className={`rounded-lg border-2 border-black px-3 py-1.5 font-mono text-xs font-bold transition-all ${
                        page === totalPages
                            ? "bg-[#d4d4d8] text-zinc-600 cursor-not-allowed opacity-80"
                            : "bg-white text-black hover:bg-zinc-100"
                    }`}
                >
                    Berikutnya
                </button>
            </div>

            <TetapkanPemilikModal
                isOpen={isAssignOpen}
                onOpenChange={setIsAssignOpen}
                onSubmit={handleAssign}
            />

            <ReasonModal
                isOpen={Boolean(revokeTarget)}
                onOpenChange={(open) => {
                    if (!open) setRevokeTarget(null);
                }}
                title={`Cabut status mentor ${revokeTarget?.anggota ?? ""}`}
                subtitle="Alasan Anda akan dibaca team"
                confirmLabel="Kirim pencabutan"
                onSubmit={handleRevoke}
            />
        </div>
    );
}
