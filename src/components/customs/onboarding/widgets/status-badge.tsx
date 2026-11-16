interface StatusBadgeProps {
    variant: "success" | "warning" | "action";
    children: React.ReactNode;
}

const BADGE_STYLES: Record<StatusBadgeProps["variant"], string> = {
    success: "border-emerald-700 bg-emerald-100 text-emerald-900",
    warning: "border-amber-600 bg-amber-100 text-amber-900",
    action: "border-[#e11d48] bg-[#e11d48]/10 text-[#e11d48]",
};

export function StatusBadge({ variant, children }: StatusBadgeProps) {
    return (
        <span
            className={`inline-block rounded border px-2 py-0.5 text-[11px] font-semibold ${BADGE_STYLES[variant]}`}
        >
            {children}
        </span>
    );
}