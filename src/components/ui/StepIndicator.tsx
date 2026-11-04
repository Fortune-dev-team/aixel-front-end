// molecules/StepIndicator.tsx
import { StepSegment } from "./StepSegment";

export interface StepIndicatorProps {
    total: number;
    current: number;
    className?: string;
}

export const StepIndicator = ({ total, current, className = "" }: StepIndicatorProps) => (
    <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
        className={`flex w-full items-center gap-3 ${className}`}
    >
        {Array.from({ length: total }, (_, i) => (
            <StepSegment key={i} filled={i < current} />
        ))}
    </div>
);
