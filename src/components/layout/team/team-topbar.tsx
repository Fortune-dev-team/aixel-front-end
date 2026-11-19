"use client"

import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { NotifCount } from "@/components/ui/notifcount"
import type { TeamTopbarProps } from "./interfaces"

export function TeamTopbar({
    userName,
    notificationCount,
    onNotificationClick,
}: TeamTopbarProps) {
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#0A0A0A]/30 bg-[#FDFCFA] px-5 sm:px-8">
            <div className="flex items-center gap-3">
                <SidebarTrigger className="size-8 rounded-md border border-[#0A0A0A] bg-[#FDFCFA] text-[#0A0A0A] hover:bg-[#EFEFEB] md:hidden" />
                <span className="font-mono text-sm font-bold text-[#0A0A0A]">
                    {userName}
                </span>
            </div>

            <Link
                href="/team/notifikasi"
                onClick={onNotificationClick}
                className="inline-flex h-auto cursor-pointer items-center gap-2 rounded-lg border-2 border-[#0A0A0A] bg-[#FDFCFA] px-3 py-1 font-mono text-xs font-bold text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] transition-transform hover:-translate-x-px hover:-translate-y-px hover:bg-[#EFEFEB] active:translate-x-px active:translate-y-px active:shadow-none"
            >
                {notificationCount > 0 && <NotifCount count={notificationCount} />}
                <span>Notifikasi</span>
            </Link>
        </header>
    )
}