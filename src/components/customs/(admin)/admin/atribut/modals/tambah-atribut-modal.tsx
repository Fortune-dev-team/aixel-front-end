"use client";

import * as React from "react";
import { Modal } from "@heroui/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/formfield";

export interface TambahAtributModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: { nama: string; kategori: string }) => void;
}

export function TambahAtributModal({
    isOpen,
    onOpenChange,
    onSubmit,
}: TambahAtributModalProps) {
    const [nama, setNama] = React.useState("");
    const [kategori, setKategori] = React.useState("");
    const [errors, setErrors] = React.useState<{ nama?: string; kategori?: string }>({});

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setNama("");
            setKategori("");
            setErrors({});
        }
        onOpenChange(open);
    };

    const handleSave = () => {
        const nextErrors: { nama?: string; kategori?: string } = {};
        if (!nama.trim()) nextErrors.nama = "Nama atribut wajib diisi.";
        if (!kategori.trim()) nextErrors.kategori = "Kategori wajib diisi.";

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        onSubmit({ nama: nama.trim(), kategori: kategori.trim() });
        handleOpenChange(false);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
            <Modal.Backdrop className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]/40 p-4">
                <Modal.Container className="w-full max-w-md">
                    <Modal.Dialog className="w-full rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 text-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] outline-none">
                        <Modal.Header className="flex flex-row items-start justify-between gap-3 p-0">
                            <Modal.Heading className="font-mono text-base font-extrabold text-[#0A0A0A]">
                                Tambah Atribut
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

                        <Modal.Body className="mt-4 flex flex-col gap-3.5 p-0">
                            <FormField
                                label="Nama Atribut"
                                value={nama}
                                onChange={(val) => {
                                    setNama(val);
                                    if (errors.nama) setErrors((prev) => ({ ...prev, nama: undefined }));
                                }}
                                errorMessage={errors.nama}
                                isRequired
                            />
                            <FormField
                                label="Kategori"
                                placeholder="Mis. Teknologi, Desain"
                                value={kategori}
                                onChange={(val) => {
                                    setKategori(val);
                                    if (errors.kategori) setErrors((prev) => ({ ...prev, kategori: undefined }));
                                }}
                                errorMessage={errors.kategori}
                                isRequired
                            />
                        </Modal.Body>

                        <Modal.Footer className="mt-5 flex flex-row items-center justify-start gap-2.5 p-0">
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
                                Simpan
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
