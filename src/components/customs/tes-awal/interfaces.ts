export type KasusStatus = "Sesuai" | "Kurang sesuai"

export interface TesAwalResultRow {
    id: string
    atribut: string
    penilaianDiri: string
    statusKasus: KasusStatus
    isMatch?: boolean
}

export interface TesAwalTableProps {
    rows: TesAwalResultRow[]
}
