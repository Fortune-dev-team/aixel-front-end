"use client";

import React, { useState } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "../widgets/confirm-modal";
import { EditRubrikModal } from "./modals/edit-rubrik-modal";

interface RubrikItem {
    id: string;
    atribut: string;
    statusMandiri: "Disetujui" | "Draf" | "Belum ada";
    statusWawancara: "Disetujui";
    draftText?: string;
}

const INITIAL_DATA: RubrikItem[] = [
    {
        id: "1",
        atribut: "Komunikasi",
        statusMandiri: "Disetujui",
        statusWawancara: "Disetujui",
        draftText: "Menilai kejelasan penyampaian pesan, empati, dan tindak lanjut.",
    },
    {
        id: "2",
        atribut: "Problem Solving",
        statusMandiri: "Disetujui",
        statusWawancara: "Disetujui",
        draftText: "Menilai ketepatan identifikasi akar masalah dan solusi terukur.",
    },
    {
        id: "3",
        atribut: "Kepemimpinan",
        statusMandiri: "Draf",
        statusWawancara: "Disetujui",
        draftText: "Menilai kemampuan delegasi, pengambilan keputusan, dan mediasi konflik.",
    },
    {
        id: "4",
        atribut: "UI/UX",
        statusMandiri: "Belum ada",
        statusWawancara: "Disetujui",
    },
];

export function RubrikContent() {
    const [rows, setRows] = useState<RubrikItem[]>(INITIAL_DATA);
    const [editTarget, setEditTarget] = useState<RubrikItem | null>(null);
    const [approveTarget, setApproveTarget] = useState<RubrikItem | null>(null);

    const handleSaveDraft = (draft: string) => {
        if (!editTarget) return;
        setRows((prev) =>
            prev.map((item) =>
                item.id === editTarget.id
                    ? { ...item, draftText: draft, statusMandiri: "Draf" }
                    : item
            )
        );
        setEditTarget(null);
    };

    const handleApprove = () => {
        if (!approveTarget) return;
        setRows((prev) =>
            prev.map((item) =>
                item.id === approveTarget.id
                    ? { ...item, statusMandiri: "Disetujui" }
                    : item
            )
        );
        setApproveTarget(null);
    };

    const handleCreateAiDraft = (row: RubrikItem) => {
        setRows((prev) =>
            prev.map((item) =>
                item.id === row.id
                    ? {
                          ...item,
                          statusMandiri: "Draf",
                          draftText: `Draf rubrik AI untuk atribut ${row.atribut}.`,
                      }
                    : item
            )
        );
    };

    const columns: DataTableColumn<RubrikItem>[] = [
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
                            <Button
                                variant="white"
                                size="sm"
                                onPress={() => setEditTarget(row)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="green"
                                size="sm"
                                onPress={() => setApproveTarget(row)}
                            >
                                Setujui
                            </Button>
                        </div>
                    );
                }
                if (row.statusMandiri === "Belum ada") {
                    return (
                        <Button
                            variant="coral"
                            size="sm"
                            onPress={() => handleCreateAiDraft(row)}
                        >
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
                columns={columns}
                rows={rows}
            />

            <EditRubrikModal
                atribut={editTarget?.atribut ?? ""}
                initialDraft={editTarget?.draftText ?? ""}
                isOpen={Boolean(editTarget)}
                onOpenChange={(open) => {
                    if (!open) setEditTarget(null);
                }}
                onSave={handleSaveDraft}
            />

            <ConfirmModal
                isOpen={Boolean(approveTarget)}
                onOpenChange={(open) => {
                    if (!open) setApproveTarget(null);
                }}
                title="Konfirmasi"
                message={`Setujui rubrik ${approveTarget?.atribut ?? ""}? Setelah disetujui, AI boleh memakainya untuk menilai.`}
                confirmLabel="Setujui"
                confirmVariant="coral"
                onConfirm={handleApprove}
            />
        </div>
    );
}
