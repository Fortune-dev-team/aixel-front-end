export type KasusStatus = "Sesuai" | "Kurang sesuai"

export interface TesAwalResultRow {
    id: string
    atribut: string
    penilaianDiri: string
    statusKasus: KasusStatus
}

export interface StatusChipProps {
    status: KasusStatus
}

export interface TesAwalTableProps {
    rows: TesAwalResultRow[]
}
