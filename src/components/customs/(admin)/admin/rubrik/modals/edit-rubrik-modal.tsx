"use client";

import * as React from "react";
import { Modal } from "@heroui/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export interface EditRubrikModalProps {
    atribut: string;
    initialDraft: string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (draft: string) => void;
}

export function EditRubrikModal({
    atribut,
    initialDraft,
    isOpen,
    onOpenChange,
    onSave,
}: EditRubrikModalProps) {
    if (!isOpen) return null;

    return (
        <EditRubrikModalInner
            key={`${atribut}-${initialDraft}`}
            atribut={atribut}
            initialDraft={initialDraft}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onSave={onSave}
        />
    );
}

function EditRubrikModalInner({
    atribut,
    initialDraft,
    isOpen,
    onOpenChange,
    onSave,
}: EditRubrikModalProps) {
    const [draft, setDraft] = React.useState(initialDraft);
    const [error, setError] = React.useState("");

    const handleSave = () => {
        if (!draft.trim()) {
            setError("Teks draft rubrik tidak boleh kosong.");
            return;
        }
        onSave(draft.trim());
        onOpenChange(false);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <Modal.Backdrop className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]/40 p-4">
                <Modal.Container className="w-full max-w-lg">
                    <Modal.Dialog className="w-full rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 text-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] outline-none">
                        <Modal.Header className="flex flex-row items-start justify-between gap-3 p-0">
                            <Modal.Heading className="font-mono text-base font-extrabold text-[#0A0A0A]">
                                Edit Draft Rubrik · {atribut}
                            </Modal.Heading>
                            <button
                                type="button"
                                onClick={() => onOpenChange(false)}
                                aria-label="Tutup modal"
                                className="cursor-pointer rounded p-0.5 text-[#0A0A0A] transition-colors hover:bg-black/5"
                            >
                                <X className="size-4 stroke-[2.2]" />
                            </button>
                        </Modal.Header>

                        <Modal.Body className="mt-4 p-0">
                            <Textarea
                                rows={5}
                                value={draft}
                                variant={error ? "error" : "default"}
                                placeholder="Teks draft"
                                onChange={(e) => {
                                    setDraft(e.target.value);
                                    if (error) setError("");
                                }}
                                className="rounded-lg border-[1.5px] bg-[#FDFCFA]"
                            />
                            {error && (
                                <p className="mt-1 font-sans text-[11px] font-medium text-[#DC2626]">
                                    {error}
                                </p>
                            )}
                        </Modal.Body>

                        <Modal.Footer className="mt-4 flex flex-row items-center justify-start gap-2.5 p-0">
                            <Button
                                variant="white"
                                size="sm"
                                onPress={() => onOpenChange(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                variant="coral"
                                size="sm"
                                onPress={handleSave}
                            >
                                Simpan draf
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
