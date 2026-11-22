"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
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
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const resetForm = React.useCallback(() => {
        setSelectedFile(null);
        setProjectNote("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
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
                    <div>
                        <label
                            htmlFor="renewal-proof-file"
                            className="block font-mono text-xs font-bold text-[#0A0A0A]"
                        >
                            Berkas
                        </label>
                        <div className="mt-1.5 flex items-center gap-2.5 rounded-lg border-2 border-[#0A0A0A] bg-white px-2.5 py-2">
                            <input
                                ref={fileInputRef}
                                id="renewal-proof-file"
                                type="file"
                                onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                                className="sr-only"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="shrink-0 cursor-pointer rounded border border-[#0A0A0A]/50 bg-[#EFEFEB] px-2.5 py-0.5 font-sans text-[11px] font-medium text-[#0A0A0A] transition-colors hover:bg-[#E5E5E0]"
                            >
                                Choose File
                            </button>
                            <span className="truncate font-sans text-xs text-[#6B6B6B]">
                                {selectedFile ? selectedFile.name : "No file chosen"}
                            </span>
                        </div>
                    </div>

                    {/* Input Keterangan Proyek */}
                    <div>
                        <label
                            htmlFor="renewal-project-note"
                            className="block font-mono text-xs font-bold text-[#0A0A0A]"
                        >
                            Keterangan proyek
                        </label>
                        <input
                            id="renewal-project-note"
                            type="text"
                            value={projectNote}
                            onChange={(e) => setProjectNote(e.target.value)}
                            placeholder="Masukkan keterangan proyek"
                            className="mt-1.5 w-full rounded-lg border-2 border-[#0A0A0A] bg-white px-3 py-2 font-sans text-xs text-[#0A0A0A] placeholder:text-[#737373] focus:outline-none"
                        />
                    </div>
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