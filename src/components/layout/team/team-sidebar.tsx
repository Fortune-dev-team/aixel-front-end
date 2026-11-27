"use client"

import * as React from "react"
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
import { TEAM_NAV_GROUPS } from "./constants"
import type { TeamSidebarProps } from "./interfaces"
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { LogoutModal } from "@/components/customs/keluar/logout-modal";

export function TeamSidebar({ onLogout }: TeamSidebarProps) {
    const pathname = usePathname()
    const { setOpenMobile } = useSidebar()
    const router = useRouter();
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);

    const handleConfirmLogout = () => {
        setIsLogoutOpen(false);
        onLogout?.();
        router.push("/");
    };

    return (
        <Sidebar
            collapsible="offcanvas"
            className="border-r border-[#0A0A0A]/30 bg-[#FDFCFA]"
        >
            {/* Brand Header */}
            <SidebarHeader className="bg-[#FDFCFA] px-4 pt-6 pb-3">
                <Link
                href="/team/dashboard"
                className="flex items-center gap-2"
            >
                <Image
                    src="/assets/icon/logo-dark.svg"
                    alt="Aixel Logo"
                    width={24}
                    height={24}
                />
                <span className="font-mono text-lg font-bold  text-[#111111]">
                    Aixel
                </span>
            </Link>
                <Separator className="mt-3 bg-[#0A0A0A]/30" />
            </SidebarHeader>

            {/* Navigation Groups (Tim & Mentor) */}
            <SidebarContent className="bg-[#FDFCFA] px-3 py-1">
                {TEAM_NAV_GROUPS.map((group, groupIndex) => (
                    <React.Fragment key={group.title}>
                        {groupIndex > 0 && (
                            <Separator className="my-2 bg-[#0A0A0A]/30" />
                        )}

                        <SidebarGroup className="p-0">
                            <div className="mb-2 px-2 font-mono text-xs font-bold text-[#FF5722]">
                                {group.title}
                            </div>

                            <SidebarGroupContent>
                                <SidebarMenu className="gap-1">
                                    {group.items.map((item) => {
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
                                                        "h-auto rounded-lg px-3 py-1.5 font-sans text-xs transition-all duration-150",
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
                    </React.Fragment>
                ))}
            </SidebarContent>

            {/* Footer Logout */}
            <SidebarFooter className="bg-[#FDFCFA] px-4 pt-2 pb-6">
                <Separator className="mb-3 bg-[#0A0A0A]/30" />
                <Button
                    variant="ghost"
                    size="sm"
                    onPress={onLogout}
                    className="h-auto w-full cursor-pointer justify-start rounded-lg px-3 py-2 font-sans text-xs font-medium text-[#262626] transition-colors hover:bg-[#EFEFEB]"
                >
                    Keluar
                </Button>
            </SidebarFooter>
        </Sidebar>
    )
}