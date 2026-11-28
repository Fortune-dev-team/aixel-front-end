"use client";

import React, { useMemo, useState } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { ConfirmModal } from "../widgets/confirm-modal";
import { TambahModulModal } from "./modals/tambah-modul-modal";
import { TambahVideoArtikelModal } from "./modals/tambah-video-artikel-modal";

type Jenis = "Modul" | "Video" | "Artikel";

interface MateriItem {
    id: string;
    judul: string;
    jenis: Jenis;
    atribut: string;
    /** File name for Modul, "link" for Video/Artikel */
    sumber: string;
    aktif: boolean;
}

const INITIAL_DATA: MateriItem[] = [
    { id: "1", judul: "Root Cause Analysis", jenis: "Modul", atribut: "Problem Solving", sumber: "root-cause-analysis.pdf", aktif: true },
    { id: "2", judul: "Studi Kasus Komunikasi Tim", jenis: "Modul", atribut: "Komunikasi", sumber: "studi-kasus-komunikasi.pdf", aktif: true },
    { id: "3", judul: "Dasar Presentasi Efektif", jenis: "Video", atribut: "Komunikasi", sumber: "link", aktif: false },
    { id: "4", judul: "Matriks Prioritas", jenis: "Artikel", atribut: "Problem Solving", sumber: "link", aktif: true },
    { id: "5", judul: "Fasilitasi Konflik Tim", jenis: "Video", atribut: "Kepemimpinan", sumber: "link", aktif: true },
    { id: "6", judul: "Dasar Kepemimpinan", jenis: "Artikel", atribut: "Kepemimpinan", sumber: "link", aktif: true },
];

export function SumberMateriContent() {
    const [rows, setRows] = useState<MateriItem[]>(INITIAL_DATA);
    const [atribut, setAtribut] = useState("");
    const [isAddModulOpen, setIsAddModulOpen] = useState(false);
    const [isAddVideoArtikelOpen, setIsAddVideoArtikelOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<MateriItem | null>(null);
    const [page, setPage] = useState(1);

    const atributOptions = useMemo(() => Array.from(new Set(rows.map((r) => r.atribut))), [rows]);
    const filtered = atribut ? rows.filter((r) => r.atribut === atribut) : rows;

    const ITEMS_PER_PAGE = 5;
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedData = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const setAktif = (id: string, aktif: boolean) =>
        setRows((list) => list.map((r) => (r.id === id ? { ...r, aktif } : r)));

    const handleAddModul = ({ judul, atribut: attr, fileName }: { judul: string; atribut: string; fileName: string }) => {
        setRows((list) => [
            ...list,
            {
                id: String(Date.now()),
                judul,
                jenis: "Modul",
                atribut: attr,
                sumber: fileName,
                aktif: true,
            },
        ]);
    };

    const handleAddVideoArtikel = ({
        judul,
        atribut: attr,
        jenis,
        sumber,
    }: {
        judul: string;
        atribut: string;
        jenis: "Video" | "Artikel";
        sumber: string;
    }) => {
        setRows((list) => [
            ...list,
            {
                id: String(Date.now()),
                judul,
                jenis,
                atribut: attr,
                sumber,
                aktif: true,
            },
        ]);
    };

    const handleConfirmDelete = () => {
        if (!deleteTarget) return;
        if (deleteTarget.aktif) {
            setAktif(deleteTarget.id, false);
        } else {
            setRows((list) => list.filter((r) => r.id !== deleteTarget.id));
        }
        setDeleteTarget(null);
    };

    const columns: DataTableColumn<MateriItem>[] = [
        { key: "judul", label: "Judul", align: "left" },
        {
            key: "jenis",
            label: "Jenis",
            align: "left",
            render: (row) => <Chip variant={row.jenis === "Modul" ? "coral" : "neutral"}>{row.jenis}</Chip>,
        },
        { key: "atribut", label: "Atribut", align: "left" },
        {
            key: "sumber",
            label: "Asal atau berkas",
            align: "left",
            render: (row) =>
                row.jenis === "Modul" ? (
                    <span className="inline-block max-w-[11rem] truncate rounded bg-zinc-300 px-1.5 py-0.5 font-mono text-xs align-middle">
                        {row.sumber}
                    </span>
                ) : (
                    <span className="text-xs">{row.sumber}</span>
                ),
        },
        {
            key: "aktif",
            label: "Status",
            align: "left",
            render: (row) => <Chip variant={row.aktif ? "green" : "red"}>{row.aktif ? "Aktif" : "Nonaktif"}</Chip>,
        },
        {
            key: "id",
            label: "Aksi",
            align: "left",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <Toggle
                        checked={row.aktif}
                        onCheckedChange={(v) => setAktif(row.id, v)}
                        aria-label={`${row.aktif ? "Nonaktifkan" : "Aktifkan"} ${row.judul}`}
                    />
                    <Button variant="red" size="sm" onPress={() => setDeleteTarget(row)}>
                        Hapus
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="filter-atribut" className="font-mono text-xs font-bold text-black">
                        Atribut
                    </label>
                    <select
                        id="filter-atribut"
                        value={atribut}
                        onChange={(e) => {
                            setAtribut(e.target.value);
                            setPage(1);
                        }}
                        className="h-10 w-64 rounded-lg border-[1.5px] border-black bg-[#fdfcfa] px-3 font-mono text-xs text-zinc-600 outline-none focus:border-[#ff4a1c]"
                    >
                        <option value="">Semua atribut</option>
                        {atributOptions.map((a) => (
                            <option key={a} value={a}>
                                {a}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Button variant="coral" size="md" onPress={() => setIsAddModulOpen(true)}>
                        Tambah modul
                    </Button>
                    <Button variant="white" size="md" onPress={() => setIsAddVideoArtikelOpen(true)}>
                        Tambah video atau artikel
                    </Button>
                </div>
            </div>

            <DataTable<MateriItem> ariaLabel="Tabel Sumber Materi" columns={columns} rows={paginatedData} />

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

            <TambahModulModal
                isOpen={isAddModulOpen}
                onOpenChange={setIsAddModulOpen}
                atributOptions={atributOptions}
                onSubmit={handleAddModul}
            />

            <TambahVideoArtikelModal
                isOpen={isAddVideoArtikelOpen}
                onOpenChange={setIsAddVideoArtikelOpen}
                atributOptions={atributOptions}
                onSubmit={handleAddVideoArtikel}
            />

            <ConfirmModal
                isOpen={Boolean(deleteTarget)}
                onOpenChange={(open) => {
                    if (!open) setDeleteTarget(null);
                }}
                title={deleteTarget?.aktif ? "Sumber aktif tidak bisa dihapus" : "Konfirmasi"}
                message={
                    deleteTarget?.aktif
                        ? "Sumber ini masih aktif. Jika ingin menghapus harus menonaktifkan sumber terlebih dahulu."
                        : `Hapus sumber ${deleteTarget?.judul ?? ""}?`
                }
                confirmLabel={deleteTarget?.aktif ? "Nonaktifkan" : "Hapus"}
                confirmVariant="red"
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}