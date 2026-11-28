"use client";

import React, { useState } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "../widgets/confirm-modal";
import type { SoalItem } from "./interfaces";
import { DetailSoalModal } from "./modals/detail-soal-modal";
import { EditSoalModal } from "./modals/edit-soal-modal";
import { GenerateSoalModal } from "./modals/generate-soal-modal";

const INITIAL_DATA: SoalItem[] = [
    {
        id: "1",
        soal: "Rekan tidak paham pesan Anda. Apa yang Anda lakukan?",
        jawaban: "Menanyakan bagian yang belum jelas lalu menjelaskan ulang",
        pilihan: [
            "Mengulang dengan suara lebih keras",
            "Menanyakan bagian yang belum jelas lalu menjelaskan ulang",
            "Melanjutkan ke topik berikutnya",
        ],
        atribut: "Komunikasi",
        level: 1,
        aktif: true,
        modul: "Dasar Presentasi Efektif",
    },
    {
        id: "2",
        soal: "Rekan tidak paham pesan Anda. Apa langkah berikutnya?",
        jawaban: "Menanyakan bagian yang belum jelas lalu menjelaskan ulang",
        pilihan: [
            "Mengulang dengan suara lebih keras",
            "Menanyakan bagian yang belum jelas lalu menjelaskan ulang",
            "Melanjutkan ke topik berikutnya",
        ],
        atribut: "Komunikasi",
        level: 1,
        aktif: true,
        modul: "Dasar Presentasi Efektif",
    },
    {
        id: "3",
        soal: "Dua rekan berselisih soal prioritas dan deadline proyek tinggal tiga hari. Jelaskan langkah Anda terkait Komunikasi. Sertakan alasan, dampak, dan tindak lanjut.",
        jawaban: "Esai, dinilai AI dengan rubrik",
        atribut: "Komunikasi",
        level: 2,
        aktif: true,
        modul: "Dasar Presentasi Efektif",
    },
    {
        id: "4",
        soal: "Rekan tidak paham pesan Anda. Bagaimana menyampaikannya ulang?",
        jawaban: "Menanyakan bagian yang belum jelas lalu menjelaskan ulang",
        pilihan: [
            "Mengulang dengan suara lebih keras",
            "Menanyakan bagian yang belum jelas lalu menjelaskan ulang",
            "Melanjutkan ke topik berikutnya",
        ],
        atribut: "Komunikasi",
        level: 1,
        aktif: true,
        modul: "Dasar Presentasi Efektif",
    },
    {
        id: "5",
        soal: "Rekan tidak paham pesan Anda. Apa yang perlu diperbaiki?",
        jawaban: "Menanyakan bagian yang belum jelas lalu menjelaskan ulang",
        pilihan: [
            "Mengulang dengan suara lebih keras",
            "Menanyakan bagian yang belum jelas lalu menjelaskan ulang",
            "Melanjutkan ke topik berikutnya",
        ],
        atribut: "Komunikasi",
        level: 1,
        aktif: false,
        modul: "Dasar Presentasi Efektif",
    },
    {
        id: "6",
        soal: "Bagaimana Anda menangani konflik prioritas dalam tim?",
        jawaban: "Berdasarkan tujuan bersama dan data",
        pilihan: [
            "Berdasarkan tujuan bersama dan data",
            "Mengikuti pendapat senior",
            "Menunda keputusan",
        ],
        atribut: "Kepemimpinan",
        level: 2,
        aktif: true,
        modul: "Dasar Kepemimpinan",
    },
    {
        id: "7",
        soal: "Anda harus memecah masalah besar. Langkah pertama Anda?",
        jawaban: "Mengidentifikasi akar masalah",
        pilihan: [
            "Mengidentifikasi akar masalah",
            "Langsung mencoba solusi",
            "Menunggu instruksi",
        ],
        atribut: "Problem Solving",
        level: 1,
        aktif: true,
        modul: "Root Cause Analysis",
    },
    {
        id: "8",
        soal: "Tim menolak perubahan proses baru. Bagaimana Anda merespons?",
        jawaban: "Menjelaskan manfaat dan melibatkan tim",
        pilihan: [
            "Menjelaskan manfaat dan melibatkan tim",
            "Memaksa perubahan",
            "Membatalkan perubahan",
        ],
        atribut: "Kepemimpinan",
        level: 2,
        aktif: false,
        modul: "Dasar Kepemimpinan",
    },
];

