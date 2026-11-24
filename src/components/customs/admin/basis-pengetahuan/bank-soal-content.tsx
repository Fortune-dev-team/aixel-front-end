"use client";

import React, { useState } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/button";

interface SoalItem {
    id: string;
    soal: string;
    jawaban: string;
    atribut: string;
    level: 1 | 2;
    aktif: boolean;
}

const INITIAL_DATA: SoalItem[] = [
    { id: "1", soal: "Rekan tidak paham pesan Anda. Apa yang Anda lakukan?", jawaban: "Menanyakan bagian yang belum jelas", atribut: "Komunikasi", level: 1, aktif: true },
    { id: "2", soal: "Rekan tidak paham pesan Anda. Apa langkah berikutnya?", jawaban: "Menanyakan bagian yang belum jelas", atribut: "Komunikasi", level: 1, aktif: true },
    { id: "3", soal: "Dua rekan berselisih soal pembagian tugas. Apa respons Anda?", jawaban: "Esai, dinilai AI dengan rubrik", atribut: "Komunikasi", level: 2, aktif: true },
    { id: "4", soal: "Rekan tidak paham pesan Anda. Bagaimana menyampaikannya ulang?", jawaban: "Menanyakan bagian yang belum jelas", atribut: "Komunikasi", level: 1, aktif: true },
    { id: "5", soal: "Rekan tidak paham pesan Anda. Apa yang perlu diperbaiki?", jawaban: "Menanyakan bagian yang belum jelas", atribut: "Komunikasi", level: 1, aktif: false },
];

const truncate = (text: string, max: string) => (
    <span title={text} className={`block truncate ${max}`}>
        {text}
    </span>
);

export function BankSoalContent() {
    const [rows, setRows] = useState<SoalItem[]>(INITIAL_DATA);

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
                    <Button variant="white" size="sm">
                        Lihat
                    </Button>
                    <Button variant="white" size="sm">
                        Edit
                    </Button>
                    <Button variant="red" size="sm" onPress={() => setRows((l) => l.filter((r) => r.id !== row.id))}>
                        Hapus
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-end">
                <Button variant="coral" size="md">
                    Generate soal
                </Button>
            </div>
            <DataTable<SoalItem> ariaLabel="Tabel Bank Soal" columns={columns} rows={rows} />
        </div>
    );
}