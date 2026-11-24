import type {
    JadwalSlotOption,
    PermintaanItem,
    PermintaanStatusType,
} from "./interfaces"

export const PERMINTAAN_STATUS_STYLES: Record<PermintaanStatusType, string> = {
    Menunggu: "border-[#D97706] bg-[#FFFBEB] text-[#B45309]",
    "Menunggu respon": "border-[#EA580C] bg-[#FFF7ED] text-[#C2410C]",
    Dijadwalkan: "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]",
    Ditolak: "border-[#DC2626] bg-[#FEF2F2] text-[#DC2626]",
}

export const DEFAULT_JADWAL_SLOTS: JadwalSlotOption[] = [
    { id: "slot-01", label: "Kamis, 3 Des 2026, 10.00" },
    { id: "slot-02", label: "Jumat, 4 Des 2026, 14.00" },
    { id: "slot-03", label: "Senin, 7 Des 2026, 09.30" },
]

export const MOCK_PERMINTAAN_ITEMS: PermintaanItem[] = [
    {
        id: "prm-01",
        peranAtribut: "Mentee Komunikasi",
        namaMentee: "Rani Kusuma",
        jadwalDiajukan: "Selasa, 1 Des 2026, 12.21",
        catatan: "Siap untuk sesi penilaian level 2.",
        status: "Menunggu",
    },
]