"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Input, Label, TextField } from "@heroui/react";
import { ChevronDown } from "lucide-react";
import {
    ASSESSMENT_QUESTIONS,
    COMPETENCY_LABELS,
    ROLE_OPTIONS,
    type CompetencyKey,
    type OnboardingProfile,
    type SelfRatings,
} from "@/app/(auth)/onboarding/onboarding-data";

const TOTAL_STEPS = 4;

export default function OnboardingWizard() {
    const router = useRouter();
    const [step, setStep] = useState<number>(1);

    // Step 1 state
    const [profile, setProfile] = useState<OnboardingProfile>({
        fullName: "",
        role: "",
        bio: "",
    });

    // Step 2 state (1-5 ratings)
    const [ratings, setRatings] = useState<SelfRatings>({
        komunikasi: 0,
        problemSolving: 0,
        kepemimpinan: 0,
    });

    // Step 3 state (questionId -> optionId)
    const [answers, setAnswers] = useState<Record<string, string>>({});

    // Step 4 state
    const [selectedFocus, setSelectedFocus] = useState<CompetencyKey>("problemSolving");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const canProceedStep1 =
        profile.fullName.trim().length > 0 && profile.role.trim().length > 0;

    const canProceedStep2 =
        ratings.komunikasi > 0 &&
        ratings.problemSolving > 0 &&
        ratings.kepemimpinan > 0;

    const canProceedStep3 = ASSESSMENT_QUESTIONS.every((q) => Boolean(answers[q.id]));

    // Compute Step 4 results comparing self-rating vs situational score
    const results = (Object.keys(COMPETENCY_LABELS) as CompetencyKey[]).map(
        (key) => {
            const selfScore = ratings[key];
            const question = ASSESSMENT_QUESTIONS.find((q) => q.aspect === key);
            const chosenOption = question?.options.find(
                (opt) => opt.id === answers[question.id]
            );
            const testScore = chosenOption?.score ?? 3;

            const needsImprovement = testScore < 4 || selfScore - testScore >= 2;

            return {
                key,
                label: COMPETENCY_LABELS[key],
                selfScore,
                testStatus: needsImprovement ? "Perlu peningkatan" : "Sesuai",
                isGap: needsImprovement,
                actionLabel: needsImprovement ? "Rekomendasi modul" : "-",
            };
        }
    );

    const handleFinish = async () => {
        setIsSubmitting(true);
        try {
            // Replace with your actual API call to save onboarding & set isOnboarded = true
            console.log("Onboarding completed:", {
                profile,
                ratings,
                answers,
                selectedFocus,
            });

            router.refresh();
            router.push("/");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex min-h-[calc(100vh-57px)] flex-col items-center justify-center bg-[#ece9e2] px-4 py-10 font-sans text-[#111111]">
            {/* Top 4-Step Segmented Progress Bar + Step Counter */}
            <div className="mb-7 w-full max-w-[460px]">
                <div className="mb-2 flex justify-end">
                    <span className="font-mono text-xs font-semibold text-neutral-600">
                        {step} dari {TOTAL_STEPS}
                    </span>
                </div>
                <div className="grid grid-cols-4 gap-2.5">
                    {[1, 2, 3, 4].map((index) => (
                        <div
                            key={index}
                            className={`h-1.5 rounded-full transition-colors ${index <= step ? "bg-black" : "bg-neutral-300"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Main Card (wider on Step 4 for the table) */}
            <Card
                className={`w-full rounded-xl border-[1.5px] border-black bg-[#faf9f6] p-7 shadow-[5px_5px_0px_0px_#000000] transition-all ${step === 4 ? "max-w-[640px]" : "max-w-[500px]"
                    }`}
            >
                {/* ================= STEP 1: PROFIL ANDA ================= */}
                {step === 1 && (
                    <>
                        <Card.Header className="flex flex-col items-start gap-1 p-0 pb-6">
                            <Card.Title className="font-mono text-2xl font-bold tracking-tight text-black">
                                Profil Anda
                            </Card.Title>
                            <p className="text-xs text-neutral-600">
                                Lengkapi informasi dasar agar pemetaan kompetensi lebih relevan.
                            </p>
                        </Card.Header>

                        <Card.Content className="flex flex-col gap-4 p-0">
                            <TextField
                                value={profile.fullName}
                                onChange={(val) => setProfile({ ...profile, fullName: val })}
                                className="flex flex-col gap-1.5"
                                isRequired
                            >
                                <Label className="font-mono text-xs font-bold text-black">
                                    Nama lengkap
                                </Label>
                                <Input
                                    placeholder="Masukkan nama lengkap"
                                    className="h-10 w-full rounded-lg border-[1.5px] border-black bg-white px-3 text-sm text-black placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                />
                            </TextField>

                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="role-select"
                                    className="font-mono text-xs font-bold text-black"
                                >
                                    Role
                                </label>
                                <div className="relative">
                                    <select
                                        id="role-select"
                                        value={profile.role}
                                        onChange={(e) =>
                                            setProfile({ ...profile, role: e.target.value })
                                        }
                                        className="h-10 w-full appearance-none rounded-lg border-[1.5px] border-black bg-white px-3 pr-9 text-sm text-black focus:outline-2 focus:outline-offset-2 focus:outline-black"
                                    >
                                        <option value="" disabled>
                                            Pilih pekerjaan
                                        </option>
                                        {ROLE_OPTIONS.map((role) => (
                                            <option key={role} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown
                                        size={16}
                                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black"
                                    />
                                </div>
                            </div>

                            <TextField
                                value={profile.bio}
                                onChange={(val) => setProfile({ ...profile, bio: val })}
                                className="flex flex-col gap-1.5"
                            >
                                <Label className="font-mono text-xs font-bold text-black">
                                    Bio singkat
                                </Label>
                                <Input
                                    placeholder="Ceritakan singkat fokus kerja Anda"
                                    className="h-10 w-full rounded-lg border-[1.5px] border-black bg-white px-3 text-sm text-black placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                />
                            </TextField>

                            <div className="mt-4 flex justify-end">
                                <Button
                                    type="button"
                                    isDisabled={!canProceedStep1}
                                    onPress={() => setStep(2)}
                                    className="h-9 rounded-lg border-[1.5px] border-black bg-[#ff4405] px-5 font-mono text-xs font-bold text-black shadow-[2px_3px_0px_0px_#000000] transition-transform data-[disabled=true]:opacity-50 data-[hovered=true]:bg-[#f23d00] data-[pressed=true]:translate-x-[1px] data-[pressed=true]:translate-y-[2px] data-[pressed=true]:shadow-none"
                                >
                                    Lanjut
                                </Button>
                            </div>
                        </Card.Content>
                    </>
                )}

                {/* ================= STEP 2: SELF-RATING (1-5) ================= */}
                {step === 2 && (
                    <>
                        <Card.Header className="flex flex-col items-start gap-1 p-0 pb-6">
                            <Card.Title className="font-mono text-2xl font-bold tracking-tight text-black">
                                Penilaian diri
                            </Card.Title>
                            <p className="text-xs text-neutral-600">
                                Nilai tingkat kenyamanan Anda pada setiap aspek (1 = pemula, 5 =
                                sangat mahir).
                            </p>
                        </Card.Header>

                        <Card.Content className="flex flex-col gap-5 p-0">
                            {(Object.keys(COMPETENCY_LABELS) as CompetencyKey[]).map(
                                (key) => (
                                    <div key={key} className="flex flex-col gap-2">
                                        <span className="font-mono text-xs font-bold text-black">
                                            {COMPETENCY_LABELS[key]}
                                        </span>
                                        <div className="flex items-center gap-2.5">
                                            {[1, 2, 3, 4, 5].map((score) => {
                                                const isSelected = ratings[key] === score;
                                                return (
                                                    <button
                                                        key={score}
                                                        type="button"
                                                        onClick={() =>
                                                            setRatings({ ...ratings, [key]: score })
                                                        }
                                                        className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border-[1.5px] border-black font-mono text-xs font-bold transition-all ${isSelected
                                                                ? "bg-[#ff4405] text-black shadow-[2px_2px_0px_0px_#000000]"
                                                                : "bg-white text-black hover:bg-neutral-100"
                                                            }`}
                                                    >
                                                        {score}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )
                            )}

                            <div className="mt-4 flex items-center justify-end gap-2.5">
                                <Button
                                    type="button"
                                    onPress={() => setStep(1)}
                                    className="h-9 rounded-lg border-[1.5px] border-black bg-white px-4 font-mono text-xs font-bold text-black shadow-[2px_3px_0px_0px_#000000] transition-transform data-[hovered=true]:bg-neutral-100 data-[pressed=true]:translate-x-[1px] data-[pressed=true]:translate-y-[2px] data-[pressed=true]:shadow-none"
                                >
                                    Kembali
                                </Button>
                                <Button
                                    type="button"
                                    isDisabled={!canProceedStep2}
                                    onPress={() => setStep(3)}
                                    className="h-9 rounded-lg border-[1.5px] border-black bg-[#ff4405] px-5 font-mono text-xs font-bold text-black shadow-[2px_3px_0px_0px_#000000] transition-transform data-[disabled=true]:opacity-50 data-[hovered=true]:bg-[#f23d00] data-[pressed=true]:translate-x-[1px] data-[pressed=true]:translate-y-[2px] data-[pressed=true]:shadow-none"
                                >
                                    Lanjut
                                </Button>
                            </div>
                        </Card.Content>
                    </>
                )}

                {/* ================= STEP 3: SITUATIONAL QUESTIONS ================= */}
                {step === 3 && (
                    <>
                        <Card.Header className="flex flex-col items-start gap-1 p-0 pb-5">
                            <Card.Title className="font-mono text-2xl font-bold tracking-tight text-black">
                                Penilaian diri
                            </Card.Title>
                            <p className="text-xs text-neutral-600">
                                Pilih respons yang paling menggambarkan tindakan Anda di situasi
                                kerja.
                            </p>
                        </Card.Header>

                        <Card.Content className="flex flex-col gap-6 p-0">
                            {ASSESSMENT_QUESTIONS.map((item, qIndex) => (
                                <div key={item.id} className="flex flex-col gap-2.5">
                                    <div className="flex items-start gap-2.5">
                                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-black font-mono text-[11px] font-bold text-white">
                                            {qIndex + 1}
                                        </span>
                                        <p className="text-xs font-semibold leading-relaxed text-black">
                                            {item.question}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        {item.options.map((opt) => {
                                            const isSelected = answers[item.id] === opt.id;
                                            return (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() =>
                                                        setAnswers({ ...answers, [item.id]: opt.id })
                                                    }
                                                    className={`flex w-full cursor-pointer items-center gap-3 rounded-lg border-[1.5px] border-black px-3.5 py-2.5 text-left text-xs transition-all ${isSelected
                                                            ? "bg-[#ff4405]/15 font-medium text-black shadow-[2px_2px_0px_0px_#000000]"
                                                            : "bg-white text-neutral-800 hover:bg-neutral-50"
                                                        }`}
                                                >
                                                    <span
                                                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-black ${isSelected ? "bg-[#ff4405]" : "bg-white"
                                                            }`}
                                                    >
                                                        {isSelected && (
                                                            <span className="h-1.5 w-1.5 rounded-full bg-black" />
                                                        )}
                                                    </span>
                                                    <span>{opt.text}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}

                            <div className="mt-2 flex items-center justify-end gap-2.5">
                                <Button
                                    type="button"
                                    onPress={() => setStep(2)}
                                    className="h-9 rounded-lg border-[1.5px] border-black bg-white px-4 font-mono text-xs font-bold text-black shadow-[2px_3px_0px_0px_#000000] transition-transform data-[hovered=true]:bg-neutral-100 data-[pressed=true]:translate-x-[1px] data-[pressed=true]:translate-y-[2px] data-[pressed=true]:shadow-none"
                                >
                                    Kembali
                                </Button>
                                <Button
                                    type="button"
                                    isDisabled={!canProceedStep3}
                                    onPress={() => setStep(4)}
                                    className="h-9 rounded-lg border-[1.5px] border-black bg-[#ff4405] px-5 font-mono text-xs font-bold text-black shadow-[2px_3px_0px_0px_#000000] transition-transform data-[disabled=true]:opacity-50 data-[hovered=true]:bg-[#f23d00] data-[pressed=true]:translate-x-[1px] data-[pressed=true]:translate-y-[2px] data-[pressed=true]:shadow-none"
                                >
                                    Lihat Hasil
                                </Button>
                            </div>
                        </Card.Content>
                    </>
                )}

                {/* ================= STEP 4: HASIL TES AWAL ================= */}
                {step === 4 && (
                    <>
                        <Card.Header className="flex flex-col items-start gap-1 p-0 pb-5">
                            <Card.Title className="font-mono text-2xl font-bold tracking-tight text-black">
                                Hasil Tes Awal
                            </Card.Title>
                            <p className="text-xs text-neutral-600">
                                Perbandingan penilaian diri dengan hasil studi kasus Anda.
                            </p>
                        </Card.Header>

                        <Card.Content className="flex flex-col gap-5 p-0">
                            {/* Neobrutalist Result Table */}
                            <div className="overflow-hidden rounded-lg border-[1.5px] border-black bg-white">
                                <table className="w-full border-collapse text-left text-xs">
                                    <thead>
                                        <tr className="bg-black font-mono text-white">
                                            <th className="px-3.5 py-2.5 font-semibold">Aspek</th>
                                            <th className="px-3.5 py-2.5 font-semibold">
                                                Penilaian Diri
                                            </th>
                                            <th className="px-3.5 py-2.5 font-semibold">Hasil Tes</th>
                                            <th className="px-3.5 py-2.5 font-semibold">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-300">
                                        {results.map((row) => (
                                            <tr key={row.key} className="text-black">
                                                <td className="px-3.5 py-3 font-medium">{row.label}</td>
                                                <td className="px-3.5 py-3 font-mono">
                                                    {row.selfScore}/5
                                                </td>
                                                <td className="px-3.5 py-3">
                                                    <span
                                                        className={`inline-block rounded border px-2 py-0.5 text-[11px] font-semibold ${row.isGap
                                                                ? "border-amber-600 bg-amber-100 text-amber-900"
                                                                : "border-emerald-700 bg-emerald-100 text-emerald-900"
                                                            }`}
                                                    >
                                                        {row.testStatus}
                                                    </span>
                                                </td>
                                                <td className="px-3.5 py-3">
                                                    {row.isGap ? (
                                                        <span className="inline-block rounded border border-[#e11d48] bg-[#e11d48]/10 px-2 py-0.5 text-[11px] font-semibold text-[#e11d48]">
                                                            {row.actionLabel}
                                                        </span>
                                                    ) : (
                                                        <span className="text-neutral-500">-</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Monthly Focus Selector */}
                            <div className="flex flex-col gap-2.5">
                                <span className="font-mono text-xs font-bold text-black">
                                    Fokus utama bulan ini (pilih satu):
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {(Object.keys(COMPETENCY_LABELS) as CompetencyKey[]).map(
                                        (key) => {
                                            const active = selectedFocus === key;
                                            return (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    onClick={() => setSelectedFocus(key)}
                                                    className={`cursor-pointer rounded-md border-[1.5px] border-black px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${active
                                                            ? "bg-black text-white shadow-[2px_2px_0px_0px_#ff4405]"
                                                            : "bg-white text-black hover:bg-neutral-100"
                                                        }`}
                                                >
                                                    {COMPETENCY_LABELS[key]}
                                                </button>
                                            );
                                        }
                                    )}
                                </div>
                            </div>

                            {/* Final CTA */}
                            <div className="mt-2 flex items-center justify-between gap-2">
                                <Button
                                    type="button"
                                    onPress={() => setStep(3)}
                                    className="h-9 rounded-lg border-[1.5px] border-black bg-white px-4 font-mono text-xs font-bold text-black shadow-[2px_3px_0px_0px_#000000] transition-transform data-[hovered=true]:bg-neutral-100 data-[pressed=true]:translate-x-[1px] data-[pressed=true]:translate-y-[2px] data-[pressed=true]:shadow-none"
                                >
                                    Kembali
                                </Button>

                                <Button
                                    type="button"
                                    isDisabled={isSubmitting}
                                    onPress={handleFinish}
                                    className="h-9 rounded-lg border-[1.5px] border-black bg-[#ff4405] px-5 font-mono text-xs font-bold text-black shadow-[2px_3px_0px_0px_#000000] transition-transform data-[hovered=true]:bg-[#f23d00] data-[pressed=true]:translate-x-[1px] data-[pressed=true]:translate-y-[2px] data-[pressed=true]:shadow-none"
                                >
                                    {isSubmitting
                                        ? "Menyimpan..."
                                        : "Terapkan & Masuk ke Dashboard"}
                                </Button>
                            </div>
                        </Card.Content>
                    </>
                )}
            </Card>
        </main>
    );
}