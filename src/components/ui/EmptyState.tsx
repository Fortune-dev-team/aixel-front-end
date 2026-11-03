"use client";
// molecules/EmptyState.tsx
import { Button } from "./button";

export interface EmptyStateProps {
    message?: string;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
}

export const EmptyState = ({
    message = "Belum ada data.",
    actionLabel,
    onAction,
    className = "",
}: EmptyStateProps) => (
    <div
        className={`flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-black bg-[#f0ede6] px-6 py-10 ${className}`}
    >
        <p className="text-sm text-zinc-500">{message}</p>
        {actionLabel && (
            <Button variant="coral" onPress={onAction}>
                {actionLabel}
            </Button>
        )}
    </div>
);
