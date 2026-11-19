export type JadwalStatusType = "Dijadwalkan" | "Selesai" | "Dibatalkan"

export type JadwalViewState = "active" | "empty"

export interface JadwalWawancaraItem {
    id: string
    peranAtribut: string
    namaMentee: string
    jadwalFormatted: string
    status: JadwalStatusType
}

export interface JadwalWawancaraContentProps {
    initialItems?: JadwalWawancaraItem[]
    isLoading?: boolean
}