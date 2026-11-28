"use client";

import * as React from "react";
import {
    FieldError,
    ListBox,
    Modal,
    Select,
    type Key,
} from "@heroui/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextLabel } from "@/components/ui/textlabel";

export interface TetapkanPemilikModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    anggotaOptions?: string[];
    atributOptions?: string[];
    onSubmit: (data: { anggota: string; atribut: string }) => void;
}

const DEFAULT_ANGGOTA = ["Budi Santoso", "Admin Aixel", "Raka Mahendra", "Tia Anggraini"];
const DEFAULT_ATRIBUT = ["Komunikasi", "Problem Solving", "Kepemimpinan"];

export function TetapkanPemilikModal({
    isOpen,
    onOpenChange,
    anggotaOptions = DEFAULT_ANGGOTA,
    atributOptions = DEFAULT_ATRIBUT,
    onSubmit,
}: TetapkanPemilikModalProps) {
    const [anggota, setAnggota] = React.useState("");
    const [atribut, setAtribut] = React.useState("");
    const [errors, setErrors] = React.useState<{ anggota?: string; atribut?: string }>({});

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setAnggota("");
            setAtribut("");
            setErrors({});
        }
        onOpenChange(open);
    };

    const handleSubmit = () => {
        const nextErrors: { anggota?: string; atribut?: string } = {};
        if (!anggota) nextErrors.anggota = "Pilih anggota terlebih dahulu.";
        if (!atribut) nextErrors.atribut = "Pilih atribut terlebih dahulu.";

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        onSubmit({ anggota, atribut });
        handleOpenChange(false);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
            <Modal.Backdrop className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]/40 p-4">
                <Modal.Container className="w-full max-w-md">
                    <Modal.Dialog className="w-full rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 text-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] outline-none">
                        <Modal.Header className="flex flex-row items-start justify-between gap-3 p-0">
                            <div className="flex flex-col gap-1">
                                <Modal.Heading className="font-mono text-base font-extrabold text-[#0A0A0A]">
                                    Tetapkan pemilik atribut
                                </Modal.Heading>
                                <p className="font-sans text-xs leading-relaxed text-[#525252]">
                                    Untuk anggota yang jelas ahli, tanpa melalui level. Ditandai &quot;ditetapkan admin&quot; dan tetap punya masa berlaku. Pemilik belum otomatis menjadi mentor, undang lewat tabel.
                                </p>
                            </div>
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
                            <Select
                                aria-label="Anggota"
                                placeholder="Select option"
                                selectedKey={anggota || null}
                                onSelectionChange={(key: Key | null) => {
                                    setAnggota(key ? String(key) : "");
                                    if (errors.anggota) setErrors((prev) => ({ ...prev, anggota: undefined }));
                                }}
                                isInvalid={Boolean(errors.anggota)}
                                className="flex w-full flex-col gap-1.5"
                            >
                                <TextLabel required>Anggota</TextLabel>
                                <Select.Trigger className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] px-3 font-sans text-xs text-[#0A0A0A] outline-none focus-visible:shadow-[2px_2px_0px_#FF5722]">
                                    <Select.Value className="truncate text-left data-[placeholder=true]:text-[#737373]" />
                                    <Select.Indicator className="size-3.5 shrink-0 text-[#0A0A0A]" />
                                </Select.Trigger>
                                <Select.Popover className="z-[60] min-w-[var(--trigger-width)] rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-1 text-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] outline-none">
                                    <ListBox className="flex max-h-56 flex-col gap-0.5 overflow-y-auto outline-none">
                                        {anggotaOptions.map((item) => (
                                            <ListBox.Item
                                                key={item}
                                                id={item}
                                                textValue={item}
                                                className="flex cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 font-sans text-xs text-[#0A0A0A] outline-none hover:bg-[#EFEFEB] data-[focused=true]:bg-[#EFEFEB] data-[selected=true]:bg-[#FF5722] data-[selected=true]:font-medium data-[selected=true]:text-[#FDFCFA]"
                                            >
                                                {item}
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                                {errors.anggota && (
                                    <FieldError className="font-sans text-[11px] font-medium text-[#DC2626]">
                                        {errors.anggota}
                                    </FieldError>
                                )}
                            </Select>

                            <Select
                                aria-label="Atribut"
                                placeholder="Select option"
                                selectedKey={atribut || null}
                                onSelectionChange={(key: Key | null) => {
                                    setAtribut(key ? String(key) : "");
                                    if (errors.atribut) setErrors((prev) => ({ ...prev, atribut: undefined }));
                                }}
                                isInvalid={Boolean(errors.atribut)}
                                className="flex w-full flex-col gap-1.5"
                            >
                                <TextLabel required>Atribut</TextLabel>
                                <Select.Trigger className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] px-3 font-sans text-xs text-[#0A0A0A] outline-none focus-visible:shadow-[2px_2px_0px_#FF5722]">
                                    <Select.Value className="truncate text-left data-[placeholder=true]:text-[#737373]" />
                                    <Select.Indicator className="size-3.5 shrink-0 text-[#0A0A0A]" />
                                </Select.Trigger>
                                <Select.Popover className="z-[60] min-w-[var(--trigger-width)] rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-1 text-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] outline-none">
                                    <ListBox className="flex max-h-56 flex-col gap-0.5 overflow-y-auto outline-none">
                                        {atributOptions.map((item) => (
                                            <ListBox.Item
                                                key={item}
                                                id={item}
                                                textValue={item}
                                                className="flex cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 font-sans text-xs text-[#0A0A0A] outline-none hover:bg-[#EFEFEB] data-[focused=true]:bg-[#EFEFEB] data-[selected=true]:bg-[#FF5722] data-[selected=true]:font-medium data-[selected=true]:text-[#FDFCFA]"
                                            >
                                                {item}
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                                {errors.atribut && (
                                    <FieldError className="font-sans text-[11px] font-medium text-[#DC2626]">
                                        {errors.atribut}
                                    </FieldError>
                                )}
                            </Select>
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
                                onPress={handleSubmit}
                            >
                                Tetapkan
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
