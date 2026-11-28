"use client";

import React, { useState } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/button";
import { ReasonModal } from "../widgets/reason-modal";

interface ExtensionReviewItem {
    id: string;
    anggota: string;
    atribut: string;
    bukti: string;
    status: "Menunggu tinjauan" | "Diterima" | "Ditolak";
}

const INITIAL_DATA: ExtensionReviewItem[] = [
    {
        id: "1",
        anggota: "Raka Mahendra",
        atribut: "Kepemimpinan",
        bukti: "laporan-proyek-q3.pdf",
        status: "Menunggu tinjauan",
    },
    {
        id: "2",
        anggota: "Nadia Putri",
        atribut: "Komunikasi",
        bukti: "portofolio-komunikasi.pdf",
        status: "Menunggu tinjauan",
    },
    {
        id: "3",
        anggota: "Budi Santoso",
        atribut: "Problem Solving",
        bukti: "studi-kasus-revamp.pdf",
        status: "Diterima",
    },
    {
        id: "4",
        anggota: "Tia Anggraini",
        atribut: "Kepemimpinan",
        bukti: "laporan-kepemimpinan.pdf",
        status: "Ditolak",
    },
    {
        id: "5",
        anggota: "Fajar Nugroho",
        atribut: "Komunikasi",
        bukti: "bukti-presentasi.pdf",
        status: "Menunggu tinjauan",
    },
];

export function TinjauanPerpanjanganContent() {
    const [rows, setRows] = useState<ExtensionReviewItem[]>(INITIAL_DATA);
    const [rejectTarget, setRejectTarget] = useState<ExtensionReviewItem | null>(null);
    const [page, setPage] = useState(1);

    const ITEMS_PER_PAGE = 3;
    const totalPages = Math.ceil(rows.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedData = rows.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleApprove = (id: string) => {
        setRows((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, status: "Diterima" } : item
            )
        );
    };

    const handleReject = () => {
        if (!rejectTarget) return;
        setRows((prev) =>
            prev.map((item) =>
                item.id === rejectTarget.id ? { ...item, status: "Ditolak" } : item
            )
        );
        setRejectTarget(null);
    };

    const columns: DataTableColumn<ExtensionReviewItem>[] = [
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
            render: (row) => {
                const variant =
                    row.status === "Diterima"
                        ? "green"
                        : row.status === "Ditolak"
                          ? "red"
                          : "amber";
                return <Chip variant={variant}>{row.status}</Chip>;
            },
        },
        {
            key: "id",
            label: "Aksi",
            align: "left",
            render: (row) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="green"
                        size="sm"
                        onPress={() => handleApprove(row.id)}
                    >
                        Terima
                    </Button>
                    <Button
                        variant="red"
                        size="sm"
                        onPress={() => setRejectTarget(row)}
                    >
                        Tolak
                    </Button>
                </div>
            ),
        },
    ];

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

            <ReasonModal
                isOpen={Boolean(rejectTarget)}
                onOpenChange={(open) => {
                    if (!open) setRejectTarget(null);
                }}
                title="Tolak perpanjangan atribut"
                subtitle="Alasan Anda akan dibaca team sebelum mempertimbangkan pengajuan berikutnya."
                confirmLabel="Kirim penolakan"
                onSubmit={handleReject}
            />
        </div>
    );
}
