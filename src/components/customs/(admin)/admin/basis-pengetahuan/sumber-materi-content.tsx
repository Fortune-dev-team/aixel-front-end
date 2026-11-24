"use client";

import React, { useMemo, useState } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/button";

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

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-black transition-colors ${
                checked ? "bg-[#ff4a1c]" : "bg-[#f0ede6]"
            }`}
        >
            <span
                className={`absolute h-4 w-4 rounded-full border-2 border-black bg-white transition-all ${
                    checked ? "right-0.5" : "left-0.5"
                }`}
            />
        </button>
    );
}

export function SumberMateriContent() {
    const [rows, setRows] = useState<MateriItem[]>(INITIAL_DATA);
    const [atribut, setAtribut] = useState("");

    const atributOptions = useMemo(() => Array.from(new Set(INITIAL_DATA.map((r) => r.atribut))), []);
    const filtered = atribut ? rows.filter((r) => r.atribut === atribut) : rows;

    const setAktif = (id: string, aktif: boolean) =>
        setRows((list) => list.map((r) => (r.id === id ? { ...r, aktif } : r)));
    const remove = (id: string) => setRows((list) => list.filter((r) => r.id !== id));

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
                        onChange={(v) => setAktif(row.id, v)}
                        label={`${row.aktif ? "Nonaktifkan" : "Aktifkan"} ${row.judul}`}
                    />
                    <Button variant="red" size="sm" onPress={() => remove(row.id)}>
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
                        onChange={(e) => setAtribut(e.target.value)}
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
                    <Button variant="coral" size="md">
                        Tambah modul
                    </Button>
                    <Button variant="white" size="md">
                        Tambah video atau artikel
                    </Button>
                </div>
            </div>

            <DataTable<MateriItem> ariaLabel="Tabel Sumber Materi" columns={columns} rows={filtered} />
        </div>
    );
}