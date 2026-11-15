"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { NotifCount } from "@/components/ui/notifcount"

interface NavItem {
    label: string
    href: string
}

const TEAM_NAV_ITEMS: NavItem[] = [
    { label: "Dashboard", href: "/team/dashboard" },
    { label: "Tes Awal", href: "/team/tes-awal" },
    { label: "Goal", href: "/team/goal" },
    { label: "Course", href: "/team/course" },
    { label: "Pilih Mentor", href: "/team/pilih-mentor" },
    { label: "Schedule", href: "/team/schedule" },
    { label: "Hasil", href: "/team/hasil" },
    { label: "Perpanjangan Atribut", href: "/team/perpanjangan-atribut" },
    { label: "Profil", href: "/team/profil" },
]

export interface TeamShellProps {
    children: React.ReactNode
    userName?: string
    notificationCount?: number
    onLogout?: () => void
}

export function TeamShell({
    children,
    userName = "Alex",
    notificationCount = 2,
    onLogout,
}: TeamShellProps) {
    const pathname = usePathname()
    const router = useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

    const handleLogout = () => {
        if (onLogout) {
            onLogout()
            return
        }
        router.push("/login")
    }

    const SidebarContent = () => (
        <div className="flex h-full flex-col justify-between bg-[#FDFCFA] px-4 py-6">
            <div>
                {/* Brand Logo Aixel */}
                <Link
                    href="/team/dashboard"
                    className="mb-8 flex items-center gap-2.5 px-2 select-none"
                >
                    <span
                        aria-hidden="true"
                        className="grid size-6 grid-cols-3 grid-rows-3 gap-0.5 rounded-[3px] border border-[#0A0A0A] bg-[#FDFCFA] p-0.5"
                    >
                        <span className="bg-[#0A0A0A]" />
                        <span className="bg-transparent" />
                        <span className="bg-[#0A0A0A]" />
                        <span className="bg-transparent" />
                        <span className="bg-[#0A0A0A]" />
                        <span className="bg-transparent" />
                        <span className="bg-[#0A0A0A]" />
                        <span className="bg-transparent" />
                        <span className="bg-[#0A0A0A]" />
                    </span>
                    <span className="font-heading text-lg font-extrabold tracking-tight text-[#0A0A0A]">
                        Aixel
                    </span>
                </Link>

                {/* Label Role */}
                <div className="mb-3 px-2 font-mono text-xs font-bold text-[#FF5722]">
                    Tim
                </div>

                {/* Menu Navigasi */}
                <nav aria-label="Navigasi Tim" className="flex flex-col gap-1.5">
                    {TEAM_NAV_ITEMS.map((item) => {
                        const isActive =
                            pathname === item.href || pathname?.startsWith(`${item.href}/`)

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                    "rounded-lg px-3 py-2 font-sans text-xs transition-all duration-150",
                                    isActive
                                        ? "border-2 border-[#0A0A0A] bg-[#FDFCFA] font-bold text-[#0A0A0A] shadow-[3px_3px_0px_#FF5722]"
                                        : "border-2 border-transparent font-medium text-[#262626] hover:bg-[#EFEFEB]"
                                )}
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Divider & Keluar */}
                <div className="my-4 border-t border-[#0A0A0A]/40" />

                <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full cursor-pointer rounded-lg px-3 py-2 text-left font-sans text-xs font-medium text-[#262626] transition-colors hover:bg-[#EFEFEB]"
                >
                    Keluar
                </button>
            </div>
        </div>
    )

    return (
        <div className="flex min-h-screen w-full bg-[#F5F5F2] text-[#0A0A0A]">
            {/* Desktop Sidebar */}
            <aside className="hidden w-56 shrink-0 border-r border-[#0A0A0A]/30 md:block">
                <div className="sticky top-0 h-screen overflow-y-auto">
                    <SidebarContent />
                </div>
            </aside>

            {/* Mobile Drawer Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div
                        className="fixed inset-0 bg-black/40"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <aside className="relative z-10 w-60 border-r-2 border-[#0A0A0A] bg-[#FDFCFA]">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Tutup menu"
                            className="absolute top-4 right-3 rounded-md p-1 text-[#0A0A0A] hover:bg-[#EFEFEB]"
                        >
                            <X className="size-4" />
                        </button>
                        <SidebarContent />
                    </aside>
                </div>
            )}

            {/* Right Area: Topbar + Main Content */}
            <div className="flex min-w-0 flex-1 flex-col">
                {/* Top Header */}
                <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#0A0A0A]/30 bg-[#FDFCFA] px-5 sm:px-8">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Buka menu navigasi"
                            className="rounded-md border border-[#0A0A0A] p-1.5 text-[#0A0A0A] hover:bg-[#EFEFEB] md:hidden"
                        >
                            <Menu className="size-4" />
                        </button>
                        <span className="font-mono text-sm font-bold text-[#0A0A0A]">
                            {userName}
                        </span>
                    </div>

                    {/* Tombol Notifikasi */}
                    <button
                        type="button"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-lg border-2 border-[#0A0A0A] bg-[#FDFCFA] px-3 py-1 font-mono text-xs font-bold text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] transition-transform hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                    >
                        {notificationCount > 0 && <NotifCount count={notificationCount} />}
                        <span>Notifikasi</span>
                    </button>
                </header>

                {/* Main Content */}
                <main className="flex-1 px-5 py-6 sm:px-8 sm:py-8">{children}</main>
            </div>
        </div>
    )
}