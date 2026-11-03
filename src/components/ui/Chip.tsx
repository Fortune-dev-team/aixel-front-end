// atoms/Chip.tsx
import { ReactNode } from "react";

export type ChipVariant = "neutral" | "amber" | "coral" | "red" | "green" | "blue";

export interface ChipProps {
    variant?: ChipVariant;
    children: ReactNode;
    className?: string;
}

const variantStyles: Record<ChipVariant, string> = {
    neutral: "bg-[#f0ede6] text-zinc-800",
    amber: "bg-[#fff1c2] text-[#b45309]",
    coral: "bg-[#ffe4dc] text-[#c2410c]",
    red: "bg-[#ffe4e4] text-[#d92626]",
    green: "bg-[#d8f5e1] text-[#166534]",
    blue: "bg-[#dbeafe] text-[#1d4ed8]",
};

export const Chip = ({ variant = "neutral", children, className = "" }: ChipProps) => (
    <span
        className={`inline-flex items-center justify-center rounded-lg border border-black px-2.5 py-0.5 font-mono text-xs font-bold ${variantStyles[variant]} ${className}`}
    >
        {children}
    </span>
);
