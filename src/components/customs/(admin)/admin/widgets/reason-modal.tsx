"use client";

import * as React from "react";
import { Modal } from "@heroui/react";
import { X } from "lucide-react";
import { Button, type ButtonVariant } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TextLabel } from "@/components/ui/textlabel";

export interface ReasonModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    subtitle?: string;
    fieldLabel?: string;
    placeholder?: string;
    cancelLabel?: string;
    confirmLabel: string;
    confirmVariant?: ButtonVariant;
    errorMessage?: string;
    onSubmit: (reason: string) => void | boolean | Promise<void | boolean>;
    isSubmitting?: boolean;
}

export function ReasonModal({
    isOpen,
    onOpenChange,
    title,
    subtitle,
    fieldLabel = "Keterangan",
    placeholder = "Tulis catatan Anda...",
    cancelLabel = "Batal",
    confirmLabel,
    confirmVariant = "red",
    errorMessage = "Keterangan wajib diisi.",
    onSubmit,
    isSubmitting = false,
}: ReasonModalProps) {
    const [reason, setReason] = React.useState("");
    const [error, setError] = React.useState("");

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setReason("");
            setError("");
        }
        onOpenChange(open);
    };

    const handleConfirm = async () => {
        if (isSubmitting) return;
        if (!reason.trim()) {
            setError(errorMessage);
            return;
        }
        setError("");
        const result = await onSubmit(reason.trim());
        if (result !== false) {
            handleOpenChange(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
            <Modal.Backdrop className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]/40 p-4">
                <Modal.Container className="w-full max-w-md">
                    <Modal.Dialog className="w-full rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 text-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] outline-none">
                        <Modal.Header className="flex flex-row items-start justify-between gap-3 p-0">
                            <div className="flex flex-col gap-1">
                                <Modal.Heading className="font-mono text-base font-extrabold text-[#0A0A0A]">
                                    {title}
                                </Modal.Heading>
                                {subtitle && (
                                    <p className="font-sans text-xs leading-relaxed text-[#525252]">
                                        {subtitle}
                                    </p>
                                )}
                            </div>
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

                        <Modal.Body className="mt-3 p-0">
                            <div className="flex flex-col gap-1.5">
                                <TextLabel required>{fieldLabel}</TextLabel>
                                <Textarea
                                    rows={4}
                                    value={reason}
                                    disabled={isSubmitting}
                                    variant={error ? "error" : "default"}
                                    placeholder={placeholder}
                                    onChange={(e) => {
                                        setReason(e.target.value);
                                        if (error) setError("");
                                    }}
                                    className="rounded-lg border-[1.5px] bg-[#FDFCFA]"
                                />
                                {error && (
                                    <p className="font-sans text-[11px] font-medium text-[#DC2626]">
                                        {error}
                                    </p>
                                )}
                            </div>
                        </Modal.Body>

                        <Modal.Footer className="mt-4 flex flex-row items-center justify-start gap-2.5 p-0">
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
                                {isSubmitting ? "Mengirim..." : confirmLabel}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
