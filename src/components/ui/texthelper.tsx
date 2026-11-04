import { Description } from "@heroui/react";
import { tv, type VariantProps } from "tailwind-variants";

const textHelper = tv({
    base: "font-sans",
    variants: {
        size: { sm: "text-[10px]", md: "text-xs" },
        tone: {
            default: "text-[#0A0A0A]",
            muted: "text-[#6B6B6B]",
            error: "text-[#B42318]",
        },
    },
    defaultVariants: { size: "md", tone: "muted" },
});

export interface TextHelperProps extends VariantProps<typeof textHelper> {
    children: React.ReactNode;
    className?: string;
}

export function TextHelper({ children, size, tone, className }: TextHelperProps) {
    return <Description className={textHelper({ size, tone, className })}>{children}</Description>;
}