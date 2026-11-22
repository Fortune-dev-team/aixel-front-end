"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer, Separator, ScrollShadow } from "@heroui/react";
import { MenuItem, MenuItemState } from "@/components/ui/MenuItem";

export interface AdminSidebarItem {
    id: string;
    label: string;
    href?: string;
    icon?: ReactNode;
    state?: MenuItemState;
    onClick?: () => void;
}

export const ADMIN_MENU_ITEMS: AdminSidebarItem[] = [
    { id: "dashboard", label: "Dashboard", href: "/admin/dashboard" },
    { id: "basis-pengetahuan", label: "Basis Pengetahuan", href: "/admin/basis-pengetahuan" },
    { id: "atribut", label: "Atribut", href: "/admin/atribut" },
    { id: "rubrik", label: "Rubrik", href: "/admin/rubrik" },
    { id: "aturan", label: "Aturan", href: "/admin/aturan" },
    { id: "tinjauan-perpanjangan", label: "Tinjauan Perpanjangan", href: "/admin/tinjauan-perpanjangan" },
    { id: "pemantauan-penilaian", label: "Pemantauan Penilaian", href: "/admin/pemantauan-penilaian" },
    { id: "pemilik-atribut", label: "Pemilik Atribut", href: "/admin/pemilik-atribut" },
    { id: "intervensi", label: "Intervensi", href: "/admin/intervensi" },
    { id: "audit-dan-laporan", label: "Audit dan Laporan", href: "/admin/audit-dan-laporan" },
];

export const DEFAULT_LOGOUT_ITEM: AdminSidebarItem = {
    id: "keluar",
    label: "Keluar",
    href: "/login",
};

export interface AppSidebarContentProps {
    /** Path to brand logo icon, rendered via next/image. Defaults to "/assets/icon/logo-dark.svg" */
    logoSrc?: string;
    /** Brand destination link. Defaults to "/admin" */
    brandHref?: string;
    /** List of menu items to display. Defaults to ADMIN_MENU_ITEMS */
    items?: AdminSidebarItem[];
    /** Explicitly active item key (id, label, or href) */
    activeKey?: string;
    /** Fallback active key when no route matches. Defaults to "dashboard" */
    defaultActiveKey?: string;
    /** Logout menu item. Defaults to DEFAULT_LOGOUT_ITEM */
    logoutItem?: AdminSidebarItem;
    /** Callback invoked when logout item is clicked */
    onLogout?: () => void;
    /** Callback invoked when any menu item is clicked */
    onItemClick?: (item: AdminSidebarItem) => void;
    /** Custom brand/logo header element */
    brand?: ReactNode;
    /** Additional CSS classes for the content container */
    className?: string;
}

export interface AppSidebarDrawerProps extends AppSidebarContentProps {
    /** Controlled open state of the drawer */
    isOpen?: boolean;
    /** Callback when the open state changes */
    onOpenChange?: (isOpen: boolean) => void;
    /** Trigger button or element to open the drawer */
    trigger?: ReactNode;
}

export interface AppSidebarProps extends AppSidebarContentProps {
    /**
     * Display variant:
     * - "sidebar": Fixed/static sidebar aside (default)
     * - "drawer": Standalone HeroUI Drawer
     * - "responsive": Static sidebar on desktop (md/lg), HeroUI Drawer on mobile
     */
    variant?: "sidebar" | "drawer" | "responsive";
    /** Controlled open state for drawer when variant is "drawer" or "responsive" */
    isOpen?: boolean;
    /** Callback when the open state changes */
    onOpenChange?: (isOpen: boolean) => void;
    /** Trigger element for the drawer */
    drawerTrigger?: ReactNode;
}

/**
 * Determine the visual state of a menu item ("active" | "hover" | "default")
 */
function resolveItemState(
    item: AdminSidebarItem,
    activeKey?: string,
    pathname?: string | null,
    defaultActiveKey: string = "dashboard"
): MenuItemState {
    if (item.state) return item.state;

    // 1. Explicitly controlled activeKey
    if (activeKey !== undefined) {
        const matchesKey =
            item.id.toLowerCase() === activeKey.toLowerCase() ||
            item.label.toLowerCase() === activeKey.toLowerCase() ||
            (item.href && item.href.toLowerCase() === activeKey.toLowerCase());
        return matchesKey ? "active" : "default";
    }

    // 2. Next.js router pathname matching
    if (pathname && item.href) {
        if (pathname === item.href) return "active";
    }

    return "default";
}

export interface AppSidebarLogoProps {
    src?: string;
    href?: string;
    className?: string;
}

/**
 * Default Aixel Brand Logo & Title using next/image
 */
export const AppSidebarLogo = ({
    src = "/assets/icon/logo-dark.svg",
    href = "/admin",
    className = "",
}: AppSidebarLogoProps) => (
    <Link
        href={href}
        className={`flex items-center justify-center gap-2.5 transition-opacity hover:opacity-85 ${className}`}
    >
        <Image
            src={src}
            alt="Aixel Logo"
            width={28}
            height={28}
            priority
            className="shrink-0"
        />
        <span className="font-mono text-xl font-bold tracking-tight text-[#111111]">
            Aixel
        </span>
    </Link>
);

