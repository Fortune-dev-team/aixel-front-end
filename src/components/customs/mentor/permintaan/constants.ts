import type { PermintaanDemoState, PermintaanRow } from "./interfaces"

export const PERMINTAAN_DEMO_OPTIONS: {
    id: PermintaanDemoState
    label: string
}[] = [
        { id: "empty", label: "1. Kosong" },
        { id: "pending", label: "2. Menunggu" },
        { id: "partial", label: "3. Sebagian" },
        { id: "resolved", label: "4. Selesai" },
    ]

export const PERMINTAAN_STATES: Record<PermintaanDemoState, PermintaanRow[]> = {
    empty: [],
    pending: [
        {
            id: "req-1",
            kandidat: "Budi Santoso",
            atribut: "Komunikasi",
            status: "Menunggu",
        },
        {
            id: "req-2",
            kandidat: "Siti Rahmawati",
            atribut: "Komunikasi",
            status: "Menunggu",
        },
    ],
    partial: [
        {
            id: "req-1",
            kandidat: "Budi Santoso",
            atribut: "Komunikasi",
            status: "Diterima",
        },
        {
            id: "req-2",
            kandidat: "Siti Rahmawati",
            atribut: "Komunikasi",
            status: "Menunggu",
        },
    ],
    resolved: [
        {
            id: "req-1",
            kandidat: "Budi Santoso",
            atribut: "Komunikasi",
            status: "Diterima",
        },
        {
            id: "req-2",
            kandidat: "Siti Rahmawati",
            atribut: "Komunikasi",
            status: "Ditolak",
        },
    ],
}