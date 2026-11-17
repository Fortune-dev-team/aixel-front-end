export type CompetencyKey = "komunikasi" | "problemSolving" | "kepemimpinan";

export interface OnboardingProfile {
    fullName: string;
    role: string;
    bio: string;
}

export interface SelfRatings {
    komunikasi: number;
    problemSolving: number;
    kepemimpinan: number;
}

export interface AssessmentQuestion {
    id: string;
    aspect: CompetencyKey;
    question: string;
    options: {
        id: string;
        text: string;
        score: number; // 1 - 5 scale equivalent
    }[];
}

export const ROLE_OPTIONS = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "UI/UX Designer",
    "Product Manager",
    "QA Engineer",
];

export const COMPETENCY_LABELS: Record<CompetencyKey, string> = {
    komunikasi: "Komunikasi",
    problemSolving: "Problem Solving",
    kepemimpinan: "Kepemimpinan",
};

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
    {
        id: "q1",
        aspect: "komunikasi",
        question:
            "Rekan tim melewati tenggat waktu dan menghambat tugas Anda, apa yang Anda lakukan?",
        options: [
            {
                id: "q1-a",
                text: "Menghubungi secara personal untuk menanyakan kendala dan menyepakati ulang estimasi waktu.",
                score: 5,
            },
            {
                id: "q1-b",
                text: "Menunggu hingga rapat harian berikutnya lalu menyampaikan keterlambatan di forum.",
                score: 3,
            },
            {
                id: "q1-c",
                text: "Langsung mengerjakan bagiannya sendiri tanpa memberi tahu agar cepat selesai.",
                score: 2,
            },
        ],
    },
    {
        id: "q2",
        aspect: "problemSolving",
        question:
            "Menghadapi bug produksi tanpa dokumentasi atau panduan yang jelas, langkah pertama Anda?",
        options: [
            {
                id: "q2-a",
                text: "Mereproduksi error, memeriksa log sistem, dan memetakan akar masalah sebelum memperbaiki.",
                score: 5,
            },
            {
                id: "q2-b",
                text: "Mencoba beberapa perubahan cepat sampai error-nya hilang sementara.",
                score: 2,
            },
            {
                id: "q2-c",
                text: "Menunda pengerjaan hingga senior atau lead memberikan solusi pasti.",
                score: 3,
            },
        ],
    },
    {
        id: "q3",
        aspect: "kepemimpinan",
        question:
            "Tim mendapatkan proyek baru dengan teknologi yang belum dikuasai sebagian besar anggota:",
        options: [
            {
                id: "q3-a",
                text: "Membuat sesi berbagi singkat, membagi eksplorasi fitur, dan menyusun standar awal bersama.",
                score: 5,
            },
            {
                id: "q3-b",
                text: "Membiarkan masing-masing anggota belajar sendiri sesuai bagian tugasnya.",
                score: 3,
            },
            {
                id: "q3-c",
                text: "Meminta penundaan jadwal rilis sampai semua anggota mengikuti pelatihan penuh.",
                score: 2,
            },
        ],
    },
];