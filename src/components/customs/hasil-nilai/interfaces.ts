export type KeputusanType = "Memadai" | "Belum memadai" | "Ulang"

export type InputHasilViewState = "active" | "empty"

export interface SelectOption {
    id: string
    label: string
}

export interface KandidatSesi {
    id: string
    nama: string
    jadwalId?: string
}

export interface InputHasilFormValues {
    kandidatId: string
    pemahamanKonsep: string
    ketepatanPenerapan: string
    komunikasiAlasan: string
    refleksiTindakLanjut: string
    catatan: string
    keputusan: KeputusanType | ""
}

export type InputHasilFormErrors = Partial<
    Record<keyof InputHasilFormValues, string>
>

export interface SubmitPenilaianPayload {
    kandidatId: string
    pemahamanKonsep: number
    ketepatanPenerapan: number
    komunikasiAlasan: number
    refleksiTindakLanjut: number
    catatan: string
    keputusan: KeputusanType
}

export interface InputHasilContentProps {
    initialCandidates?: KandidatSesi[]
    onSubmitPenilaian?: (payload: SubmitPenilaianPayload) => Promise<void> | void
}