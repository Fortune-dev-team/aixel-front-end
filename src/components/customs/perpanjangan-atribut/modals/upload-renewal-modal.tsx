"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { InputUpload } from "@/components/ui/input-upload";
import type { AttributeRenewalItem } from "../interfaces";

interface UploadRenewalModalProps {
    item: AttributeRenewalItem | null;
    onClose: () => void;
    onSubmit: (file: File | null, projectNote: string) => void;
}

export function UploadRenewalModal({
    item,
    onClose,
    onSubmit,
}: UploadRenewalModalProps) {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [projectNote, setProjectNote] = React.useState("");

    const resetForm = React.useCallback(() => {
        setSelectedFile(null);
        setProjectNote("");
    }, []);

    const handleClose = React.useCallback(() => {
        resetForm();
        onClose();
    }, [onClose, resetForm]);

    React.useEffect(() => {
        if (!item) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [item, handleClose]);

    if (!item) return null;

    const handleSubmit = () => {
        const fileToSend = selectedFile;
        const noteToSend = projectNote;
        if (fileToSend && noteToSend.trim()) {
            resetForm();
        }
        onSubmit(fileToSend, noteToSend);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-unggah-bukti-title"
            onClick={handleClose}
        >
            <div
                className="w-full max-w-md rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 shadow-[4px_4px_0_0_#0A0A0A]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-3">
                    <h2
                        id="modal-unggah-bukti-title"
                        className="font-mono text-base font-bold text-[#0A0A0A]"
                    >
                        Unggah bukti perpanjangan
                    </h2>

                    <button
                        type="button"
                        onClick={handleClose}
                        aria-label="Tutup modal unggah bukti"
                        className="cursor-pointer rounded p-0.5 text-[#0A0A0A] transition-colors hover:bg-black/5"
                    >
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <p className="mt-1.5 font-sans text-xs text-[#404040]">
                    Bukti bahwa Anda memakai atribut {item.attributeTitle} di proyek nyata.
                </p>

                <div className="mt-4 space-y-4">
                    {/* Input Berkas */}
                    <FormField
                        label="Berkas"
                        htmlFor="renewal-proof-file"
                        description={selectedFile ? `Terpilih: ${selectedFile.name}` : "Belum ada berkas dipilih."}
                    >
                        <InputUpload
                            id="renewal-proof-file"
                            size="sm"
                            buttonText="Pilih berkas"
                            onFileChange={(files) => setSelectedFile(files?.[0] ?? null)}
                        />
                    </FormField>

                    {/* Input Keterangan Proyek */}
                    <FormField label="Keterangan proyek" htmlFor="renewal-project-note">
                        <Input
                            id="renewal-project-note"
                            type="text"
                            size="sm"
                            value={projectNote}
                            onChange={(e) => setProjectNote(e.target.value)}
                            placeholder="Masukkan keterangan proyek"
                            className="bg-white"
                        />
                    </FormField>
                </div>

                <div className="mt-5 flex items-center gap-2.5">
                    <Button variant="white" size="sm" onPress={handleClose}>
                        Batal
                    </Button>
                    <Button variant="coral" size="sm" onPress={handleSubmit}>
                        Kirim
                    </Button>
                </div>
            </div>
        </div>
    );
}
