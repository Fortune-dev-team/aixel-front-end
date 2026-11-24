import { ReactNode } from "react";

export type AlertBannerVariant = "amber" | "red" | "green";

export interface AlertBannerProps {
    title: string;
    children?: ReactNode;
    variant?: AlertBannerVariant;
    className?: string;
}

const variantStyles: Record<AlertBannerVariant, string> = {
    amber: "bg-[#fff1c2]",
    red: "bg-[#ffe4e4]",
    green: "bg-[#d8f5e1]",
};

export const AlertBanner = ({ title, children, variant = "amber", className = "" }: AlertBannerProps) => (
    <div
        role="alert"
        className={`rounded-xl border-2 border-black px-5 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${variantStyles[variant]} ${className}`}
    >
        <h2 className="font-mono text-base font-bold text-black">{title}</h2>
        {children && <p className="mt-1 text-xs text-zinc-700">{children}</p>}
    </div>
);