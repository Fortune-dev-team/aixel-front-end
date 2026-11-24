"use client";

import * as React from "react";
import { INITIAL_RENEWAL_ITEMS } from "./constants";
import type {
    AttributeRenewalItem,
    AttributeRenewalStatus,
    PerpanjanganToastState,
} from "./interfaces";

export function usePerpanjanganAtribut() {
    const [items, setItems] = React.useState<AttributeRenewalItem[]>(
        INITIAL_RENEWAL_ITEMS
    );
    const [selectedItem, setSelectedItem] =
        React.useState<AttributeRenewalItem | null>(null);
    const [toast, setToast] = React.useState<PerpanjanganToastState | null>(null);

    const showToast = React.useCallback(
        (type: "success" | "error", message: string) => {
            setToast({ id: Date.now(), type, message });
        },
        []
    );

    const dismissToast = React.useCallback(() => {
        setToast(null);
    }, []);

    const handleOpenUploadModal = (item: AttributeRenewalItem) => {
        setSelectedItem(item);
    };

    const handleCloseUploadModal = React.useCallback(() => {
        setSelectedItem(null);
    }, []);

    const handleSubmitProof = (file: File | null, projectNote: string) => {
        if (!selectedItem) return;

        if (!file || !projectNote.trim()) {
            showToast("error", "Bukti gagal dikirim.");
            return;
        }

        const targetId = selectedItem.id;
        setItems((prev) =>
            prev.map((item) =>
                item.id === targetId
                    ? {
                        ...item,
                        status: "pending_review",
                        note: undefined,
                    }
                    : item
            )
        );
        setSelectedItem(null);
        showToast("success", "Bukti perpanjangan terkirim.");
    };

    const simulateKomunikasiStatus = (nextStatus: AttributeRenewalStatus) => {
        setItems((prev) =>
            prev.map((item) => {
                if (item.id !== "komunikasi") return item;
                return {
                    ...item,
                    status: nextStatus,
                    note:
                        nextStatus === "rejected"
                            ? "Bukti kurang meyakinkan, silakan kirim ulang jika ada."
                            : undefined,
                };
            })
        );
    };

    return {
        items,
        selectedItem,
        toast,
        dismissToast,
        handleOpenUploadModal,
        handleCloseUploadModal,
        handleSubmitProof,
        simulateKomunikasiStatus,
    };
}