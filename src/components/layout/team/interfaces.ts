export interface TeamNavItem {
    label: string
    href: string
}

export interface TeamNavGroup {
    title: string
    items: TeamNavItem[]
}

export interface TeamSidebarProps {
    onLogout: () => void
}

export interface TeamTopbarProps {
    userName: string
    notificationCount: number
    onNotificationClick?: () => void
}