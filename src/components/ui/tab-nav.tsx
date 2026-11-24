"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface TabNavItem {
    label: string;
    href: string;
}

export interface TabNavProps {
    tabs: TabNavItem[];
    className?: string;
}

export const TabNav = ({ tabs, className = "" }: TabNavProps) => {
    const pathname = usePathname();

    return (
        <nav aria-label="Tab" className={`flex items-end gap-3 border-b border-black ${className}`}>
            {tabs.map((tab) => {
                const active = pathname.startsWith(tab.href);
                return (
                    <Link
                        key={tab.href}
                        href={tab.href}
                        aria-current={active ? "page" : undefined}
                        className={`rounded-t-lg border-2 border-b-0 border-black px-3 py-3 font-mono text-sm font-bold transition-colors ${
                            active ? "bg-[#0d0d0d] text-white" : "bg-white text-black hover:bg-[#f0ede6]"
                        }`}
                    >
                        {tab.label}
                    </Link>
                );
            })}
        </nav>
    );
};