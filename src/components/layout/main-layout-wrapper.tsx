"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/layout/user/main-navbar"
import Footer from "@/components/layout/user/main-footer"

const APP_ROUTE_PREFIXES = [
    "/team",
    "/mentor",
    "/admin",
    "/onboarding",
    "/login",
    "/register",
]

export function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAppRoute = APP_ROUTE_PREFIXES.some(
        (prefix) => pathname === prefix || pathname?.startsWith(`${prefix}/`)
    )

    if (isAppRoute) {
        return <>{children}</>
    }

    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}