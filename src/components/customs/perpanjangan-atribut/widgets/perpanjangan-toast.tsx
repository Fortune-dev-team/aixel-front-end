"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { PerpanjanganToastState } from "../interfaces";

interface PerpanjanganToastProps {
    toast: PerpanjanganToastState | null;
    onDismiss: () => void;
}

export function PerpanjanganToast({
    toast,
    onDismiss,
}: PerpanjanganToastProps) {
    React.useEffect(() => {
        if (!toast) return;
        const timer = window.setTimeout(onDismiss, 3500);
        return () => window.clearTimeout(timer);
    }, [toast, onDismiss]);

    if (!toast) return null;

    return (
        <div
            role="status"
            aria-live="polite"
            className={cn(
                "fixed right-5 bottom-5 z-50 flex min-w-[260px] items-center justify-between gap-4 rounded-md border border-[#0A0A0A] border-b-[3px] bg-[#141414] px-3.5 py-2.5 font-mono text-xs text-white shadow-[3px_3px_0_0_#0A0A0A]",
                toast.type === "success" ? "border-b-[#22C55E]" : "border-b-[#EF4444]"
            )}
        >
            <div className="flex items-center gap-2.5">
                {toast.type === "success" ? (
                    <svg
                        className="h-4 w-4 shrink-0 text-[#22C55E]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                ) : (
                    <svg
                        className="h-4 w-4 shrink-0 text-[#EF4444]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                        />
                    </svg>
                )}
                <span>{toast.message}</span>
            </div>

            <button
                type="button"
                onClick={onDismiss}
                aria-label="Tutup notifikasi"
                className="cursor-pointer text-white/70 transition-colors hover:text-white"
            >
                <svg
                    className="h-3.5 w-3.5"
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
    );
}