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
import { ProgressBar } from "@/components/ui/progressbar";
import { TextLabel } from "@/components/ui/textlabel";
import { ConfirmModal } from "../../widgets/confirm-modal";
import type { SoalItem } from "../interfaces";

export interface GenerateSoalModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    atributOptions?: string[];
    onApprove: (generatedItems: SoalItem[]) => void;
}

type Step = "select" | "progress" | "review";

const DEFAULT_ATRIBUT = ["Komunikasi", "Problem Solving", "Kepemimpinan"];
const MODUL_BY_ATRIBUT: Record<string, string> = {
    Komunikasi: "Studi Kasus Komunikasi Tim",
    "Problem Solving": "Root Cause Analysis",
    Kepemimpinan: "Dasar Kepemimpinan",
};

function buildMockGenerated(atribut: string, level: 1 | 2): SoalItem[] {
    const modul = MODUL_BY_ATRIBUT[atribut] ?? "Modul Utama";
    if (level === 2) {
        return Array.from({ length: 5 }, (_, idx) => ({
            id: `gen-${Date.now()}-${idx}`,
            soal: `Berdasarkan modul "${modul}": Studi kasus ${idx + 1} terkait ${atribut}. Jelaskan langkah Anda beserta alasan dan tindak lanjut.`,
            jawaban: "Esai, dinilai AI dengan rubrik",
            atribut,
            level: 2,
            aktif: true,
            modul,
        }));
    }

    const samples = [
        {
            soal: `Berdasarkan modul "${modul}": Rekan tidak paham penjelasan Anda. Langkah pertama?`,
            pilihan: [
                "Mengulang dengan suara lebih keras",
                "Menanyakan bagian yang belum jelas lalu menjelaskan ulang",
                "Melanjutkan ke topik berikutnya",
            ],
            jawaban: "Menanyakan bagian yang belum jelas lalu menjelaskan ulang",
        },
        {
            soal: `Berdasarkan modul "${modul}": Pesan yang efektif diawali dengan...`,
            pilihan: [
                "Tujuan dan poin utama",
                "Permintaan maaf",
                "Detail teknis selengkapnya",
            ],
            jawaban: "Tujuan dan poin utama",
        },
        {
            soal: `Berdasarkan modul "${modul}": Umpan balik yang baik bersifat...`,
            pilihan: [
                "Disampaikan di depan umum",
                "Spesifik dan dapat ditindaklanjuti",
                "Umum agar tidak menyinggung",
            ],
            jawaban: "Spesifik dan dapat ditindaklanjuti",
        },
        {
            soal: `Berdasarkan modul "${modul}": Saat terjadi kesalahpahaman di rapat tim, sikap terbaik adalah...`,
            pilihan: [
                "Mengabaikan perbedaan pendapat",
                "Merangkum poin masing-masing lalu menyepakati langkah",
                "Menyalahkan pihak yang terlambat bicara",
            ],
            jawaban: "Merangkum poin masing-masing lalu menyepakati langkah",
        },
        {
            soal: `Berdasarkan modul "${modul}": Ringkasan hasil diskusi sebaiknya dibagikan...`,
            pilihan: [
                "Segera setelah rapat selesai agar tindak lanjut jelas",
                "Hanya jika diminta atasan",
                "Sebulan kemudian saat evaluasi",
            ],
            jawaban: "Segera setelah rapat selesai agar tindak lanjut jelas",
        },
    ];

    return samples.map((s, idx) => ({
        id: `gen-${Date.now()}-${idx}`,
        soal: s.soal,
        jawaban: s.jawaban,
        pilihan: s.pilihan,
        atribut,
        level: 1,
        aktif: true,
        modul,
    }));
}

