"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { PanelLeftIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"

const SIDEBAR_WIDTH = "14rem"
const SIDEBAR_WIDTH_MOBILE = "16rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const MOBILE_BREAKPOINT = 768

type SidebarContextProps = {
    state: "expanded" | "collapsed"
    open: boolean
    setOpen: (open: boolean) => void
    openMobile: boolean
    setOpenMobile: (open: boolean) => void
    isMobile: boolean
    toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
    const context = React.useContext(SidebarContext)
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider.")
    }
    return context
}

function SidebarProvider({
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children,
    ...props
}: React.ComponentProps<"div"> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
}) {
    const [isMobile, setIsMobile] = React.useState(false)
    const [openMobile, setOpenMobile] = React.useState(false)
    const [_open, _setOpen] = React.useState(defaultOpen)

    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
        const onChange = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        mql.addEventListener("change", onChange)
        onChange()
        return () => mql.removeEventListener("change", onChange)
    }, [])

    const open = openProp ?? _open
    const setOpen = React.useCallback(
        (value: boolean | ((value: boolean) => boolean)) => {
            const next = typeof value === "function" ? value(open) : value
            if (setOpenProp) {
                setOpenProp(next)
            } else {
                _setOpen(next)
            }
        },
        [setOpenProp, open]
    )

    const toggleSidebar = React.useCallback(() => {
        return isMobile ? setOpenMobile((prev) => !prev) : setOpen((prev) => !prev)
    }, [isMobile, setOpen])

    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContextProps>(
        () => ({
            state,
            open,
            setOpen,
            isMobile,
            openMobile,
            setOpenMobile,
            toggleSidebar,
        }),
        [state, open, setOpen, isMobile, openMobile, toggleSidebar]
    )

    return (
        <SidebarContext.Provider value={contextValue}>
            <div
                data-slot="sidebar-wrapper"
                style={
                    {
                        "--sidebar-width": SIDEBAR_WIDTH,
                        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                        ...style,
                    } as React.CSSProperties
                }
                className={cn("group/sidebar-wrapper flex min-h-svh w-full", className)}
                {...props}
            >
                {children}
            </div>
        </SidebarContext.Provider>
    )
}

function Sidebar({
    side = "left",
    collapsible = "offcanvas",
    className,
    children,
    ...props
}: React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
}) {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (isMobile) {
        if (!openMobile) return null

        return (
            <div className="fixed inset-0 z-50 flex md:hidden">
                <div
                    className="fixed inset-0 bg-black/40"
                    onClick={() => setOpenMobile(false)}
                />
                <aside
                    data-slot="sidebar"
                    data-mobile="true"
                    style={{ width: SIDEBAR_WIDTH_MOBILE }}
                    className={cn(
                        "relative z-10 flex h-full flex-col border-r-2 border-[#0A0A0A] bg-[#FDFCFA]",
                        className
                    )}
                    {...props}
                >
                    <button
                        type="button"
                        onClick={() => setOpenMobile(false)}
                        aria-label="Tutup menu"
                        className="absolute top-4 right-3 rounded-md p-1 text-[#0A0A0A] hover:bg-[#EFEFEB]"
                    >
                        <X className="size-4" />
                    </button>
                    {children}
                </aside>
            </div>
        )
    }

    return (
        <div
            className="group peer hidden md:block"
            data-state={state}
            data-collapsible={state === "collapsed" ? collapsible : ""}
            data-side={side}
            data-slot="sidebar"
        >
            <div
                data-slot="sidebar-gap"
                className={cn(
                    "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
                    "group-data-[collapsible=offcanvas]:w-0",
                    "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
                )}
            />
            <div
                data-slot="sidebar-container"
                className={cn(
                    "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
                    side === "left"
                        ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                        : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
                    "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
                    className
                )}
                {...props}
            >
                <div
                    data-sidebar="sidebar"
                    data-slot="sidebar-inner"
                    className="flex h-full w-full flex-col"
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

function SidebarTrigger({
    className,
    onClick,
    ...props
}: React.ComponentProps<"button">) {
    const { toggleSidebar } = useSidebar()

    return (
        <button
            type="button"
            data-sidebar="trigger"
            data-slot="sidebar-trigger"
            className={cn(
                "inline-flex size-7 cursor-pointer items-center justify-center rounded-md",
                className
            )}
            onClick={(event) => {
                onClick?.(event)
                toggleSidebar()
            }}
            {...props}
        >
            <PanelLeftIcon className="size-4" />
            <span className="sr-only">Toggle Sidebar</span>
        </button>
    )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sidebar-inset"
            className={cn("relative flex w-full flex-1 flex-col", className)}
            {...props}
        />
    )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sidebar-header"
            data-sidebar="header"
            className={cn("flex flex-col gap-2 p-2", className)}
            {...props}
        />
    )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sidebar-footer"
            data-sidebar="footer"
            className={cn("flex flex-col gap-2 p-2", className)}
            {...props}
        />
    )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sidebar-content"
            data-sidebar="content"
            className={cn(
                "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
                className
            )}
            {...props}
        />
    )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sidebar-group"
            data-sidebar="group"
            className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
            {...props}
        />
    )
}

function SidebarGroupContent({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sidebar-group-content"
            data-sidebar="group-content"
            className={cn("w-full text-sm", className)}
            {...props}
        />
    )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
    return (
        <ul
            data-slot="sidebar-menu"
            data-sidebar="menu"
            className={cn("flex w-full min-w-0 flex-col gap-1", className)}
            {...props}
        />
    )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
    return (
        <li
            data-slot="sidebar-menu-item"
            data-sidebar="menu-item"
            className={cn("group/menu-item relative list-none", className)}
            {...props}
        />
    )
}

const sidebarMenuButtonVariants = cva(
    "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden transition-[width,height,padding] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "",
                outline: "border border-[#0A0A0A]",
            },
            size: {
                default: "h-8 text-sm",
                sm: "h-7 text-xs",
                lg: "h-12 text-sm",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

function SidebarMenuButton({
    asChild = false,
    isActive = false,
    variant = "default",
    size = "default",
    className,
    ...props
}: React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
} & VariantProps<typeof sidebarMenuButtonVariants>) {
    const Comp = asChild ? Slot : "button"

    return (
        <Comp
            data-slot="sidebar-menu-button"
            data-sidebar="menu-button"
            data-size={size}
            data-active={isActive}
            className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
            {...props}
        />
    )
}

export {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    useSidebar,
}