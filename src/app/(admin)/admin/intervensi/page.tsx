"use client";

import React from "react";
import { DataTable, DataTableColumn } from "@/components/ui/tableheader";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/formfield";

interface UnresponsiveMentorItem {
    id: string;
    mentor: string;
    permintaan: string;
    menunggu: string;
}

const COLUMNS: DataTableColumn<UnresponsiveMentorItem>[] = [
    { key: "mentor", label: "Mentor", align: "left" },
    { key: "permintaan", label: "Permintaan", align: "left" },
    { key: "menunggu", label: "Menunggu", align: "left" },
    {
        key: "id",
        label: "Aksi",
        align: "left",
        render: () => (
            <div className="flex items-center gap-2">
                <Button variant="white" size="sm">
                    Kirim Pengingat
                </Button>
                <Button variant="coral" size="sm">
                    Alihkan
                </Button>
            </div>
        ),
    },
];

const DATA: UnresponsiveMentorItem[] = [
    {
        id: "1",
        mentor: "Nadia Putri",
        permintaan: "Tia Anggraini",
        menunggu: "5 hari",
    },
];

export default function IntervensiPage() {
    return (
        <div className="flex flex-col gap-8 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="font-mono text-2xl md:text-3xl font-black text-black tracking-tight">
                    Intervensi
                </h1>
                <p className="mt-1 text-sm text-zinc-600">
                    Hanya dua hal: mentor yang tidak merespons, dan koreksi hasil manual dengan alasan.
                </p>
            </div>

            {/* Table */}
            <DataTable<UnresponsiveMentorItem>
                ariaLabel="Tabel Mentor Tidak Merespons"
                columns={COLUMNS}
                rows={DATA}
            />

            {/* Form Section */}
            <div className="flex flex-col gap-3">
                <h2 className="font-mono text-base font-bold text-black">
                    Koreksi Hasil Manual
                </h2>
                <div className="max-w-md rounded-2xl border-2 border-black bg-white p-6 shadow-[4px_4px_0_0_#111111]">
                    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                        {/* Hasil */}
                        <div className="flex flex-col gap-1">
                            <label className="font-mono text-xs font-bold text-black">
                                Hasil <span className="text-[#e5484d]">*</span>
                            </label>
                            <select className="h-10 rounded-lg border-[1.5px] border-black bg-[#fdfcfa] px-3 font-mono text-xs text-zinc-600 outline-none focus:border-[#ff4a1c]">
                                <option value="">Select option</option>
                                <option value="lulus">Lulus</option>
                                <option value="tidak-lulus">Tidak Lulus</option>
                            </select>
                        </div>

                        {/* Keputusan baru */}
                        <div className="flex flex-col gap-1">
                            <label className="font-mono text-xs font-bold text-black">
                                Keputusan baru <span className="text-[#e5484d]">*</span>
                            </label>
                            <select className="h-10 rounded-lg border-[1.5px] border-black bg-[#fdfcfa] px-3 font-mono text-xs text-zinc-600 outline-none focus:border-[#ff4a1c]">
                                <option value="">Select option</option>
                                <option value="setuju">Setuju</option>
                                <option value="tolak">Tolak</option>
                            </select>
                        </div>

                        {/* Alasan */}
                        <FormField
                            label="Alasan"
                            isRequired
                        />

                        <div className="pt-2">
                            <Button variant="coral" size="md">
                                Simpan Koreksi
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
