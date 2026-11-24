export type RingkasanViewState = "active" | "empty"

export interface RingkasanBagianItem {
    bagian: string
    isi: string
}

export interface KandidatRingkasanDetail {
    id: string
    nama: string
    tesAwal: string
    sesiLevel1: string
    sesiLevel2: string
    jawabanStudiKasus: string
    catatanWawancaraSebelumnya?: string | null
}

export interface RingkasanKandidatContentProps {
    initialCandidates?: KandidatRingkasanDetail[]
    defaultSelectedId?: string
    onSelectCandidate?: (
        kandidatId: string
    ) => Promise<KandidatRingkasanDetail | null> | KandidatRingkasanDetail | null
}