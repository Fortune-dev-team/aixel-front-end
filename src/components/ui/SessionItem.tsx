"use client";
// molecules/SessionItem.tsx
import { Avatar } from "./Avatar";
import { Button } from "./button";

export interface SessionItemProps {
    initials: string;
    title: string;
    subtitle?: string;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
}

export const SessionItem = ({
    initials,
    title,
    subtitle,
    actionLabel = "Batal",
    onAction,
    className = "",
}: SessionItemProps) => (
    <div
        className={`flex items-center gap-3 rounded-xl border-2 border-black bg-white px-4 py-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${className}`}
    >
        <Avatar initials={initials} size="lg" />
        <div className="min-w-0 flex-1">
            <h4 className="truncate text-sm font-bold text-black">{title}</h4>
            {subtitle && <p className="truncate text-xs text-zinc-500">{subtitle}</p>}
        </div>
        <Button variant="red" size="sm" onPress={onAction}>
            {actionLabel}
        </Button>
    </div>
);
