"use client";

import { RatingBox } from "./rating-box";

interface CompetencyRatingInputProps {
    label: string;
    value: number;
    onChange: (score: number) => void;
}

export function CompetencyRatingInput({
    label,
    value,
    onChange,
}: CompetencyRatingInputProps) {
    return (
        <div className="flex flex-col gap-2">
            <span className="font-mono text-xs font-bold text-black">{label}</span>
            <div className="flex items-center gap-2.5">
                {[1, 2, 3, 4, 5].map((score) => (
                    <RatingBox
                        key={score}
                        score={score}
                        isSelected={value === score}
                        onSelect={onChange}
                    />
                ))}
            </div>
        </div>
    );
}