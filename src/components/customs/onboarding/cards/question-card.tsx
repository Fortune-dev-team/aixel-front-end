"use client";

import type { AssessmentQuestion } from "../interfaces";

interface QuestionCardProps {
    index: number;
    item: AssessmentQuestion;
    selectedOptionId?: string;
    onSelect: (questionId: string, optionId: string) => void;
}

export function QuestionCard({
    index,
    item,
    selectedOptionId,
    onSelect,
}: QuestionCardProps) {
    return (
        <div className="flex flex-col gap-2.5">
            <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-black font-mono text-[11px] font-bold text-white">
                    {index + 1}
                </span>
                <p className="text-xs font-semibold leading-relaxed text-black">
                    {item.question}
                </p>
            </div>

            <div className="flex flex-col gap-2">
                {item.options.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    return (
                        <button
                            key={opt.id}
                            type="button"
                            onClick={() => onSelect(item.id, opt.id)}
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
    );
}