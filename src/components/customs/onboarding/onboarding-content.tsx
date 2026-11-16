"use client";

import { Card } from "@heroui/react";
import { TOTAL_STEPS } from "./constants";
import { ResultSummaryCard } from "./cards/result-summary-card";
import { ProfileForm } from "./forms/profile-form";
import { SelfRatingForm } from "./forms/self-rating-form";
import { SituationalTestForm } from "./forms/situational-test-form";
import { StepProgress } from "./widgets/step-progress";
import { useOnboarding } from "./use-onboarding";

export default function OnboardingContent() {
    const {
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
    } = useOnboarding();

    return (
        <main className="flex min-h-[calc(100vh-57px)] flex-col items-center justify-center bg-[#ece9e2] px-4 py-10 font-sans text-[#111111]">
            <StepProgress currentStep={step} totalSteps={TOTAL_STEPS} />

            <Card
                className={`w-full rounded-xl border-[1.5px] border-black bg-[#faf9f6] p-7 shadow-[5px_5px_0px_0px_#000000] transition-all ${step === 4 ? "max-w-[640px]" : "max-w-[500px]"
                    }`}
            >
                {step === 1 && (
                    <ProfileForm
                        profile={profile}
                        onChange={setProfile}
                        canProceed={canProceedStep1}
                        onNext={() => setStep(2)}
                    />
                )}

                {step === 2 && (
                    <SelfRatingForm
                        ratings={ratings}
                        onChange={setRatings}
                        canProceed={canProceedStep2}
                        onBack={() => setStep(1)}
                        onNext={() => setStep(3)}
                    />
                )}

                {step === 3 && (
                    <SituationalTestForm
                        answers={answers}
                        onSelectAnswer={selectAnswer}
                        canProceed={canProceedStep3}
                        onBack={() => setStep(2)}
                        onNext={() => setStep(4)}
                    />
                )}

                {step === 4 && (
                    <ResultSummaryCard
                        results={results}
                        selectedFocus={selectedFocus}
                        onSelectFocus={setSelectedFocus}
                        isSubmitting={isSubmitting}
                        onBack={() => setStep(3)}
                        onFinish={submitOnboarding}
                    />
                )}
            </Card>
        </main>
    );
}