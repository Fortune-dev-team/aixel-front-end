"use client";

import { Card } from "@heroui/react";
import { ASSESSMENT_QUESTIONS } from "../constants";
import { StepNavigation } from "../buttons/step-navigation";
import { QuestionCard } from "../cards/question-card";

interface SituationalTestFormProps {
    answers: Record<string, string>;
    onSelectAnswer: (questionId: string, optionId: string) => void;
    canProceed: boolean;
    onBack: () => void;
    onNext: () => void;
}

export function SituationalTestForm({
    answers,
    onSelectAnswer,
    canProceed,
    onBack,
    onNext,
}: SituationalTestFormProps) {
    return (
        <>
            <Card.Header className="flex flex-col items-start gap-1 p-0 pb-5">
                <Card.Title className="font-mono text-2xl font-bold tracking-tight text-black">
                    Penilaian diri
                </Card.Title>
                <p className="text-xs text-neutral-600">
                    Pilih respons yang paling menggambarkan tindakan Anda di situasi kerja.
                </p>
            </Card.Header>

            <Card.Content className="flex flex-col gap-6 p-0">
                {ASSESSMENT_QUESTIONS.map((item, idx) => (
                    <QuestionCard
                        key={item.id}
                        index={idx}
                        item={item}
                        selectedOptionId={answers[item.id]}
                        onSelect={onSelectAnswer}
                    />
                ))}

                <StepNavigation
                    onBack={onBack}
                    onNext={onNext}
                    nextLabel="Lihat Hasil"
                    isNextDisabled={!canProceed}
                />
            </Card.Content>
        </>
    );
}