import type { RubrikAspekItem, RubrikLevelColumn } from "./interfaces"

export const RUBRIK_LEVEL_COLUMNS: RubrikLevelColumn[] = [
    { score: 1, label: "1 · Benchmark" },
    { score: 2, label: "2 · Milestone dasar" },
    { score: 3, label: "3 · Milestone lanjutan" },
    { score: 4, label: "4 · Capstone" },
]

export const DEFAULT_RUBRIK_ITEMS: RubrikAspekItem[] = [
    {
        id: "pemahaman-konsep",
        aspek: "Pemahaman konsep",
        level1: "Menyebut konsep tanpa contoh",
        level2: "Menjelaskan konsep dengan contoh sederhana",
        level3: "Menjelaskan dengan contoh yang relevan",
        level4: "Mengaitkan konsep lintas situasi",
    },
    {
        id: "ketepatan-penerapan",
        aspek: "Ketepatan penerapan",
        level1: "Langkah tidak sesuai kasus",
        level2: "Langkah sesuai sebagian",
        level3: "Langkah sesuai dan berurutan",
        level4: "Langkah disesuaikan dengan konteks",
    },
    {
        id: "kejelasan-alasan",
        aspek: "Kejelasan alasan",
        level1: "Tidak memberi alasan",
        level2: "Memberi alasan umum",
        level3: "Alasan mengacu fakta kasus",
        level4: "Alasan dan perbandingan alternatif",
    },
    {
        id: "refleksi-tindak-lanjut",
        aspek: "Refleksi dan tindak lanjut",
        level1: "Tidak menyebut tindak lanjut",
        level2: "Tindak lanjut umum",
        level3: "Tindak lanjut terukur",
        level4: "Tindak lanjut dan pelajaran untuk kasus lain",
    },
]