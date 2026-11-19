export type JadwalStatus = "Diterima" | "Dijadwalkan" | "Ditolak"


export interface JadwalWawancaraItem {
    id: string
    nama: string
    status: JadwalStatus
    tanggal?: string | null // ISO format: "2026-11-19"
    waktu?: string | null   // 24h format: "09:00" or "09:00:00"
}

export interface KonfirmasiJadwalPayload {
    id: string
    tanggal: string // "YYYY-MM-DD"
    waktu: string   // "HH:mm"
}