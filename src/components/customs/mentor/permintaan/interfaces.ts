export type PermintaanStatusType =
    | "Menunggu"
    | "Menunggu respon"
    | "Dijadwalkan"
    | "Ditolak"

export type PermintaanViewState = "active" | "empty"

export interface JadwalSlotOption {
    id: string
    label: string
}

export interface PermintaanItem {
    id: string
    peranAtribut: string
    namaMentee: string
    jadwalDiajukan: string
    catatan?: string | null
    status: PermintaanStatusType
}

export interface PermintaanContentProps {
    initialItems?: PermintaanItem[]
    availableSlots?: JadwalSlotOption[]
    isLoading?: boolean
    onApprove?: (id: string) => Promise<void> | void
    onReject?: (id: string, alasan: string) => Promise<void> | void
    onProposeSchedule?: (id: string, slotId: string) => Promise<void> | void
}