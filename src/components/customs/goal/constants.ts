import type { GoalItem } from "./interfaces"

export const AVAILABLE_GOALS: GoalItem[] = [
    {
        id: "product-market-fit",
        title: "Validasi Problem & Solusi (PMF)",
        category: "Product & Market",
        description:
            "Memvalidasi hipotesis masalah dan solusi melalui wawancara pelanggan terstruktur dan pengujian MVP.",
        level: "Level 1",
        targetAttributes: ["Problem Solving", "Komunikasi"],
        recommendedFor: "Berdasarkan hasil tes awal",
    },
    {
        id: "team-alignment",
        title: "Penyelarasan Visi & Budaya Tim",
        category: "Leadership & Team",
        description:
            "Membangun komitmen bersama, pembagian peran kerja yang jelas, dan ritme komunikasi internal.",
        level: "Level 1",
        targetAttributes: ["Kepemimpinan", "Komunikasi"],
        recommendedFor: "Berdasarkan hasil tes awal",
    },
    {
        id: "mvp-launch",
        title: "Peluncuran Prototipe Pertama",
        category: "Execution & Tech",
        description:
            "Merilis versi awal produk untuk mendapatkan umpan balik langsung dari calon pengguna awal (early adopters).",
        level: "Level 1",
        targetAttributes: ["Problem Solving"],
    },
    {
        id: "customer-acquisition",
        title: "Akuisisi 100 Pengguna Pertama",
        category: "Growth & Sales",
        description:
            "Menerapkan strategi pemasaran gerilya dan funnel penjualan awal untuk menjangkau target audiens.",
        level: "Level 1",
        targetAttributes: ["Komunikasi", "Problem Solving"],
    },
]
