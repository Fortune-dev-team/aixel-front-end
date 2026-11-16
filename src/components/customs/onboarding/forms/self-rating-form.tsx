"use client";

import { Card } from "@heroui/react";
import { COMPETENCY_LABELS } from "../constants";
import { StepNavigation } from "../buttons/step-navigation";
import { CompetencyRatingInput } from "../inputs/competency-rating-input";
import type { CompetencyKey, SelfRatings } from "../interfaces";

interface SelfRatingFormProps {
    ratings: SelfRatings;
    onChange: (updated: SelfRatings) => void;
    canProceed: boolean;
    onBack: () => void;
    onNext: () => void;
}

export function SelfRatingForm({
    ratings,
    onChange,
    canProceed,
    onBack,
    onNext,
}: SelfRatingFormProps) {
    return (
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
                {(Object.keys(COMPETENCY_LABELS) as CompetencyKey[]).map((key) => (
                    <CompetencyRatingInput
                        key={key}
                        label={COMPETENCY_LABELS[key]}
                        value={ratings[key]}
                        onChange={(score) => onChange({ ...ratings, [key]: score })}
                    />
                ))}

                <StepNavigation
                    onBack={onBack}
                    isNextDisabled={!canProceed}
                    onNext={onNext}
                />
            </Card.Content>
        </>
    );
}