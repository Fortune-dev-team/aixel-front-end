import type { DashboardDemoState, DashboardSnapshot } from "./interfaces"

export const DEMO_STATE_OPTIONS: { id: DashboardDemoState; label: string }[] = [
    { id: "empty", label: "1. Kosong" },
    { id: "started", label: "2. Mulai" },
    { id: "completed", label: "3. Lulus" },
]

export const DASHBOARD_STATES: Record<DashboardDemoState, DashboardSnapshot> = {
    empty: {
        stats: {
            goalAktif: "0",
            atributDimiliki: "0",
            level3Terbuka: "0",
            notifikasi: "2",
        },
        goals: [],
        ownedAttributes: [],
    },
    started: {
        stats: {
            goalAktif: "2/2",
            atributDimiliki: "0",
            level3Terbuka: "0",
            notifikasi: "2",
        },
        goals: [
            {
                id: "komunikasi",
                atribut: "Komunikasi",
                level1: "Belum",
                level2: "Terkunci",
                level3: "Terkunci",
                progres: 0,
            },
            {
                id: "problem-solving",
                atribut: "Problem Solving",
                level1: "Belum",
                level2: "Terkunci",
                level3: "Terkunci",
                progres: 0,
            },
        ],
        ownedAttributes: [],
    },
    completed: {
        stats: {
            goalAktif: "1/2",
            atributDimiliki: "1",
            level3Terbuka: "1",
            notifikasi: "2",
        },
        goals: [
            {
                id: "komunikasi",
                atribut: "Komunikasi",
                level1: "Lulus",
                level2: "Lulus",
                level3: "Lulus",
                progres: 100,
            },
            {
                id: "problem-solving",
                atribut: "Problem Solving",
                level1: "Lulus",
                level2: "Lulus",
                level3: "Terbuka",
                progres: 65,
            },
        ],
        ownedAttributes: [
            {
                id: "attr-komunikasi",
                atribut: "Komunikasi",
                keterangan: "Lulus wawancara",
                tanggalLulus: "06 Nov 2026",
                mentor: "Dimas Prakoso",
                berlakuHingga: "06 Nov 2027",
                status: "Aktif",
            },
        ],
    },
}