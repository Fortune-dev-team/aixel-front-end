"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnswerOption } from "@/components/ui/answer-option";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/Chip";
import { RadioGroup } from "@/components/ui/radio-field";
import { StepBadge } from "@/components/ui/stepbadge";
import { LEVEL1_QUIZ_SETS } from "./constants";
import { useCourseProgress } from "./use-course-progress";
import { ConfirmModal } from "./widgets/confirm-modal";
import { CourseHeader } from "./widgets/course-header";

type Level1Step = "materi" | "latihan" | "hasil";

export function Level1Content() {
  const router = useRouter();
  const { selectedGoal, progress, updateLevelStatus } = useCourseProgress();

  const [step, setStep] = React.useState<Level1Step>("materi");
  const [quizSetIndex, setQuizSetIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [scoreResult, setScoreResult] = React.useState<{
    correct: number;
    total: number;
    percentage: number;
    passed: boolean;
  } | null>(null);

  const questions = LEVEL1_QUIZ_SETS[quizSetIndex % LEVEL1_QUIZ_SETS.length];

  const handleStartQuiz = () => {
    if (progress.level1 === "active") {
      updateLevelStatus(selectedGoal.id, 1, "in_progress");
    }
    setStep("latihan");
  };

  const handleConfirmSubmit = () => {
    setIsConfirmOpen(false);
    const total = questions.length;
    const correct = questions.filter(
      (q) => answers[q.id] === q.correctOptionId
    ).length;
    const percentage = Math.round((correct / total) * 100);
    const passed = percentage >= 60;

    setScoreResult({ correct, total, percentage, passed });
    if (passed) {
      updateLevelStatus(selectedGoal.id, 1, "passed");
    }
    setStep("hasil");
  };

  const handleRetryNewQuestions = () => {
    setQuizSetIndex((prev) => prev + 1);
    setAnswers({});
    setScoreResult(null);
    setStep("latihan");
  };

  const headerTitle =
    step === "materi"
      ? `Level 1: Konseptual · ${selectedGoal.title} · Materi`
      : `Level 1: Konseptual · ${selectedGoal.title} · Latihan`;

  const headerSubtitle =
    step === "materi"
      ? "Ringkasan materi dan buka sumber asli, lalu lanjut ke latihan."
      : step === "latihan"
        ? "Jawab soal dari materi yang sudah Anda baca. Tidak ada batas waktu."
        : "Ringkasan materi dan sumber asli, lalu latihan dan penilaian.";

  return (
    <div className="w-full">
      <CourseHeader
        title={headerTitle}
        subtitle={headerSubtitle}
        backHref="/team/course"
      />

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
            <Button variant="coral" size="sm" onPress={handleStartQuiz}>
              Mulai latihan
            </Button>
          </div>
        </div>
      )}

      {step === "latihan" && (
        <div className="rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 shadow-[3px_3px_0_0_#0A0A0A]">
          <h2 className="font-mono text-sm font-bold text-[#0A0A0A]">
            Latihan
          </h2>

          <div className="mt-4 space-y-6">
            {questions.map((q) => (
              <div key={q.id} className="space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <StepBadge step={q.number} size="sm" className="shrink-0" />
                  <p className="font-mono text-xs font-bold text-[#0A0A0A] sm:text-sm">
                    {q.question}
                  </p>
                </div>

                <RadioGroup
                  aria-label={q.question}
                  value={answers[q.id] ?? ""}
                  onValueChange={(val) =>
                    setAnswers((prev) => ({ ...prev, [q.id]: val }))
                  }
                  className="gap-3"
                >
                  {q.options.map((opt) => (
                    <AnswerOption
                      key={opt.id}
                      value={opt.id}
                      label={opt.label}
                      className="shadow-[3px_3px_0_0_#0A0A0A]"
                    />
                  ))}
                </RadioGroup>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
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

      {step === "hasil" && scoreResult && (
        <div className="space-y-4">
          <div className="rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 shadow-[3px_3px_0_0_#0A0A0A]">
            <h2 className="font-mono text-sm font-bold text-[#0A0A0A]">
              Ringkasan materi
            </h2>
            <p className="mt-1 font-sans text-xs text-[#6B6B6B]">
              Dokumen bacaan pengembangan yang disiapkan admin, bukan dari internet.
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

          <div className="rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 shadow-[3px_3px_0_0_#0A0A0A]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-mono text-sm font-bold text-[#0A0A0A]">
                  Hasil penilaian
                </h2>
                <p className="mt-1 font-sans text-xs font-medium text-[#262626]">
                  Benar {scoreResult.correct} dari {scoreResult.total} (
                  {scoreResult.percentage}%). Minimum lulus 60%.
                </p>
                {!scoreResult.passed && (
                  <p className="mt-1 font-sans text-xs text-[#6B6B6B]">
                    Tidak ada batas pengulangan. Jawaban untuk Level 1 tidak bisa diulang lagi dengan soal yang sama.
                  </p>
                )}
              </div>

              <Chip
                variant={scoreResult.passed ? "green" : "red"}
                className="shrink-0"
              >
                {scoreResult.passed ? "Lulus" : "Belum lulus"}
              </Chip>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              {scoreResult.passed ? (
                <Button
                  variant="coral"
                  size="sm"
                  onPress={() => router.push("/team/course/level-2")}
                >
                  Lanjut ke Level 2
                </Button>
              ) : (
                <Button
                  variant="coral"
                  size="sm"
                  onPress={handleRetryNewQuestions}
                >
                  Coba lagi dengan soal baru
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