import type { TeamNavGroup } from "./interfaces"

export const TEAM_NAV_GROUPS: TeamNavGroup[] = [
    {
        title: "Tim",
        items: [
            { label: "Dashboard", href: "/team/dashboard" },
            { label: "Tes Awal", href: "/team/tes-awal" },
            { label: "Goal", href: "/team/goal" },
            { label: "Course", href: "/team/course" },
            { label: "Schedule", href: "/team/schedule" },
            { label: "Hasil", href: "/team/hasil" },
            { label: "Perpanjangan Atribut", href: "/team/perpanjangan-atribut" },
            { label: "Profil", href: "/team/profil" },
        ],
    },
    {
        title: "Mentor",
        items: [
            { label: "Permintaan", href: "/team/permintaan" },
            { label: "Jadwal Wawancara", href: "/team/jadwal-wawancara" },
            { label: "Input Hasil", href: "/team/input-hasil" },
            { label: "Ringkasan Kandidat", href: "/team/ringkasan-kandidat" },
            { label: "Rubrik Wawancara", href: "/team/rubrik-wawancara" },
            { label: "Riwayat Penilaian", href: "/team/riwayat-penilaian" },
        ],
    },
]
