"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

export interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
    React.useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-keluar-title"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 shadow-[4px_4px_0_0_#0A0A0A]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-3">
                    <h2
                        id="modal-keluar-title"
                        className="font-mono text-base font-bold text-[#0A0A0A]"
                    >
                        Konfirmasi
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup modal konfirmasi keluar"
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

                <p className="mt-2 font-sans text-xs text-[#404040] sm:text-sm">
                    Apakah Anda yakin ingin keluar dari akun Aixel?
                </p>

                <div className="mt-5 flex items-center gap-2.5">
                    <Button variant="white" size="sm" onPress={onClose}>
                        Batal
                    </Button>
                    <Button variant="coral" size="sm" onPress={onConfirm}>
                        Keluar
                    </Button>
                </div>
            </div>
        </div>
    );
}