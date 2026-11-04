import { Chip } from "@heroui/react";
import { tv, type VariantProps } from "tailwind-variants";

const stepBadge = tv({
    base: "inline-flex items-center justify-center rounded-lg bg-[#0A0A0A] font-mono font-bold text-white",
    variants: {
        size: {
            sm: "size-5 rounded-[4px] text-[10px]",
            md: "size-9 text-sm",
            lg: "size-14 rounded-xl text-3xl",
        },
        active: { true: "bg-[#FF4A1C] text-[#0A0A0A]" },
    },
    defaultVariants: { size: "lg" },
});

export interface StepBadgeProps extends VariantProps<typeof stepBadge> {
    step: number | string;
    className?: string;
}

export function StepBadge({ step, size, active, className }: StepBadgeProps) {
    return (
        <Chip className={stepBadge({ size, active, className })} aria-label={`Step ${step}`}>
            {step}
        </Chip>
    );
}