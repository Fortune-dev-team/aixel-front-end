import { Label } from "@heroui/react";
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const textLabel = tv({
    base: "font-mono font-bold text-[#0A0A0A]",
    variants: {
        size: { sm: "text-[10px]", md: "text-xs", lg: "text-sm" },
    },
    defaultVariants: { size: "md" },
});

export interface TextLabelProps
    extends Omit<ComponentProps<typeof Label>, "children">,
    VariantProps<typeof textLabel> {
    children: React.ReactNode;
    required?: boolean;
    optional?: boolean;
    optionalText?: string;
}

export function TextLabel({
    children,
    required = false,
    optional = false,
    optionalText = "(optional)",
    size,
    className,
    ...props
}: TextLabelProps) {
    return (
        <Label className={textLabel({ size, className })} {...props}>
            {children}
            {required && <span className="ml-1 text-[#E5484D]">*</span>}
            {optional && (
                <span className="ml-1 font-sans font-normal text-[#6B6B6B]">{optionalText}</span>
            )}
        </Label>
    );
}