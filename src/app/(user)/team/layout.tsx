"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TeamSidebar } from "@/components/layout/team/team-sidebar"
import { TeamTopbar } from "@/components/layout/team/team-topbar"

export default function TeamLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()

    return (
        <SidebarProvider className="min-h-screen w-full bg-[#F5F5F2] text-[#0A0A0A]">
            <TeamSidebar onLogout={() => router.push("/login")} />

            <SidebarInset className="flex min-w-0 flex-1 flex-col bg-[#F5F5F2]">
                <TeamTopbar userName="Alex" notificationCount={2} />
                <main className="flex-1 px-5 py-6 sm:px-8 sm:py-8">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}