"use client";

import * as React from "react";
import { toast } from "@heroui/react";
import { INITIAL_RENEWAL_ITEMS } from "./constants";
import type {
    AttributeRenewalItem,
    AttributeRenewalStatus,
} from "./interfaces";

export function usePerpanjanganAtribut() {
    const [items, setItems] = React.useState<AttributeRenewalItem[]>(
        INITIAL_RENEWAL_ITEMS
    );
    const [selectedItem, setSelectedItem] =
        React.useState<AttributeRenewalItem | null>(null);

    const handleOpenUploadModal = (item: AttributeRenewalItem) => {
        setSelectedItem(item);
    };

    const handleCloseUploadModal = React.useCallback(() => {
        setSelectedItem(null);
    }, []);

    const handleSubmitProof = (file: File | null, projectNote: string) => {
        if (!selectedItem) return;

        if (!file || !projectNote.trim()) {
            toast.danger("Bukti gagal dikirim.", { timeout: 4000 });
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
        toast.success("Bukti perpanjangan terkirim.", { timeout: 4000 });
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
        handleOpenUploadModal,
        handleCloseUploadModal,
        handleSubmitProof,
        simulateKomunikasiStatus,
    };
}