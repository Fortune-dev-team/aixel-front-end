"use client";

import * as React from "react";
import { Modal } from "@heroui/react";
import { X } from "lucide-react";
import { Button, type ButtonVariant } from "@/components/ui/button";

export interface ConfirmModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    message: string;
    cancelLabel?: string;
    confirmLabel?: string;
    confirmVariant?: ButtonVariant;
    onConfirm: () => void | Promise<void>;
    isSubmitting?: boolean;
}

export function ConfirmModal({
    isOpen,
    onOpenChange,
    title = "Konfirmasi",
    message,
    cancelLabel = "Batal",
    confirmLabel = "Ya, lanjutkan",
    confirmVariant = "coral",
    onConfirm,
    isSubmitting = false,
}: ConfirmModalProps) {
    const handleConfirm = async () => {
        if (isSubmitting) return;
        await onConfirm();
        onOpenChange(false);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <Modal.Backdrop className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]/40 p-4">
                <Modal.Container className="w-full max-w-md">
                    <Modal.Dialog className="w-full rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 text-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] outline-none">
                        <Modal.Header className="flex flex-row items-start justify-between gap-3 p-0">
                            <Modal.Heading className="font-mono text-base font-extrabold text-[#0A0A0A]">
                                {title}
                            </Modal.Heading>
                            <button
                                type="button"
                                onClick={() => onOpenChange(false)}
                                disabled={isSubmitting}
                                aria-label="Tutup modal"
                                className="cursor-pointer rounded p-0.5 text-[#0A0A0A] transition-colors hover:bg-black/5 disabled:opacity-50"
                            >
                                <X className="size-4 stroke-[2.2]" />
                            </button>
                        </Modal.Header>

                        <Modal.Body className="mt-2 p-0">
                            <p className="font-sans text-xs leading-relaxed text-[#525252] sm:text-sm">
                                {message}
                            </p>
                        </Modal.Body>

                        <Modal.Footer className="mt-5 flex flex-row items-center justify-start gap-2.5 p-0">
                            <Button
                                variant="white"
                                size="sm"
                                onPress={() => {
                                    if (!isSubmitting) onOpenChange(false);
                                }}
                            >
                                {cancelLabel}
                            </Button>
                            <Button
                                variant={confirmVariant}
                                size="sm"
                                onPress={handleConfirm}
                            >
                                {isSubmitting ? "Memproses..." : confirmLabel}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
