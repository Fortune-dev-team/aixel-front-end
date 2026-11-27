"use client";

import * as React from "react";
import { Toast } from "@/components/ui/Toast";
import type { ProfilToastState } from "../interfaces";

interface ProfilToastProps {
    toast: ProfilToastState | null;
    onDismiss: () => void;
}

export function ProfilToast({ toast, onDismiss }: ProfilToastProps) {
    React.useEffect(() => {
        if (!toast) return;
        const timer = window.setTimeout(onDismiss, 3500);
        return () => window.clearTimeout(timer);
    }, [toast, onDismiss]);

    if (!toast) return null;

    return (
        <Toast
            type={toast.type}
            message={toast.message}
            onClose={onDismiss}
            className="fixed right-5 bottom-5 z-50 min-w-[260px] font-mono"
        />
    );
}