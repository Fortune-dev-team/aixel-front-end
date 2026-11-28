"use client";

import * as React from "react";
import {
    ListBox,
    Modal,
    Select,
    type Key,
} from "@heroui/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/Chip";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { TextLabel } from "@/components/ui/textlabel";
import type { SoalItem } from "../interfaces";

export interface EditSoalModalProps {
    item: SoalItem | null;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (updated: SoalItem) => void;
}

export function EditSoalModal({
    item,
    isOpen,
    onOpenChange,
    onSave,
}: EditSoalModalProps) {
    if (!isOpen || !item) return null;

    return (
        <EditSoalModalInner
            key={item.id}
            item={item}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onSave={onSave}
        />
    );
}

function EditSoalModalInner({
    item,
    isOpen,
    onOpenChange,
    onSave,
}: Omit<EditSoalModalProps, "item"> & { item: SoalItem }) {
    const initialOpts = item.pilihan ?? [
        "Mengulang dengan suara lebih keras",
        item.jawaban,
        "Melanjutkan ke topik berikutnya",
    ];
    const initialCorrectIdx = initialOpts.findIndex((o) => o === item.jawaban);

    const [aktif, setAktif] = React.useState(item.aktif);
    const [pertanyaan, setPertanyaan] = React.useState(item.soal);
    const [pilihan1, setPilihan1] = React.useState(initialOpts[0] ?? "");
    const [pilihan2, setPilihan2] = React.useState(initialOpts[1] ?? "");
    const [pilihan3, setPilihan3] = React.useState(initialOpts[2] ?? "");
    const [jawabanBenarKey, setJawabanBenarKey] = React.useState<"1" | "2" | "3">(
        initialCorrectIdx === 0 ? "1" : initialCorrectIdx === 2 ? "3" : "2"
    );
    const [fotoName, setFotoName] = React.useState(item.fotoPendukung ?? "");
    const [error, setError] = React.useState("");
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleSave = () => {
        if (!pertanyaan.trim()) {
            setError(
                item.level === 2
                    ? "Teks kasus wajib diisi."
                    : "Pertanyaan wajib diisi."
            );
            return;
        }

        if (item.level === 1) {
            if (!pilihan1.trim() || !pilihan2.trim() || !pilihan3.trim()) {
                setError("Semua pilihan jawaban wajib diisi.");
                return;
            }
            const opts = [pilihan1.trim(), pilihan2.trim(), pilihan3.trim()];
            const answerMap = {
                "1": opts[0],
                "2": opts[1],
                "3": opts[2],
            };
            onSave({
                ...item,
                aktif,
                soal: pertanyaan.trim(),
                pilihan: opts,
                jawaban: answerMap[jawabanBenarKey],
            });
        } else {
            onSave({
                ...item,
                aktif,
                soal: pertanyaan.trim(),
                fotoPendukung: fotoName || undefined,
            });
        }

        onOpenChange(false);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <Modal.Backdrop className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]/40 p-4">
                <Modal.Container className="w-full max-w-md">
                    <Modal.Dialog className="w-full max-h-[90vh] overflow-y-auto rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 text-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] outline-none">
                        <Modal.Header className="flex flex-col gap-1.5 p-0">
                            <div className="flex items-center justify-between gap-3">
                                <Modal.Heading className="font-mono text-base font-extrabold text-[#0A0A0A]">
                                    Edit soal
                                </Modal.Heading>
                                <div className="flex items-center gap-2.5">
                                    {item.level === 1 && (
                                        <>
                                            <Toggle
                                                checked={aktif}
                                                onCheckedChange={setAktif}
                                                aria-label="Toggle status soal"
                                            />
                                            <Chip variant={aktif ? "green" : "red"}>
                                                {aktif ? "Aktif" : "Nonaktif"}
                                            </Chip>
                                        </>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => onOpenChange(false)}
                                        aria-label="Tutup modal"
                                        className="cursor-pointer rounded p-0.5 text-[#0A0A0A] transition-colors hover:bg-black/5"
                                    >
                                        <X className="size-4 stroke-[2.2]" />
                                    </button>
                                </div>
                            </div>
                            <p className="font-sans text-xs leading-relaxed text-[#525252]">
                                Sumber: {item.modul ?? "Dasar Presentasi Efektif"}. Perubahan langsung berlaku di tim setelah disimpan.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="mt-4 flex flex-col gap-3.5 p-0">
                            {item.level === 1 ? (
                                <>
                                    <div className="flex flex-col gap-1">
                                        <TextLabel>Pertanyaan</TextLabel>
                                        <Textarea
                                            rows={3}
                                            value={pertanyaan}
                                            onChange={(e) => {
                                                setPertanyaan(e.target.value);
                                                if (error) setError("");
                                            }}
                                            className="rounded-lg border-[1.5px] bg-[#FDFCFA]"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <TextLabel>Pilihan 1</TextLabel>
                                        <input
                                            type="text"
                                            value={pilihan1}
                                            onChange={(e) => {
                                                setPilihan1(e.target.value);
                                                if (error) setError("");
                                            }}
                                            className="h-10 w-full rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] px-3 font-sans text-xs text-[#0A0A0A] outline-none focus:border-[#FF4A1C]"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <TextLabel>Pilihan 2</TextLabel>
                                        <Textarea
                                            rows={2}
                                            resize="none"
                                            value={pilihan2}
                                            onChange={(e) => {
                                                setPilihan2(e.target.value);
                                                if (error) setError("");
                                            }}
                                            className="min-h-[56px] rounded-lg border-[1.5px] bg-[#FDFCFA] text-xs"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <TextLabel>Pilihan 3</TextLabel>
                                        <input
                                            type="text"
                                            value={pilihan3}
                                            onChange={(e) => {
                                                setPilihan3(e.target.value);
                                                if (error) setError("");
                                            }}
                                            className="h-10 w-full rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] px-3 font-sans text-xs text-[#0A0A0A] outline-none focus:border-[#FF4A1C]"
                                        />
                                    </div>

                                    <Select
                                        aria-label="Jawaban benar"
                                        selectedKey={jawabanBenarKey}
                                        onSelectionChange={(key: Key | null) => {
                                            if (key === "1" || key === "2" || key === "3") {
                                                setJawabanBenarKey(key);
                                            }
                                        }}
                                        className="flex w-full flex-col gap-1"
                                    >
                                        <TextLabel>Jawaban benar</TextLabel>
                                        <Select.Trigger className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] px-3 font-sans text-xs text-[#0A0A0A] outline-none focus-visible:shadow-[2px_2px_0px_#FF5722]">
                                            <Select.Value className="truncate text-left" />
                                            <Select.Indicator className="size-3.5 shrink-0 text-[#0A0A0A]" />
                                        </Select.Trigger>
                                        <Select.Popover className="z-[60] min-w-[var(--trigger-width)] rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-1 text-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] outline-none">
                                            <ListBox className="flex flex-col gap-0.5 outline-none">
                                                {(["1", "2", "3"] as const).map((k) => (
                                                    <ListBox.Item
                                                        key={k}
                                                        id={k}
                                                        textValue={`Pilihan ${k}`}
                                                        className="flex cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 font-sans text-xs text-[#0A0A0A] outline-none hover:bg-[#EFEFEB] data-[focused=true]:bg-[#EFEFEB] data-[selected=true]:bg-[#FF5722] data-[selected=true]:font-medium data-[selected=true]:text-[#FDFCFA]"
                                                    >
                                                        Pilihan {k}
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                ))}
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col gap-1">
                                        <TextLabel>Teks kasus</TextLabel>
                                        <Textarea
                                            rows={4}
                                            value={pertanyaan}
                                            onChange={(e) => {
                                                setPertanyaan(e.target.value);
                                                if (error) setError("");
                                            }}
                                            className="rounded-lg border-[1.5px] bg-[#FDFCFA]"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <TextLabel>
                                            Foto pendukung{" "}
                                            <span className="font-sans font-normal text-[#525252]">
                                                (opsional, maks. 2 MB)
                                            </span>
                                        </TextLabel>
                                        <div className="flex h-10 items-center gap-2 rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] px-2.5">
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const f = e.target.files?.[0];
                                                    setFotoName(f ? f.name : "");
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
                                                {fotoName || "No file chosen"}
                                            </span>
                                        </div>
                                        <div className="flex justify-end">
                                            <Button
                                                variant="white"
                                                size="sm"
                                                onPress={() => {
                                                    setFotoName("");
                                                    if (fileInputRef.current) {
                                                        fileInputRef.current.value = "";
                                                    }
                                                }}
                                            >
                                                Hapus foto
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {error && (
                                <p className="font-sans text-[11px] font-medium text-[#DC2626]">
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
                                Simpan
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
