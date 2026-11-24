export interface AdminNavItem {
    label: string
    href: string
}

export interface AdminSidebarProps {
    onLogout: () => void
}

export interface AdminTopbarProps {
    userName: string
    notificationCount: number
    onNotificationClick?: () => void
}
