"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

interface RejectMentorModalProps {
    isOpen: boolean;
    attributeTitle: string;
    onClose: () => void;
    onSubmit: (reason: string) => void;
}

export function RejectMentorModal({
    isOpen,
    attributeTitle,
    onClose,
    onSubmit,
}: RejectMentorModalProps) {
    const [reason, setReason] = React.useState("");

    const handleClose = React.useCallback(() => {
        setReason("");
        onClose();
    }, [onClose]);

    React.useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, handleClose]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        const currentReason = reason;
        if (currentReason.trim()) {
            setReason("");
        }
        onSubmit(currentReason);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-tolak-mentor-title"
            onClick={handleClose}
        >
            <div
                className="w-full max-w-md rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 shadow-[4px_4px_0_0_#0A0A0A]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-3">
                    <h2
                        id="modal-tolak-mentor-title"
                        className="font-mono text-sm font-bold text-[#0A0A0A] sm:text-base"
                    >
                        Tolak undangan mentor &middot; {attributeTitle}
                    </h2>

                    <button
                        type="button"
                        onClick={handleClose}
                        aria-label="Tutup modal penolakan"
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

                <p className="mt-2 font-sans text-xs text-[#404040]">
                    Alasan Anda akan dibaca admin sebelum mempertimbangkan pengajuan berikutnya.
                </p>

                <div className="mt-4">
                    <label
                        htmlFor="reject-mentor-reason"
                        className="block font-mono text-xs font-bold text-[#0A0A0A]"
                    >
                        Keterangan <span className="text-[#DC2626]">*</span>
                    </label>
                    <textarea
                        id="reject-mentor-reason"
                        rows={4}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Tulis catatan Anda..."
                        className="mt-1.5 w-full rounded-lg border-2 border-[#0A0A0A] bg-white p-3 font-sans text-xs text-[#0A0A0A] placeholder:text-[#737373] focus:outline-none"
                    />
                </div>

                <div className="mt-5 flex items-center gap-2.5">
                    <Button variant="white" size="sm" onPress={handleClose}>
                        Batal
                    </Button>
                    <Button variant="coral" size="sm" onPress={handleSubmit}>
                        Kirim penolakan
                    </Button>
                </div>
            </div>
        </div>
    );
}