"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ASSESSMENT_QUESTIONS, COMPETENCY_LABELS } from "./constants";
import type {
    CompetencyKey,
    CompetencyResult,
    OnboardingProfile,
    OnboardingSubmitPayload,
    SelfRatings,
} from "./interfaces";

export function useOnboarding() {
    const router = useRouter();
    const [step, setStep] = useState<number>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [profile, setProfile] = useState<OnboardingProfile>({
        fullName: "",
        role: "",
        bio: "",
    });

    const [ratings, setRatings] = useState<SelfRatings>({
        komunikasi: 0,
        problemSolving: 0,
        kepemimpinan: 0,
    });

    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [selectedFocus, setSelectedFocus] =
        useState<CompetencyKey>("problemSolving");

    const canProceedStep1 =
        profile.fullName.trim().length > 0 && profile.role.trim().length > 0;

    const canProceedStep2 =
        ratings.komunikasi > 0 &&
        ratings.problemSolving > 0 &&
        ratings.kepemimpinan > 0;

    const canProceedStep3 = ASSESSMENT_QUESTIONS.every((q) =>
        Boolean(answers[q.id])
    );

    const results: CompetencyResult[] = useMemo(() => {
        return (Object.keys(COMPETENCY_LABELS) as CompetencyKey[]).map((key) => {
            const selfScore = ratings[key];
            const question = ASSESSMENT_QUESTIONS.find((q) => q.aspect === key);
            const chosen = question?.options.find(
                (opt) => opt.id === answers[question.id]
            );
            const testScore = chosen?.score ?? 3;
            const isGap = testScore < 4 || selfScore - testScore >= 2;

            return {
                key,
                label: COMPETENCY_LABELS[key],
                selfScore,
                testScore,
                isGap,
                testStatus: isGap ? "Perlu peningkatan" : "Sesuai",
                actionLabel: isGap ? "Rekomendasi modul" : "-",
            };
        });
    }, [ratings, answers]);

    const selectAnswer = (questionId: string, optionId: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    };

    const submitOnboarding = async () => {
        setIsSubmitting(true);
        try {
            const payload: OnboardingSubmitPayload = {
                profile,
                selfRatings: ratings,
                answers,
                results,
                selectedFocus,
            };

            // TODO: Connect backend API endpoint here
            // await fetch("/api/onboarding", {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify(payload),
            // });
            console.log("Onboarding payload:", payload);

            router.refresh();
            router.push("/");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        step,
        setStep,
        profile,
        setProfile,
        ratings,
        setRatings,
        answers,
        selectAnswer,
        selectedFocus,
        setSelectedFocus,
        results,
        canProceedStep1,
        canProceedStep2,
        canProceedStep3,
        isSubmitting,
        submitOnboarding,
    };
}