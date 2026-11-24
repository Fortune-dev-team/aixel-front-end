import type {
    RiwayatKeputusanStatus,
    RiwayatPenilaianItem,
} from "./interfaces"

export const KEPUTUSAN_BADGE_STYLES: Record<RiwayatKeputusanStatus, string> = {
    Ulang:
        "border-[#DC2626] bg-[#FEF2F2] text-[#DC2626]",
    "Belum selesai":
        "border-[#D97706] bg-[#FFFBEB] text-[#B45309]",
    Selesai:
        "border-[#16A34A] bg-[#F0FDF4] text-[#15803D]",
}

export const MOCK_RIWAYAT_PENILAIAN: RiwayatPenilaianItem[] = [
    {
        id: "rwy-01",
        anggota: "Rani Kusuma",
        atribut: "Komunikasi",
        keputusan: "Ulang",
        catatan: "Materi belum terbuka.",
    },
    {
        id: "rwy-02",
        anggota: "Budi Santoso",
        atribut: "Komunikasi",
        keputusan: "Belum selesai",
        catatan: "Masih terdapat kesalahan alur.",
    },
    {
        id: "rwy-03",
        anggota: "Tia Anggraini",
        atribut: "Komunikasi",
        keputusan: "Selesai",
        catatan: "Contoh jelas dan terstruktur.",
    },
]