"use client";

interface RatingBoxProps {
    score: number;
    isSelected: boolean;
    onSelect: (score: number) => void;
}

export function RatingBox({ score, isSelected, onSelect }: RatingBoxProps) {
    return (
        <button
            type="button"
            onClick={() => onSelect(score)}
            className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border-[1.5px] border-black font-mono text-xs font-bold transition-all ${isSelected
                    ? "bg-[#ff4405] text-black shadow-[2px_2px_0px_0px_#000000]"
                    : "bg-white text-black hover:bg-neutral-100"
                }`}
        >
            {score}
        </button>
    );
}