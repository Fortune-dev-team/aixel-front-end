import { Link, type LinkProps } from "@heroui/react";
import { ExternalLink, Link2 } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";

const textLink = tv({
    base: [
        "inline-flex items-center gap-1 text-xs underline-offset-2 hover:underline",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4A1C]",
    ],
    variants: {
        variant: {
            default: "text-[#0A0A0A]",
            brand: "text-[#D93A10]",
            muted: "text-[#6B6B6B]",
        },
        size: { sm: "text-[11px]", md: "text-xs", lg: "text-sm" },
    },
    defaultVariants: { variant: "default", size: "md" },
});

export interface TextLinkProps
    extends Omit<LinkProps, "children" | "className">,
    VariantProps<typeof textLink> {
    children: React.ReactNode;
    icon?: "external" | "link" | "none";
    className?: string;
}

export function TextLink({
    children,
    variant,
    size,
    icon = "link",
    className,
    ...props
}: TextLinkProps) {
    return (
        <Link className={textLink({ variant, size, className })} {...props}>
            {children}
            {icon === "external" && <ExternalLink aria-hidden className="size-3" />}
            {icon === "link" && <Link2 aria-hidden className="size-3" />}
        </Link>
    );
}