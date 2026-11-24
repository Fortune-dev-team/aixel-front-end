import type {
    InputHasilFormValues,
    KandidatSesi,
    KeputusanType,
    SelectOption,
} from "./interfaces"

export const RUBRIK_SKOR_OPTIONS: SelectOption[] = [
    { id: "1", label: "1 — Sangat Kurang" },
    { id: "2", label: "2 — Kurang" },
    { id: "3", label: "3 — Cukup" },
    { id: "4", label: "4 — Baik" },
    { id: "5", label: "5 — Sangat Baik" },
]

export const KEPUTUSAN_OPTIONS: KeputusanType[] = [
    "Memadai",
    "Belum memadai",
    "Ulang",
]

export const DEFAULT_FORM_VALUES: InputHasilFormValues = {
    kandidatId: "",
    pemahamanKonsep: "",
    ketepatanPenerapan: "",
    komunikasiAlasan: "",
    refleksiTindakLanjut: "",
    catatan: "",
    keputusan: "",
}

export const MOCK_KANDIDAT_SESI: KandidatSesi[] = [
    { id: "knd-01", nama: "Dimas Prakoso" },
    { id: "knd-02", nama: "Nadia Putri" },
    { id: "knd-03", nama: "Raka Mahendra" },
]