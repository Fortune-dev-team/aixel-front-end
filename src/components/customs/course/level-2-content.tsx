"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { cn } from "@/lib/utils";
import {
    LEVEL2_CASE_PROMPTS,
    LEVEL2_FAILED_RUBRIC,
    LEVEL2_PASSED_RUBRIC,
} from "./constants";
import type { CaseRubricRow } from "./interfaces";
import { useCourseProgress } from "./use-course-progress";
import { ConfirmModal } from "./widgets/confirm-modal";
import { CourseHeader } from "./widgets/course-header";

type Level2Step = "materi" | "latihan" | "hasil";

const RUBRIC_COLUMNS: DataTableColumn<CaseRubricRow>[] = [
    { key: "kriteria", label: "Kriteria", width: "w-[26%]" },
    { key: "skor", label: "Skor", width: "w-[12%]" },
    { key: "tingkat", label: "Tingkat", width: "w-[18%]" },
    { key: "deskripsi", label: "Deskripsi" },
];

export function Level2Content() {
    const router = useRouter();
    const { selectedGoal, progress, updateLevelStatus } = useCourseProgress();

    const [step, setStep] = React.useState<Level2Step>("materi");
    const [caseIndex, setCaseIndex] = React.useState(0);
    const [answerText, setAnswerText] = React.useState("");
    const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
    const [isPassed, setIsPassed] = React.useState(false);

    const currentCasePrompt =
        LEVEL2_CASE_PROMPTS[caseIndex % LEVEL2_CASE_PROMPTS.length];

    const handleStartCase = () => {
        if (progress.level2 === "active") {
            updateLevelStatus(selectedGoal.id, 2, "in_progress");
        }
        setStep("latihan");
    };

    const handleConfirmSubmit = () => {
        setIsConfirmOpen(false);
        const trimmed = answerText.trim();
        const passed = trimmed.length >= 60;
        setIsPassed(passed);

        if (passed) {
            updateLevelStatus(selectedGoal.id, 2, "passed");
        }
        setStep("hasil");
    };

    const handleRetryNewCase = () => {
        setCaseIndex((prev) => prev + 1);
        setAnswerText("");
        setStep("latihan");
    };

    const headerTitle =
        step === "materi"
            ? `Level 2: Konseptual · ${selectedGoal.title} · Materi`
            : `Level 2: Studi kasus · ${selectedGoal.title} · Latihan`;

    const headerSubtitle =
        step === "materi"
            ? "Ringkasan materi dan buka sumber aslinya. Setelah itu lanjut ke latihan."
            : "Evaluasi berdasarkan rubrik yang disetujui admin.";

    return (
        <div className="w-full">
            <CourseHeader
                title={headerTitle}
                subtitle={headerSubtitle}
                backHref="/team/course"
            />

            {/* Step 1: Materi */}
            {step === "materi" && (
                <div className="space-y-4">
                    <div className="rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 shadow-[3px_3px_0_0_#0A0A0A]">
                        <h2 className="font-mono text-sm font-bold text-[#0A0A0A]">
                            Ringkasan materi
                        </h2>
                        <p className="mt-1 font-sans text-xs text-[#6B6B6B]">
                            Baca ringkasan materi dan buka sumber aslinya. Setelah itu lanjut ke latihan.
                        </p>

                        <div className="mt-4 flex flex-col justify-between gap-3 rounded-lg border-2 border-[#0A0A0A] bg-[#FDFCFA] px-4 py-3 sm:flex-row sm:items-center">
                            <span className="font-mono text-xs font-medium text-[#0A0A0A]">
                                Dasar Presentasi Efektif · Video
                            </span>
                            <Button
                                variant="black"
                                size="sm"
                                onPress={() =>
                                    window.open("https://www.youtube.com", "_blank", "noopener,noreferrer")
                                }
                            >
                                Buka sumber
                            </Button>
                        </div>
                    </div>

                    <div>
                        <Button variant="coral" size="sm" onPress={handleStartCase}>
                            Mulai latihan
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 2: Latihan Kasus */}
            {step === "latihan" && (
                <div className="rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 shadow-[3px_3px_0_0_#0A0A0A]">
                    <h2 className="font-mono text-sm font-bold text-[#0A0A0A]">Kasus</h2>
                    <p className="mt-2 font-sans text-xs leading-relaxed text-[#262626] sm:text-sm">
                        {currentCasePrompt}
                    </p>

                    <textarea
                        rows={6}
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        placeholder="Tulis jawaban Anda..."
                        className="mt-4 w-full rounded-lg border-2 border-[#0A0A0A] bg-white p-3 font-sans text-xs text-[#0A0A0A] placeholder:text-[#737373] focus:outline-none sm:text-sm"
                    />

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-[11px] text-[#6B6B6B]">
                            Minimal 60 karakter untuk lulus rubrik ({answerText.trim().length}/60)
                        </span>
                        <Button
                            variant="coral"
                            size="sm"
                            onPress={() => setIsConfirmOpen(true)}
                        >
                            Kirim jawaban
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 3: Hasil Penilaian AI */}
            {step === "hasil" && (
                <div className="space-y-4">
                    <div className="rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 shadow-[3px_3px_0_0_#0A0A0A]">
                        <h2 className="font-mono text-sm font-bold text-[#0A0A0A]">Kasus</h2>
                        <p className="mt-2 font-sans text-xs leading-relaxed text-[#262626] sm:text-sm">
                            {currentCasePrompt}
                        </p>
                    </div>

                    <div className="rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 shadow-[3px_3px_0_0_#0A0A0A]">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <h2 className="font-mono text-sm font-bold text-[#0A0A0A]">
                                Hasil penilaian AI
                            </h2>

                            <span
                                className={cn(
                                    "shrink-0 rounded-md border px-2.5 py-0.5 font-mono text-[11px] font-semibold",
                                    isPassed
                                        ? "border-[#16A34A] bg-[#DCFCE7] text-[#15803D]"
                                        : "border-[#DC2626] bg-[#FEE2E2] text-[#B91C1C]"
                                )}
                            >
                                {isPassed ? "Lulus" : "Belum lulus"}
                            </span>
                        </div>

                        <DataTable
                            ariaLabel="Tabel rubrik penilaian AI"
                            columns={RUBRIC_COLUMNS}
                            rows={isPassed ? LEVEL2_PASSED_RUBRIC : LEVEL2_FAILED_RUBRIC}
                        />

                        <p className="mt-3 font-sans text-xs text-[#6B6B6B]">
                            {isPassed
                                ? "Minimum tiap kriteria: 3. Level 3 terbuka."
                                : "Minimum tiap kriteria: 3. Perbaiki kriteria bernilai rendah, lalu coba lagi dengan kasus baru."}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-2.5">
                            {isPassed ? (
                                <Button
                                    variant="coral"
                                    size="sm"
                                    onPress={() => router.push("/team/course/level-3")}
                                >
                                    Lanjut ke Level 3
                                </Button>
                            ) : (
                                <Button
                                    variant="coral"
                                    size="sm"
                                    onPress={handleRetryNewCase}
                                >
                                    Coba lagi dengan kasus baru
                                </Button>
                            )}

                            <Button
                                variant="white"
                                size="sm"
                                onPress={() => router.push("/team/course")}
                            >
                                Kembali ke course
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <ConfirmModal
                isOpen={isConfirmOpen}
                message="Apakah Anda yakin ingin mengirim jawaban?"
                onCancel={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmSubmit}
            />
        </div>
    );
}