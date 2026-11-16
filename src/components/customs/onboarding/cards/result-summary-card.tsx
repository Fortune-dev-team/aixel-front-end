"use client";

import { Card } from "@heroui/react";
import { COMPETENCY_LABELS } from "../constants";
import { StepNavigation } from "../buttons/step-navigation";
import { ResultTable } from "../tables/result-table";
import type { CompetencyKey, CompetencyResult } from "../interfaces";

interface ResultSummaryCardProps {
    results: CompetencyResult[];
    selectedFocus: CompetencyKey;
    onSelectFocus: (focus: CompetencyKey) => void;
    isSubmitting: boolean;
    onBack: () => void;
    onFinish: () => void;
}

export function ResultSummaryCard({
    results,
    selectedFocus,
    onSelectFocus,
    isSubmitting,
    onBack,
    onFinish,
}: ResultSummaryCardProps) {
    return (
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
                <ResultTable results={results} />

                <div className="flex flex-col gap-2.5">
                    <span className="font-mono text-xs font-bold text-black">
                        Fokus utama bulan ini (pilih satu):
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {(Object.keys(COMPETENCY_LABELS) as CompetencyKey[]).map((key) => {
                            const active = selectedFocus === key;
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => onSelectFocus(key)}
                                    className={`cursor-pointer rounded-md border-[1.5px] border-black px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${active
                                            ? "bg-black text-white shadow-[2px_2px_0px_0px_#ff4405]"
                                            : "bg-white text-black hover:bg-neutral-100"
                                        }`}
                                >
                                    {COMPETENCY_LABELS[key]}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <StepNavigation
                    align="between"
                    onBack={onBack}
                    onNext={onFinish}
                    isNextDisabled={isSubmitting}
                    nextLabel={
                        isSubmitting ? "Menyimpan..." : "Terapkan & Masuk ke Dashboard"
                    }
                />
            </Card.Content>
        </>
    );
}