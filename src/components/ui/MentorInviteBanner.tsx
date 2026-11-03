"use client";
// organisms/MentorInviteBanner.tsx
import { Button } from "./button";

export interface MentorInviteBannerProps {
    title?: string;
    description: string;
    acceptLabel?: string;
    declineLabel?: string;
    onAccept?: () => void;
    onDecline?: () => void;
    className?: string;
}

export const MentorInviteBanner = ({
    title = "Undangan menjadi mentor",
    description,
    acceptLabel = "Bersedia",
    declineLabel = "Tidak bersedia",
    onAccept,
    onDecline,
    className = "",
}: MentorInviteBannerProps) => (
    <div
        className={`flex flex-col gap-4 rounded-xl border-2 border-[#ff4d2d] bg-[#fdfcf9] px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
        <div className="min-w-0">
            <h3 className="font-mono text-base font-bold text-black">{title}</h3>
            <p className="text-sm text-zinc-500">{description}</p>
        </div>
        <div className="flex shrink-0 gap-3">
            <Button variant="green" onPress={onAccept}>
                {acceptLabel}
            </Button>
            <Button variant="white" onPress={onDecline}>
                {declineLabel}
            </Button>
        </div>
    </div>
);
