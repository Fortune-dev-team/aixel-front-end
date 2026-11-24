"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import type { CertificateData } from "../interfaces";

interface CertificateModalProps {
    certificate: CertificateData | null;
    onClose: () => void;
}

export function CertificateModal({
    certificate,
    onClose,
}: CertificateModalProps) {
    React.useEffect(() => {
        if (!certificate) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [certificate, onClose]);

    if (!certificate) return null;

    const handleDownload = () => {
        window.print();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-sertifikat-title"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-4 shadow-[4px_4px_0_0_#0A0A0A] sm:p-5"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Kartu Sertifikat */}
                <div className="overflow-hidden rounded-lg border-2 border-[#0A0A0A] bg-[#FDFCFA]">
                    <div className="p-5 sm:p-6">
                        {/* Baris Atas: Logo Aixel & Nomor Sertifikat */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2 select-none">
                                <span
                                    aria-hidden="true"
                                    className="grid size-5 shrink-0 grid-cols-3 grid-rows-3 gap-0.5 rounded-[3px] border border-[#0A0A0A] bg-[#FDFCFA] p-0.5"
                                >
                                    <span className="bg-[#0A0A0A]" />
                                    <span className="bg-transparent" />
                                    <span className="bg-[#0A0A0A]" />
                                    <span className="bg-transparent" />
                                    <span className="bg-[#0A0A0A]" />
                                    <span className="bg-transparent" />
                                    <span className="bg-[#0A0A0A]" />
                                    <span className="bg-transparent" />
                                    <span className="bg-[#0A0A0A]" />
                                </span>
                                <span className="font-heading text-sm font-extrabold tracking-tight text-[#0A0A0A]">
                                    Aixel
                                </span>
                            </div>

                            <div className="text-right">
                                <p className="font-sans text-[10px] text-[#6B6B6B]">
                                    Nomor sertifikat
                                </p>
                                <p className="font-mono text-[11px] font-bold text-[#0A0A0A]">
                                    {certificate.certificateNumber}
                                </p>
                            </div>
                        </div>

                        {/* Konten Tengah Sertifikat */}
                        <div className="mt-5 text-center">
                            <h2
                                id="modal-sertifikat-title"
                                className="font-heading text-lg font-extrabold tracking-tight text-[#0A0A0A] sm:text-xl"
                            >
                                Sertifikat Atribut
                            </h2>

                            <p className="mt-2 font-sans text-[11px] text-[#6B6B6B]">
                                diberikan kepada
                            </p>

                            <p className="mt-1 font-heading text-xl font-extrabold text-[#0A0A0A] sm:text-2xl">
                                {certificate.recipientName}
                            </p>

                            <p className="mt-2 font-sans text-[11px] text-[#6B6B6B]">
                                telah dinyatakan memiliki atribut
                            </p>

                            <div className="mt-2.5 flex items-center justify-center gap-2.5">
                                <span className="inline-flex min-w-[180px] items-center justify-center rounded-md border-2 border-[#0A0A0A] bg-white px-6 py-1.5 font-mono text-xs font-bold text-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A]">
                                    {certificate.attributeTitle}
                                </span>

                                <span
                                    aria-hidden="true"
                                    className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-[#0A0A0A] bg-[#FF4D2D] text-[#0A0A0A]"
                                >
                                    <svg
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.8"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Metadata 3 Kolom */}
                        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-[#0A0A0A]/15 pt-4 text-center">
                            <div>
                                <p className="font-sans text-[10px] text-[#6B6B6B]">
                                    Ditetapkan mentor
                                </p>
                                <p className="mt-0.5 font-mono text-[11px] font-bold text-[#0A0A0A]">
                                    {certificate.mentorName}
                                </p>
                            </div>
                            <div>
                                <p className="font-sans text-[10px] text-[#6B6B6B]">
                                    Tanggal lulus
                                </p>
                                <p className="mt-0.5 font-mono text-[11px] font-bold text-[#0A0A0A]">
                                    {certificate.passedDate}
                                </p>
                            </div>
                            <div>
                                <p className="font-sans text-[10px] text-[#6B6B6B]">
                                    Berlaku sampai
                                </p>
                                <p className="mt-0.5 font-mono text-[11px] font-bold text-[#0A0A0A]">
                                    {certificate.validUntil}
                                </p>
                            </div>
                        </div>

                        <p className="mt-4 text-center font-sans text-[10px] text-[#6B6B6B]">
                            Atribut berlaku 1 tahun dan dapat diperpanjang dengan ikut kembali proyek terkait.
                        </p>
                    </div>

                    {/* Strip Papan Catur Bawah */}
                    <div
                        aria-hidden="true"
                        className="h-3.5 w-full border-t-2 border-[#0A0A0A] bg-[length:12px_12px] bg-[position:0_0,6px_6px] bg-[linear-gradient(45deg,#0A0A0A_25%,transparent_25%,transparent_75%,#0A0A0A_75%),linear-gradient(45deg,#0A0A0A_25%,transparent_25%,transparent_75%,#0A0A0A_75%)]"
                    />
                </div>

                {/* Tombol Bawah Modal */}
                <div className="mt-4 flex items-center gap-2.5">
                    <Button variant="white" size="sm" onPress={onClose}>
                        Tutup
                    </Button>
                    <Button variant="coral" size="sm" onPress={handleDownload}>
                        Unduh
                    </Button>
                </div>
            </div>
        </div>
    );
}