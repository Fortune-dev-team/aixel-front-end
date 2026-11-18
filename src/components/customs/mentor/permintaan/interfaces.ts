export type PermintaanStatus = "Menunggu" | "Diterima" | "Ditolak"
export type PermintaanDemoState = "empty" | "pending" | "partial" | "resolved"

export interface PermintaanRow {
    id: string
    kandidat: string
    atribut: string
    status: PermintaanStatus
}