/**
 * Core Sidebar Content (Header Logo, Separator, Nav Items, Separator, Logout)
 */
export const AppSidebarContent = ({
    logoSrc = "/assets/icon/logo-dark.svg",
    brandHref = "/admin",
    items = ADMIN_MENU_ITEMS,
    activeKey,
    defaultActiveKey = "dashboard",
    logoutItem = DEFAULT_LOGOUT_ITEM,
    onLogout,
    onItemClick,
    brand,
    className = "",
}: AppSidebarContentProps) => {
    const pathname = usePathname();

    return (
        <div className={`flex h-full w-full flex-col bg-white text-black ${className}`}>
            {/* Header Brand */}
            <div className="flex shrink-0 items-center justify-center px-6 pt-7 pb-4">
                {brand || <AppSidebarLogo src={logoSrc} href={brandHref} />}
            </div>

            {/* Top Separator */}
            <div className="px-6">
                <Separator className="my-2 h-[2px] w-full bg-black" />
            </div>

            {/* Menu Items List */}
            <ScrollShadow hideScrollBar className="flex-1 overflow-y-auto px-5 py-2">
                <nav aria-label="Admin Navigation" className="flex flex-col gap-1.5">
                    {items.map((item) => {
                        const state = resolveItemState(
                            item,
                            activeKey,
                            pathname,
                            defaultActiveKey
                        );

                        return (
                            <MenuItem
                                key={item.id}
                                icon={item.icon}
                                label={item.label}
                                state={state}
                                href={item.href}
                                onClick={() => {
                                    item.onClick?.();
                                    onItemClick?.(item);
                                }}
                            />
                        );
                    })}
                </nav>
            </ScrollShadow>

            {/* Bottom Separator */}
            <div className="px-6">
                <Separator className="my-2 h-[2px] w-full bg-black" />
            </div>

            {/* Logout Action */}
            <div className="shrink-0 px-5 pt-1 pb-7">
                <MenuItem
                    icon={logoutItem.icon}
                    label={logoutItem.label}
                    state={logoutItem.state || "default"}
                    href={onLogout ? undefined : logoutItem.href}
                    onClick={() => {
                        logoutItem.onClick?.();
                        onLogout?.();
                        onItemClick?.(logoutItem);
                    }}
                />
            </div>
        </div>
    );
};

/**
 * Mobile / Responsive Drawer using HeroUI Drawer
 */
export const AppSidebarDrawer = ({
    isOpen,
    onOpenChange,
    trigger,
    ...contentProps
}: AppSidebarDrawerProps) => {
    return (
        <Drawer.Root isOpen={isOpen} onOpenChange={onOpenChange}>
            {trigger && <Drawer.Trigger>{trigger}</Drawer.Trigger>}
            <Drawer.Backdrop>
                <Drawer.Content
                    placement="left"
                    className="h-full w-64 max-w-[85vw] bg-white p-0 sm:w-72"
                >
                    <Drawer.Dialog className="flex h-full w-full flex-col border-r-2 border-black bg-white p-0 outline-none">
                        <Drawer.Header className="sr-only">
                            <Drawer.Heading>Navigasi Admin Aixel</Drawer.Heading>
                        </Drawer.Header>
                        <Drawer.Body className="flex h-full w-full flex-1 flex-col overflow-hidden p-0">
                            <AppSidebarContent
                                {...contentProps}
                                onItemClick={(item) => {
                                    contentProps.onItemClick?.(item);
                                    onOpenChange?.(false);
                                }}
                            />
                        </Drawer.Body>
                    </Drawer.Dialog>
                </Drawer.Content>
            </Drawer.Backdrop>
        </Drawer.Root>
    );
};

/**
 * AppSidebar Component
 * Can be rendered as:
 * - Desktop static sidebar (`variant="sidebar"`)
 * - Standalone HeroUI Drawer (`variant="drawer"`)
 * - Responsive layout (`variant="responsive"`): static on desktop, drawer on mobile
 */
export const AppSidebar = ({
    variant = "sidebar",
    isOpen,
    onOpenChange,
    drawerTrigger,
    className = "",
    ...contentProps
}: AppSidebarProps) => {
    if (variant === "drawer") {
        return (
            <AppSidebarDrawer
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                trigger={drawerTrigger}
                {...contentProps}
            />
        );
    }

    if (variant === "responsive") {
        return (
            <>
                {/* Desktop Aside */}
                <aside
                    className={`hidden h-screen w-64 shrink-0 flex-col border-r-2 border-black bg-white md:flex lg:w-72 ${className}`}
                >
                    <AppSidebarContent {...contentProps} />
                </aside>

                {/* Mobile Drawer */}
                <div className="md:hidden">
                    <AppSidebarDrawer
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        trigger={drawerTrigger}
                        {...contentProps}
                    />
                </div>
            </>
        );
    }

    // Default: Static aside
    return (
        <aside
            className={`flex h-screen w-64 shrink-0 flex-col border-r-2 border-black bg-white lg:w-72 ${className}`}
        >
            <AppSidebarContent {...contentProps} />
        </aside>
    );
};

export default AppSidebar;