const truncate = (text: string, max: string) => (
    <span title={text} className={`block truncate ${max}`}>
        {text}
    </span>
);

export function BankSoalContent() {
    const [rows, setRows] = useState<SoalItem[]>(INITIAL_DATA);
    const [detailTarget, setDetailTarget] = useState<SoalItem | null>(null);
    const [editTarget, setEditTarget] = useState<SoalItem | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<SoalItem | null>(null);
    const [isGenerateOpen, setIsGenerateOpen] = useState(false);
    const [page, setPage] = useState(1);

    const ITEMS_PER_PAGE = 5;
    const totalPages = Math.ceil(rows.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedData = rows.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleToggleAktif = (id: string, aktif: boolean) => {
        setRows((list) => list.map((r) => (r.id === id ? { ...r, aktif } : r)));
        setDetailTarget((prev) => (prev && prev.id === id ? { ...prev, aktif } : prev));
    };

    const handleSaveEdit = (updated: SoalItem) => {
        setRows((list) => list.map((r) => (r.id === updated.id ? updated : r)));
        setEditTarget(null);
    };

    const handleConfirmDelete = () => {
        if (!deleteTarget) return;
        if (deleteTarget.aktif) {
            handleToggleAktif(deleteTarget.id, false);
        } else {
            setRows((list) => list.filter((r) => r.id !== deleteTarget.id));
        }
        setDeleteTarget(null);
    };

    const handleApproveGenerated = (generated: SoalItem[]) => {
        setRows((list) => [...generated, ...list]);
    };

    const columns: DataTableColumn<SoalItem>[] = [
        { key: "soal", label: "Soal", align: "left", render: (row) => truncate(row.soal, "max-w-[12rem]") },
        { key: "jawaban", label: "Jawaban", align: "left", render: (row) => truncate(row.jawaban, "max-w-[12rem]") },
        { key: "atribut", label: "Atribut", align: "left" },
        { key: "level", label: "Level", align: "left" },
        {
            key: "aktif",
            label: "Status",
            align: "left",
            render: (row) => <Chip variant={row.aktif ? "green" : "red"}>{row.aktif ? "Aktif" : "Mati"}</Chip>,
        },
        {
            key: "id",
            label: "Aksi",
            align: "left",
            render: (row) => (
                <div className="flex items-center gap-2">
                    <Button variant="white" size="sm" onPress={() => setDetailTarget(row)}>
                        Lihat
                    </Button>
                    <Button variant="white" size="sm" onPress={() => setEditTarget(row)}>
                        Edit
                    </Button>
                    <Button variant="red" size="sm" onPress={() => setDeleteTarget(row)}>
                        Hapus
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-end">
                <Button variant="coral" size="md" onPress={() => setIsGenerateOpen(true)}>
                    Generate soal
                </Button>
            </div>
            <DataTable<SoalItem> ariaLabel="Tabel Bank Soal" columns={columns} rows={paginatedData} />

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

            <DetailSoalModal
                item={detailTarget}
                isOpen={Boolean(detailTarget)}
                onOpenChange={(open) => {
                    if (!open) setDetailTarget(null);
                }}
                onToggleAktif={handleToggleAktif}
                onEdit={(item) => setEditTarget(item)}
                onDelete={(item) => setDeleteTarget(item)}
            />

            <EditSoalModal
                item={editTarget}
                isOpen={Boolean(editTarget)}
                onOpenChange={(open) => {
                    if (!open) setEditTarget(null);
                }}
                onSave={handleSaveEdit}
            />

            <GenerateSoalModal
                isOpen={isGenerateOpen}
                onOpenChange={setIsGenerateOpen}
                onApprove={handleApproveGenerated}
            />

            <ConfirmModal
                isOpen={Boolean(deleteTarget)}
                onOpenChange={(open) => {
                    if (!open) setDeleteTarget(null);
                }}
                title={deleteTarget?.aktif ? "Soal aktif tidak bisa dihapus" : "Konfirmasi"}
                message={
                    deleteTarget?.aktif
                        ? "Soal ini masih aktif. Jika ingin menghapus harus menonaktifkan soal terlebih dahulu."
                        : "Apakah anda yakin akan menghapus soal ini?"
                }
                confirmLabel={deleteTarget?.aktif ? "Nonaktifkan" : "Hapus"}
                confirmVariant="red"
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}