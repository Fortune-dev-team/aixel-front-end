"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

interface ConfirmModalProps {
    isOpen: boolean;
    title?: string;
    message: string;
    cancelLabel?: string;
    confirmLabel?: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export function ConfirmModal({
    isOpen,
    title = "Konfirmasi",
    message,
    cancelLabel = "Batal",
    confirmLabel = "Ya, kirim",
    onCancel,
    onConfirm,
}: ConfirmModalProps) {
    React.useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCancel();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-confirm-title"
            onClick={onCancel}
        >
            <div
                className="w-full max-w-md rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 shadow-[4px_4px_0_0_#0A0A0A]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-3">
                    <h2
                        id="course-confirm-title"
                        className="font-mono text-base font-bold text-[#0A0A0A]"
                    >
                        {title}
                    </h2>
                    <button
                        type="button"
                        onClick={onCancel}
                        aria-label="Tutup modal"
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
                    {message}
                </p>

                <div className="mt-5 flex items-center gap-2.5">
                    <Button variant="white" size="sm" onPress={onCancel}>
                        {cancelLabel}
                    </Button>
                    <Button variant="coral" size="sm" onPress={onConfirm}>
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
}