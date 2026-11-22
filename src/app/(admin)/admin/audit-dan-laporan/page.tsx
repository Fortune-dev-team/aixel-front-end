"use client";

import React, { useState } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/tableheader";
import { Button } from "@/components/ui/button";

interface AuditLogItem {
    id: string;
    waktu: string;
    tanggal: string;
    pelaku: string;
    perubahan: string;
}

const COLUMNS: DataTableColumn<AuditLogItem>[] = [
    { key: "waktu", label: "Waktu", align: "left" },
    { key: "tanggal", label: "Tanggal", align: "left" },
    { key: "pelaku", label: "Pelaku", align: "left" },
    { key: "perubahan", label: "Perubahan", align: "left" },
];

const DATA: AuditLogItem[] = [
    {
        id: "1",
        waktu: "10.43",
        tanggal: "03/01/26",
        pelaku: "Admin Aixel",
        perubahan: "Koreksi manual hasil Rani Kusuma menjadi Setuju: a",
    },
    {
        id: "2",
        waktu: "10.42",
        tanggal: "03/01/26",
        pelaku: "Admin Aixel",
        perubahan: "Mengalihkan permintaan Nadia Putri",
    },
    {
        id: "3",
        waktu: "10.42",
        tanggal: "03/01/26",
        pelaku: "Admin Aixel",
        perubahan: "Mengalihkan permintaan Nadia Putri",
    },
    {
        id: "4",
        waktu: "10.29",
        tanggal: "03/01/26",
        pelaku: "Admin Aixel",
        perubahan: "Menyetujui rubrik Kepemimpinan",
    },
    {
        id: "5",
        waktu: "10.27",
        tanggal: "03/01/26",
        pelaku: "Admin Aixel",
        perubahan: "Menambah atribut UI/UX",
    },
    {
        id: "6",
        waktu: "10.24",
        tanggal: "03/01/26",
        pelaku: "Admin Aixel",
        perubahan: "Menghapus atribut asa",
    },
    {
        id: "7",
        waktu: "10.23",
        tanggal: "03/01/26",
        pelaku: "Admin Aixel",
        perubahan: "Menambahkan atribut asa",
    },
    {
        id: "8",
        waktu: "10.21",
        tanggal: "03/01/26",
        pelaku: "Admin Aixel",
        perubahan: "Menambahkan atribut asa",
    },
];

export default function AuditDanLaporanPage() {
    const [page, setPage] = useState(1);

    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="font-mono text-2xl md:text-3xl font-black text-black tracking-tight">
                    Audit dan Laporan
                </h1>
                <p className="mt-1 text-sm text-zinc-600">
                    Catatan perubahan dan ekspor data.
                </p>
            </div>

            {/* Filter Box */}
            <div className="rounded-2xl border-2 border-black bg-white p-5 shadow-[4px_4px_0_0_#111111]">
                <div className="flex flex-col gap-4">
                    {/* Row 1: Cari, Waktu, Tanggal Range */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Cari */}
                        <div className="flex flex-col gap-1 md:col-span-2">
                            <label className="font-mono text-xs font-bold text-black">
                                Cari
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                                    🔍
                                </span>
                                <input
                                    type="text"
                                    placeholder="Cari..."
                                    className="h-10 w-full rounded-lg border-[1.5px] border-black bg-[#fdfcfa] pl-9 pr-3 font-mono text-xs text-black placeholder:text-zinc-400 outline-none focus:border-[#ff4a1c]"
                                />
                            </div>
                        </div>

                        {/* Waktu */}
                        <div className="flex flex-col gap-1">
                            <label className="font-mono text-xs font-bold text-black">
                                Waktu
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    defaultValue="10.00"
                                    className="h-10 w-full rounded-lg border-[1.5px] border-black bg-[#fdfcfa] px-3 font-mono text-xs text-black outline-none focus:border-[#ff4a1c]"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                                    🕒
                                </span>
                            </div>
                        </div>

                        {/* Tanggal */}
                        <div className="flex flex-col gap-1">
                            <label className="font-mono text-xs font-bold text-black">
                                Tanggal
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        defaultValue="10/01/26"
                                        className="h-10 w-full rounded-lg border-[1.5px] border-black bg-[#fdfcfa] px-2 font-mono text-xs text-black outline-none focus:border-[#ff4a1c]"
                                    />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                                        📅
                                    </span>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        defaultValue="20/03/26"
                                        className="h-10 w-full rounded-lg border-[1.5px] border-black bg-[#fdfcfa] px-2 font-mono text-xs text-black outline-none focus:border-[#ff4a1c]"
                                    />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                                        📅
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Pelaku & Ekspor Button */}
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div className="flex flex-col gap-1 w-full md:w-3/4">
                            <label className="font-mono text-xs font-bold text-black">
                                Pelaku
                            </label>
                            <select className="h-10 w-full rounded-lg border-[1.5px] border-black bg-[#fdfcfa] px-3 font-mono text-xs text-black outline-none focus:border-[#ff4a1c]">
                                <option value="semua">Semua Pelaku</option>
                                <option value="admin">Admin Aixel</option>
                            </select>
                        </div>
                        <Button variant="coral" size="md">
                            Ekspor CSV
                        </Button>
                    </div>
                </div>
            </div>

            {/* Results Counter */}
            <p className="font-sans text-xs text-zinc-700">
                Menampilkan 8 dari 128 catatan, 10 Jan 2026 sampai 20 Mar 2026, semua pelaku.
            </p>

            {/* Table */}
            <DataTable<AuditLogItem>
                ariaLabel="Tabel Audit dan Laporan"
                columns={COLUMNS}
                rows={DATA}
            />

            {/* Pagination Controls */}
            <div className="flex justify-end items-center gap-2 pt-2">
                <button
                    disabled
                    className="rounded-lg border-2 border-black bg-[#d4d4d8] px-3 py-1.5 font-mono text-xs font-bold text-zinc-600 cursor-not-allowed opacity-80"
                >
                    Sebelumnya
                </button>
                <button
                    onClick={() => setPage(1)}
                    className={`rounded-lg border-2 border-black px-3 py-1.5 font-mono text-xs font-bold transition-all ${
                        page === 1
                            ? "bg-[#ff4a1c] text-white shadow-[2px_2px_0_0_#111111]"
                            : "bg-white text-black hover:bg-zinc-100"
                    }`}
                >
                    1
                </button>
                <button
                    onClick={() => setPage(2)}
                    className={`rounded-lg border-2 border-black px-3 py-1.5 font-mono text-xs font-bold transition-all ${
                        page === 2
                            ? "bg-[#ff4a1c] text-white shadow-[2px_2px_0_0_#111111]"
                            : "bg-white text-black hover:bg-zinc-100"
                    }`}
                >
                    2
                </button>
                <button
                    onClick={() => setPage(3)}
                    className={`rounded-lg border-2 border-black px-3 py-1.5 font-mono text-xs font-bold transition-all ${
                        page === 3
                            ? "bg-[#ff4a1c] text-white shadow-[2px_2px_0_0_#111111]"
                            : "bg-white text-black hover:bg-zinc-100"
                    }`}
                >
                    3
                </button>
                <button
                    onClick={() => setPage((p) => Math.min(3, p + 1))}
                    className="rounded-lg border-2 border-black bg-white px-3 py-1.5 font-mono text-xs font-bold text-black transition-all hover:bg-zinc-100"
                >
                    Berikutnya
                </button>
            </div>
        </div>
    );
}
