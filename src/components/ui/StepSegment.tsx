// atoms/StepSegment.tsx
export interface StepSegmentProps {
    /** Filled (completed/current) or empty (upcoming) */
    filled?: boolean;
    className?: string;
}

export const StepSegment = ({ filled = false, className = "" }: StepSegmentProps) => (
    <div
        role="presentation"
        className={`h-2 flex-1 border-2 border-black ${filled ? "bg-black" : "bg-white"} ${className}`}
    />
);
