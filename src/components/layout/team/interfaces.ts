export interface TeamNavItem {
    label: string
    href: string
}

export interface TeamSidebarProps {
    onLogout: () => void
}

export interface TeamTopbarProps {
    userName: string
    notificationCount: number
    onNotificationClick?: () => void
}