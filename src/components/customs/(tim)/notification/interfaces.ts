export type NotifikasiViewState = "active" | "empty"

export interface NotifikasiItem {
    id: string
    pesan: string
    waktu: string
    isRead?: boolean
    href?: string
}

export interface NotifikasiContentProps {
    initialItems?: NotifikasiItem[]
    isLoading?: boolean
    onDismissItem?: (id: string) => Promise<void> | void
    onMarkAllRead?: () => Promise<void> | void
}