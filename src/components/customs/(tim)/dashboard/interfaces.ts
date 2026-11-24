export type LevelStatus = "Belum" | "Terkunci" | "Terbuka" | "Lulus"
export type DashboardDemoState = "empty" | "started" | "completed"

export interface GoalProgressRow {
    id: string
    atribut: string
    level1: LevelStatus
    level2: LevelStatus
    level3: LevelStatus
    progres: number
}

export interface OwnedAttributeRow {
    id: string
    atribut: string
    keterangan: string
    tanggalLulus: string
    mentor: string
    berlakuHingga: string
    status: "Aktif"
}

export interface DashboardStats {
    goalAktif: string
    atributDimiliki: string
    level3Terbuka: string
    notifikasi: string
}

export interface DashboardSnapshot {
    stats: DashboardStats
    goals: GoalProgressRow[]
    ownedAttributes: OwnedAttributeRow[]
}