export function GenerateSoalModal({
    isOpen,
    onOpenChange,
    atributOptions = DEFAULT_ATRIBUT,
    onApprove,
}: GenerateSoalModalProps) {
    const [step, setStep] = React.useState<Step>("select");
    const [atribut, setAtribut] = React.useState("");
    const [level, setLevel] = React.useState<"" | "1" | "2">("");
    const [progress, setProgress] = React.useState(0);
    const [generated, setGenerated] = React.useState<SoalItem[]>([]);
    const [errors, setErrors] = React.useState<{ atribut?: string; level?: string }>({});
    const [isCancelConfirmOpen, setIsCancelConfirmOpen] = React.useState(false);

    const resetState = () => {
        setStep("select");
        setAtribut("");
        setLevel("");
        setProgress(0);
        setGenerated([]);
        setErrors({});
        setIsCancelConfirmOpen(false);
    };

    const handleClose = () => {
        resetState();
        onOpenChange(false);
    };

    React.useEffect(() => {
        if (step !== "progress") return;
        const timer = window.setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    window.clearInterval(timer);
                    return 100;
                }
                return Math.min(100, prev + 25);
            });
        }, 300);
        return () => window.clearInterval(timer);
    }, [step]);

    React.useEffect(() => {
        if (step === "progress" && progress >= 100 && atribut && level) {
            const timeout = window.setTimeout(() => {
                setGenerated(buildMockGenerated(atribut, level === "2" ? 2 : 1));
                setStep("review");
            }, 250);
            return () => window.clearTimeout(timeout);
        }
    }, [step, progress, atribut, level]);

    const handleStartGenerate = () => {
        const nextErrors: { atribut?: string; level?: string } = {};
        if (!atribut) nextErrors.atribut = "Pilih atribut terlebih dahulu.";
        if (!level) nextErrors.level = "Pilih level terlebih dahulu.";
        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }
        setProgress(15);
        setStep("progress");
    };

    const handleApprove = () => {
        onApprove(generated);
        handleClose();
    };

    const handleDiscardReview = () => {
        setIsCancelConfirmOpen(false);
        handleClose();
    };

    const selectedModul = atribut ? MODUL_BY_ATRIBUT[atribut] ?? "Modul Aktif" : "";

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={(open) => {
                    if (!open && step === "review") {
                        setIsCancelConfirmOpen(true);
                        return;
                    }
                    if (!open) {
                        handleClose();
                    } else {
                        onOpenChange(open);
                    }
                }}
            >
                <Modal.Backdrop className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]/40 p-4">
                    <Modal.Container className="w-full max-w-md">
                        <Modal.Dialog className="w-full rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 text-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] outline-none">
                            {step === "select" && (
                                <>
                                    <Modal.Header className="flex flex-row items-start justify-between gap-3 p-0">
                                        <div className="flex flex-col gap-1">
                                            <Modal.Heading className="font-mono text-base font-extrabold text-[#0A0A0A]">
                                                Generate soal
                                            </Modal.Heading>
                                            <p className="font-sans text-xs leading-relaxed text-[#525252]">
                                                Pilih atribut dan level. Soal dibuat dari modul aktif atribut tersebut (modul sama untuk semua level, level hanya menentukan bentuk soal), 5 soal setiap generate. Hasilnya direview dulu sebelum dipublikasikan.
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

                                        <Select
                                            aria-label="Level"
                                            placeholder="Pilih level"
                                            selectedKey={level || null}
                                            onSelectionChange={(key: Key | null) => {
                                                if (key === "1" || key === "2") {
                                                    setLevel(key);
                                                } else {
                                                    setLevel("");
                                                }
                                                if (errors.level) setErrors((prev) => ({ ...prev, level: undefined }));
                                            }}
                                            isInvalid={Boolean(errors.level)}
                                            className="flex w-full flex-col gap-1"
                                        >
                                            <TextLabel required>Level</TextLabel>
                                            <Select.Trigger className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] px-3 font-sans text-xs text-[#0A0A0A] outline-none focus-visible:shadow-[2px_2px_0px_#FF5722]">
                                                <Select.Value className="truncate text-left data-[placeholder=true]:text-[#737373]" />
                                                <Select.Indicator className="size-3.5 shrink-0 text-[#0A0A0A]" />
                                            </Select.Trigger>
                                            <Select.Popover className="z-[60] min-w-[var(--trigger-width)] rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-1 text-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] outline-none">
                                                <ListBox className="flex flex-col gap-0.5 outline-none">
                                                    <ListBox.Item
                                                        id="1"
                                                        textValue="1"
                                                        className="flex cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 font-sans text-xs text-[#0A0A0A] outline-none hover:bg-[#EFEFEB] data-[focused=true]:bg-[#EFEFEB] data-[selected=true]:bg-[#FF5722] data-[selected=true]:font-medium data-[selected=true]:text-[#FDFCFA]"
                                                    >
                                                        1
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                    <ListBox.Item
                                                        id="2"
                                                        textValue="2"
                                                        className="flex cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 font-sans text-xs text-[#0A0A0A] outline-none hover:bg-[#EFEFEB] data-[focused=true]:bg-[#EFEFEB] data-[selected=true]:bg-[#FF5722] data-[selected=true]:font-medium data-[selected=true]:text-[#FDFCFA]"
                                                    >
                                                        2
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                </ListBox>
                                            </Select.Popover>
                                            {errors.level && (
                                                <FieldError className="font-sans text-[11px] font-medium text-[#DC2626]">
                                                    {errors.level}
                                                </FieldError>
                                            )}
                                        </Select>

                                        {atribut && level && (
                                            <div className="rounded-xl border-[1.5px] border-[#0A0A0A] bg-[#F0EDE6] px-3.5 py-2.5">
                                                <p className="font-mono text-xs font-bold text-[#0A0A0A]">
                                                    Sumber: 1 modul aktif
                                                </p>
                                                <p className="mt-0.5 font-sans text-xs text-[#525252]">
                                                    {selectedModul}
                                                </p>
                                            </div>
                                        )}

                                        <p className="font-sans text-xs text-[#525252]">
                                            Pilih atribut dan level untuk melihat modul sumber.
                                        </p>
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
                                            onPress={handleStartGenerate}
                                        >
                                            Generate
                                        </Button>
                                    </Modal.Footer>
                                </>
                            )}

                            {step === "progress" && (
                                <>
                                    <Modal.Header className="flex flex-col gap-1 p-0">
                                        <Modal.Heading className="font-mono text-base font-extrabold text-[#0A0A0A]">
                                            Sedang membuat soal
                                        </Modal.Heading>
                                        <p className="font-sans text-xs text-[#525252]">
                                            Menyiapkan soal...
                                        </p>
                                    </Modal.Header>

                                    <Modal.Body className="mt-4 flex flex-col gap-1.5 p-0">
                                        <ProgressBar value={progress} label="Progress pembuatan soal" size="md" />
                                        <span className="font-sans text-xs font-medium text-[#525252]">
                                            {progress}%
                                        </span>
                                    </Modal.Body>

                                    <Modal.Footer className="mt-4 flex flex-row items-center justify-start p-0">
                                        <Button
                                            variant="white"
                                            size="sm"
                                            onPress={() => onOpenChange(false)}
                                        >
                                            Batalkan
                                        </Button>
                                    </Modal.Footer>
                                </>
                            )}

                            {step === "review" && (
                                <>
                                    <Modal.Header className="flex flex-col gap-1 p-0">
                                        <Modal.Heading className="font-mono text-base font-extrabold text-[#0A0A0A]">
                                            Review hasil generate
                                        </Modal.Heading>
                                        <p className="font-sans text-xs leading-relaxed text-[#525252]">
                                            5 soal {atribut} Level {level}. Soal baru masuk ke Bank Soal setelah Anda setujui. Setelah itu tiap soal bisa diedit satu per satu.
                                        </p>
                                    </Modal.Header>

                                    <Modal.Body className="mt-4 flex max-h-[55vh] flex-col gap-3 overflow-y-auto pr-1 p-0">
                                        {generated.map((q, index) => (
                                            <div
                                                key={q.id}
                                                className="rounded-xl border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA] p-3.5"
                                            >
                                                <p className="font-sans text-xs font-bold leading-relaxed text-[#0A0A0A]">
                                                    {index + 1}. {q.soal}
                                                </p>
                                                {q.level === 2 ? (
                                                    <p className="mt-1.5 font-sans text-xs text-[#525252]">
                                                        {q.jawaban}
                                                    </p>
                                                ) : (
                                                    <ul className="mt-1.5 flex flex-col gap-1">
                                                        {(q.pilihan ?? []).map((opt, optIdx) => {
                                                            const isCorrect = opt === q.jawaban;
                                                            return (
                                                                <li
                                                                    key={optIdx}
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
                                        ))}
                                    </Modal.Body>

                                    <Modal.Footer className="mt-4 flex flex-row items-center justify-start gap-2.5 p-0">
                                        <Button
                                            variant="white"
                                            size="sm"
                                            onPress={() => setIsCancelConfirmOpen(true)}
                                        >
                                            Batal
                                        </Button>
                                        <Button
                                            variant="coral"
                                            size="sm"
                                            onPress={handleApprove}
                                        >
                                            Setujui &amp; Simpan
                                        </Button>
                                    </Modal.Footer>
                                </>
                            )}
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>

            <ConfirmModal
                isOpen={isCancelConfirmOpen}
                onOpenChange={setIsCancelConfirmOpen}
                title="Konfirmasi"
                message="Batalkan hasil generate? Semua soal di review ini akan dibuang."
                confirmLabel="Buang"
                confirmVariant="red"
                onConfirm={handleDiscardReview}
            />
        </>
    );
}
