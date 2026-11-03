"use client";
// molecules/NotificationItem.tsx

export interface NotificationItemProps {
    text: string;
    /** Relative time label, e.g. "5 menit" */
    time: string;
    unread?: boolean;
    onDismiss?: () => void;
    className?: string;
}

export const NotificationItem = ({
    text,
    time,
    unread = false,
    onDismiss,
    className = "",
}: NotificationItemProps) => (
    <div
        className={`flex items-center gap-3 rounded-lg border-2 border-black px-4 py-3 ${
            unread ? "bg-[#ffe4dc]" : "bg-[#fdfcf9]"
        } ${className}`}
    >
        {unread && (
            <span
                aria-label="Belum dibaca"
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-black bg-[#ff4d2d]"
            >
                <span className="h-1.5 w-1.5 rounded-full bg-black" />
            </span>
        )}
        <p className="flex-1 truncate text-sm font-semibold text-zinc-700">{text}</p>
        <span className="shrink-0 text-xs text-zinc-500">{time}</span>
        <button
            type="button"
            aria-label="Tutup notifikasi"
            onClick={onDismiss}
            className="shrink-0 text-black hover:opacity-70"
        >
            X
        </button>
    </div>
);
