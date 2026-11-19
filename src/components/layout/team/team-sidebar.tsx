"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button, Separator } from "@heroui/react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { TEAM_NAV_ITEMS } from "./constants"
import type { TeamSidebarProps } from "./interfaces"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogoutModal } from "@/components/customs/keluar/logout-modal";

export function TeamSidebar({ onLogout }: TeamSidebarProps) {
    const pathname = usePathname()
    const { setOpenMobile } = useSidebar()
    const router = useRouter();
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);

    const handleConfirmLogout = () => {
        setIsLogoutOpen(false);
        router.push("/    ");
    };

    return (
        <>
            <Sidebar
                collapsible="offcanvas"
                className="border-r border-[#0A0A0A]/30 bg-[#FDFCFA]"
            >
                <SidebarHeader className="bg-[#FDFCFA] px-4 pt-6 pb-2">
                    <div className="flex flex-col gap-4">
                        <Link
                            href="/team/dashboard"
                            className="flex items-center gap-2.5 px-1 select-none"
                        >
                            <span
                                aria-hidden="true"
                                className="grid size-6 shrink-0 grid-cols-3 grid-rows-3 gap-0.5 rounded-[3px] border border-[#0A0A0A] bg-[#FDFCFA] p-0.5"
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

                        <div className="px-1 font-mono text-xs font-bold text-[#FF5722]">
                            Tim
                        </div>
                    </div>
                </SidebarHeader>

                <SidebarContent className="bg-[#FDFCFA] px-3 py-2">
                    <SidebarGroup className="p-0">
                        <SidebarGroupContent>
                            <SidebarMenu className="gap-1.5">
                                {TEAM_NAV_ITEMS.map((item) => {
                                    const isActive =
                                        pathname === item.href ||
                                        pathname?.startsWith(`${item.href}/`)

                                    return (
                                        <SidebarMenuItem key={item.href}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isActive}
                                                onClick={() => setOpenMobile(false)}
                                                className={cn(
                                                    "h-auto rounded-lg px-3 py-2 font-sans text-xs transition-all duration-150",
                                                    isActive
                                                        ? "border-2 border-[#0A0A0A] bg-[#FDFCFA] font-bold text-[#0A0A0A] shadow-[3px_3px_0px_#FF5722] hover:bg-[#FDFCFA]"
                                                        : "border-2 border-transparent font-medium text-[#262626] hover:bg-[#EFEFEB]"
                                                )}
                                            >
                                                <Link href={item.href}>{item.label}</Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter className="bg-[#FDFCFA] px-4 pt-2 pb-6">
                    <Separator className="mb-3 bg-[#0A0A0A]/30" />
                    <Button
                        variant="ghost"
                        size="sm"
                        onPress={onLogout}
                        className="h-auto w-full cursor-pointer justify-start rounded-lg px-3 py-2 font-sans text-xs font-medium text-[#262626] transition-colors hover:bg-[#EFEFEB]"
                        onClick={() => setIsLogoutOpen(true)}
                    >
                        Keluar
                    </Button>
                </SidebarFooter>
            </Sidebar>
            <LogoutModal
                isOpen={isLogoutOpen}
                onClose={() => setIsLogoutOpen(false)}
                onConfirm={handleConfirmLogout}
            />
        </>
    )
}