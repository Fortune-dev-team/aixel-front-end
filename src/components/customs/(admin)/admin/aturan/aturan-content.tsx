"use client";

import React, { useState } from "react";
import { FormField } from "@/components/ui/formfield";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "../widgets/confirm-modal";

export function AturanContent() {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="font-mono text-2xl md:text-3xl font-black text-black tracking-tight">
                    Kelola Aturan
                </h1>
                <p className="mt-1 text-sm text-zinc-600">
                    Angka-angka sistem. Nilai awal hanya contoh.
                </p>
            </div>

            {/* Form Card */}
            <div className="max-w-full rounded-2xl border-2 border-black bg-white p-6 shadow-[4px_4px_0_0_#111111]">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setIsConfirmOpen(true);
                    }}
                    className="flex flex-col gap-4"
                >
                    <FormField
                        label="Batas goal aktif"
                        isRequired
                    />
                    <FormField
                        label="Nilai lulus (%)"
                        defaultValue="Komunikasi"
                        isRequired
                    />
                    <FormField
                        label="Skor minimal kriteria Level 2 (1-4)"
                        defaultValue="1"
                        isRequired
                    />
                    <FormField
                        label="Lama jeda wawancara (7-14 hari)"
                        placeholder="Video"
                        isRequired
                    />
                    <FormField
                        label="Batas pengajuan ulang wawancara"
                        placeholder="Video"
                        isRequired
                    />
                    <FormField
                        label="Batas mentee per mentor"
                        placeholder="Video"
                        isRequired
                    />
                    <FormField
                        label="Masa berlaku atribut (12-18 bulan)"
                        isRequired
                    />

                    <div className="pt-2">
                        <Button
                            variant="coral"
                            size="md"
                            onPress={() => setIsConfirmOpen(true)}
                        >
                            Simpan Aturan
                        </Button>
                    </div>
                </form>
            </div>

            <ConfirmModal
                isOpen={isConfirmOpen}
                onOpenChange={setIsConfirmOpen}
                title="Konfirmasi"
                message="Simpan aturan? Aturan akan berlaku untuk semua pengguna."
                confirmLabel="Simpan"
                confirmVariant="coral"
                onConfirm={() => {
                    // Persist rule changes
                }}
            />
        </div>
    );
}
