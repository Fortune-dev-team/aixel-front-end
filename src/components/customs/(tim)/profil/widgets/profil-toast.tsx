"use client";

import { AlertTriangle, Check, X } from "lucide-react";
import type { ProfilToastState } from "../interfaces";

interface ProfilToastProps {
    toast: ProfilToastState | null;
    onClose: () => void;
}

export function ProfilToast({ toast, onClose }: ProfilToastProps) {
    if (!toast) return null;

    const isSuccess = toast.type === "success";

    return (
        <div
            role="status"
            aria-live="polite"
            className="fixed right-5 bottom-5 z-50 flex items-center gap-3 rounded-lg border-2 border-[#0A0A0A] bg-[#111111] px-4 py-2.5 text-[#FDFCFA] shadow-[3px_3px_0_0_#FF5722]"
        >
            {isSuccess ? (
                <Check className="size-4 shrink-0 text-[#22C55E]" aria-hidden="true" />
            ) : (
                <AlertTriangle
                    className="size-4 shrink-0 text-[#EF4444]"
                    aria-hidden="true"
                />
            )}

            <span className="font-mono text-xs font-medium">{toast.message}</span>

            <button
                type="button"
                onClick={onClose}
                aria-label="Tutup notifikasi"
                className="ml-2 cursor-pointer text-[#A3A3A3] transition-colors hover:text-white"
            >
                <X className="size-3.5" />
            </button>
        </div>
    );
}