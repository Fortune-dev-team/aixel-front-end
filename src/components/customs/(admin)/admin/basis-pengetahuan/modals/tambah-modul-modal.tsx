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
import { FormField } from "@/components/ui/formfield";
import { TextLabel } from "@/components/ui/textlabel";

export interface TambahModulModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    atributOptions: string[];
    onSubmit: (data: { judul: string; atribut: string; fileName: string }) => void;
}

export function TambahModulModal({
    isOpen,
    onOpenChange,
    atributOptions,
    onSubmit,
}: TambahModulModalProps) {
    const [judul, setJudul] = React.useState("");
    const [atribut, setAtribut] = React.useState(atributOptions[0] ?? "");
    const [fileName, setFileName] = React.useState("");
    const [errors, setErrors] = React.useState<{
        judul?: string;
        atribut?: string;
        file?: string;
    }>({});
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setJudul("");
            setAtribut(atributOptions[0] ?? "");
            setFileName("");
            setErrors({});
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
        onOpenChange(open);
    };

    const handleSave = () => {
        const nextErrors: { judul?: string; atribut?: string; file?: string } = {};
        if (!judul.trim()) nextErrors.judul = "Judul modul wajib diisi.";
        if (!atribut) nextErrors.atribut = "Pilih atribut terlebih dahulu.";
        if (!fileName) nextErrors.file = "Berkas modul wajib dipilih.";

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        onSubmit({ judul: judul.trim(), atribut, fileName });
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
                                    Tambah modul
                                </Modal.Heading>
                                <p className="font-sans text-xs text-[#525252]">
                                    Modul menjadi materi utama dan sumber soal.
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
                            <FormField
                                label="Judul"
                                placeholder="Judul"
                                value={judul}
                                onChange={(val) => {
                                    setJudul(val);
                                    if (errors.judul) setErrors((prev) => ({ ...prev, judul: undefined }));
                                }}
                                errorMessage={errors.judul}
                                isRequired
                            />

                            <Select
                                aria-label="Atribut"
                                placeholder="Pilih atribut"
                                selectedKey={atribut || null}
                                onSelectionChange={(key: Key | null) => {
                                    setAtribut(key ? String(key) : "");
                                    if (errors.atribut) setErrors((prev) => ({ ...prev, atribut: undefined }));
                                }}
                                isInvalid={Boolean(errors.atribut)}
                                className="flex w-full flex-col gap-1"
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

                            <div className="flex flex-col gap-1">
                                <TextLabel required>Berkas modul</TextLabel>
                                <div className="flex h-10 items-center gap-2 rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] px-2.5">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => {
                                            const f = e.target.files?.[0];
                                            setFileName(f ? f.name : "");
                                            if (errors.file) setErrors((prev) => ({ ...prev, file: undefined }));
                                        }}
                                        className="sr-only"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="cursor-pointer rounded border border-[#0A0A0A] bg-[#EFEFEB] px-2 py-0.5 font-sans text-xs font-medium text-[#0A0A0A] hover:bg-[#E4E4DF]"
                                    >
                                        Choose File
                                    </button>
                                    <span className="truncate font-sans text-xs text-[#737373]">
                                        {fileName || "No file chosen"}
                                    </span>
                                </div>
                                {errors.file && (
                                    <p className="font-sans text-[11px] font-medium text-[#DC2626]">
                                        {errors.file}
                                    </p>
                                )}
                            </div>
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
