import { Chip } from "@heroui/react";
import { tv, type VariantProps } from "tailwind-variants";

const notifCount = tv({
    base: "inline-flex shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#0A0A0A] bg-[#FF4A1C] font-mono font-bold text-[#0A0A0A]",
    variants: {
        size: {
            sm: "size-3.5 text-[8px]",
            md: "size-5 text-[10px]",
            lg: "size-7 text-xs",
        },
    },
    defaultVariants: { size: "md" },
});

export interface NotifCountProps extends VariantProps<typeof notifCount> {
    count?: number;
    variant?: "count" | "dot";
    max?: number;
    className?: string;
}

export function NotifCount({ count, variant = "count", max = 99, size, className }: NotifCountProps) {
    const isDot = variant === "dot" || count === undefined;
    if (!isDot && count === 0) return null;

    return (
        <Chip
            className={notifCount({ size, className })}
            aria-label={isDot ? "New notification" : `${count} notifications`}
        >
            {isDot ? (
                <span aria-hidden className="size-1/2 rounded-full bg-[#0A0A0A]" />
            ) : count! > max ? (
                `${max}+`
            ) : (
                count
            )}
        </Chip>
    );
}