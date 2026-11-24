import type { JadwalStatusType, JadwalWawancaraItem } from "./interfaces"

export const JADWAL_STATUS_STYLES: Record<JadwalStatusType, string> = {
    Dijadwalkan: "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]",
    Selesai: "border-[#16A34A] bg-[#F0FDF4] text-[#15803D]",
    Dibatalkan: "border-[#DC2626] bg-[#FEF2F2] text-[#DC2626]",
}

export const MOCK_JADWAL_WAWANCARA: JadwalWawancaraItem[] = [
    {
        id: "jw-01",
        peranAtribut: "Mentee Komunikasi",
        namaMentee: "Rani Kusuma",
        jadwalFormatted: "Selasa, 1 Des 2026, 12.21",
        status: "Dijadwalkan",
    },
    {
        id: "jw-02",
        peranAtribut: "Mentee Problem Solving",
        namaMentee: "Fajar Nugroho",
        jadwalFormatted: "Sabtu, 12 Des 2026, 12.12",
        status: "Dijadwalkan",
    },
]