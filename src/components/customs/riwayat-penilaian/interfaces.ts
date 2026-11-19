export type RiwayatKeputusanStatus = "Ulang" | "Belum selesai" | "Selesai"

export type RiwayatViewState = "active" | "empty"

export interface RiwayatPenilaianItem {
    id: string
    anggota: string
    atribut: string
    keputusan: RiwayatKeputusanStatus
    catatan: string
    tanggalWawancara?: string
}

export interface RiwayatPenilaianContentProps {
    initialItems?: RiwayatPenilaianItem[]
    isLoading?: boolean
}