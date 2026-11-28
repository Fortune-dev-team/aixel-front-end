"use client";

import * as React from "react";
import { Modal } from "@heroui/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/Chip";
import { Toggle } from "@/components/ui/toggle";
import type { SoalItem } from "../interfaces";

export interface DetailSoalModalProps {
    item: SoalItem | null;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onToggleAktif?: (id: string, aktif: boolean) => void;
    onEdit?: (item: SoalItem) => void;
    onDelete?: (item: SoalItem) => void;
}

export function DetailSoalModal({
    item,
    isOpen,
    onOpenChange,
    onToggleAktif,
    onEdit,
    onDelete,
}: DetailSoalModalProps) {
    if (!item) return null;

    const pilihanList =
        item.pilihan && item.pilihan.length > 0
            ? item.pilihan
            : [item.jawaban];

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <Modal.Backdrop className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]/40 p-4">
                <Modal.Container className="w-full max-w-lg">
                    <Modal.Dialog className="w-full rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 text-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] outline-none">
                        <Modal.Header className="flex flex-col gap-2 p-0">
                            <div className="flex items-center justify-between gap-3">
                                <Modal.Heading className="font-mono text-base font-extrabold text-[#0A0A0A]">
                                    Detail soal
                                </Modal.Heading>
                                <div className="flex items-center gap-2.5">
                                    {item.level === 2 && onToggleAktif && (
                                        <Toggle
                                            checked={item.aktif}
                                            onCheckedChange={(checked) =>
                                                onToggleAktif(item.id, checked)
                                            }
                                            aria-label="Toggle status soal"
                                        />
                                    )}
                                    <Chip variant={item.aktif ? "green" : "red"}>
                                        {item.aktif ? "Aktif" : "Nonaktif"}
                                    </Chip>
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

                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-lg border border-[#0A0A0A] bg-[#F0EDE6] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#0A0A0A]">
                                    Atribut: {item.atribut}
                                </span>
                                <span className="rounded-lg border border-[#0A0A0A] bg-[#F0EDE6] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#0A0A0A]">
                                    Level {item.level}
                                </span>
                                <span className="rounded-lg border border-[#0A0A0A] bg-[#F0EDE6] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#0A0A0A]">
                                    Modul: {item.modul ?? "Dasar Presentasi Efektif"}
                                </span>
                            </div>
                        </Modal.Header>

                        <Modal.Body className="mt-4 p-0">
                            <div className="rounded-xl border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] p-4">
                                <p className="font-sans text-xs font-medium text-[#737373]">
                                    Pertanyaan
                                </p>
                                <p className="mt-1 font-sans text-sm font-bold leading-relaxed text-[#0A0A0A]">
                                    {item.soal}
                                </p>

                                <hr className="my-3 border-t border-[#D4D4D4]" />

                                <p className="font-sans text-xs font-medium text-[#737373]">
                                    Pilihan dan jawaban
                                </p>

                                {item.level === 2 ? (
                                    <p className="mt-1.5 font-sans text-xs text-[#525252]">
                                        {item.jawaban || "Esai, dinilai AI dengan rubrik."}
                                    </p>
                                ) : (
                                    <ul className="mt-1.5 flex flex-col gap-1.5">
                                        {pilihanList.map((opt, idx) => {
                                            const isCorrect = opt === item.jawaban;
                                            return (
                                                <li
                                                    key={idx}
                                                    className={`font-sans text-xs leading-relaxed ${
                                                        isCorrect
                                                            ? "font-bold text-[#0A0A0A]"
                                                            : "text-[#525252]"
                                                    }`}
                                                >
                                                    {isCorrect ? `✓ ${opt}` : opt}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                        </Modal.Body>

                        <Modal.Footer className="mt-4 flex flex-row items-center justify-start gap-2.5 p-0">
                            {item.level === 2 ? (
                                <>
                                    <Button
                                        variant="white"
                                        size="sm"
                                        onPress={() => {
                                            onOpenChange(false);
                                            onEdit?.(item);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="red"
                                        size="sm"
                                        onPress={() => {
                                            onOpenChange(false);
                                            onDelete?.(item);
                                        }}
                                    >
                                        Hapus
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="white"
                                    size="sm"
                                    onPress={() => onOpenChange(false)}
                                >
                                    Tutup
                                </Button>
                            )}
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
