import { ProgressBar as HeroProgressBar } from "@heroui/react";
import { tv, type VariantProps } from "tailwind-variants";

const progress = tv({
    slots: {
        track: "w-full overflow-hidden rounded-[3px] border-[1.5px] border-[#0A0A0A] bg-[#FDFCFA]",
        fill: "h-full border-r-[1.5px] rounded-none border-[#0A0A0A] bg-[#FF4A1C] transition-all",
    },
    variants: {
        size: { sm: { track: "h-2" }, md: { track: "h-3" }, lg: { track: "h-4" } },
    },
    defaultVariants: { size: "md" },
});

export interface ProgressBarProps extends VariantProps<typeof progress> {
    value: number;
    label?: string;
    className?: string;
}

export function ProgressBar({ value, label = "Progress", size, className }: ProgressBarProps) {
    const s = progress({ size });
    return (
        <HeroProgressBar aria-label={label} value={value} className={className}>
            <HeroProgressBar.Track className={s.track()}>
                <HeroProgressBar.Fill className={s.fill()} />
            </HeroProgressBar.Track>
        </HeroProgressBar>
    );
}