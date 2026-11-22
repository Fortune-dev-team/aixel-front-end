"use client";

import React, { ReactNode } from "react";
import { NotifCount } from "@/components/ui/notifcount";

export interface AdminHeaderProps {
    /** Header title on the left. Defaults to "Admin Aixel" */
    title?: string;
    /** Number of notifications to display in the badge. Defaults to 2 */
    notificationCount?: number;
    /** Callback when the notification button is clicked */
    onNotificationClick?: () => void;
    /** Optional action or trigger for mobile drawer */
    mobileTrigger?: ReactNode;
    /** Optional custom actions on the right side */
    rightContent?: ReactNode;
    /** Additional CSS classes for the header container */
    className?: string;
}

export const AdminHeader = ({
    title = "Admin Aixel",
    notificationCount = 2,
    onNotificationClick,
    mobileTrigger,
    rightContent,
    className = "",
}: AdminHeaderProps) => {
    return (
        <header
            className={`flex h-16 w-full shrink-0 items-center justify-between border-b-2 border-black bg-white px-6 md:px-8 ${className}`}
        >
            {/* Left: Mobile trigger & Admin Title */}
            <div className="flex items-center gap-3">
                {mobileTrigger && (
                    <div className="md:hidden">
                        {mobileTrigger}
                    </div>
                )}
                <h2 className="font-mono text-base font-bold tracking-tight text-black md:text-lg">
                    {title}
                </h2>
            </div>

            {/* Right: Notifications Button & Extra Actions */}
            <div className="flex items-center gap-3">
                {rightContent}
                <button
                    type="button"
                    onClick={onNotificationClick}
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-black bg-white px-3 py-1 font-mono text-xs font-bold text-black shadow-[2px_2px_0_0_#111111] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_#111111] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4a1c] md:text-sm"
                >
                    <NotifCount count={notificationCount} size="md" />
                    <span>Notifikasi</span>
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;
