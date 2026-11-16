"use client";

import { OnboardingButton } from "./onboarding-button";

interface StepNavigationProps {
    onBack?: () => void;
    onNext: () => void;
    nextLabel?: string;
    isNextDisabled?: boolean;
    align?: "end" | "between";
}

export function StepNavigation({
    onBack,
    onNext,
    nextLabel = "Lanjut",
    isNextDisabled = false,
    align = "end",
}: StepNavigationProps) {
    return (
        <div
            className={`mt-4 flex items-center gap-2.5 ${align === "between" ? "justify-between" : "justify-end"
                }`}
        >
            {onBack && (
                <OnboardingButton variant="secondary" onPress={onBack}>
                    Kembali
                </OnboardingButton>
            )}
            <OnboardingButton
                variant="primary"
                isDisabled={isNextDisabled}
                onPress={onNext}
            >
                {nextLabel}
            </OnboardingButton>
        </div>
    );
}