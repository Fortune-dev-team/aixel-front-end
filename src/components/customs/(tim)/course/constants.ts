import type {
    CaseRubricRow,
    CourseGoalOption,
    CourseMentor,
    GoalLevelProgress,
    QuizQuestion,
} from "./interfaces";

export const COURSE_GOALS: CourseGoalOption[] = [
    { id: "komunikasi", title: "Komunikasi", category: "Soft skill" },
    { id: "problem-solving", title: "Problem Solving", category: "Soft skill" },
    { id: "kepemimpinan", title: "Kepemimpinan", category: "Manajemen" },
];

export const INITIAL_GOAL_PROGRESS: Record<string, GoalLevelProgress> = {
    komunikasi: {
        level1: "active",
        level2: "locked",
        level3: "locked",
    },
    "problem-solving": {
        level1: "active",
        level2: "locked",
        level3: "locked",
    },
    kepemimpinan: {
        level1: "passed",
        level2: "passed",
        level3: "active",
    },
};

export const LEVEL_METADATA = [
    {
        level: 1 as const,
        key: "level1" as const,
        title: "Level 1",
        subtitle: "Konseptual",
        description: "Tes pemahaman konsep dan indikator perilaku.",
        href: "/team/course/level-1",
    },
    {
        level: 2 as const,
        key: "level2" as const,
        title: "Level 2",
        subtitle: "Studi kasus kompleks",
        description: "Menerapkan konsep pada kasus nyata dan evaluasi tertulis.",
        href: "/team/course/level-2",
    },
    {
        level: 3 as const,
        key: "level3" as const,
        title: "Level 3",
        subtitle: "Wawancara offline",
        description: "Wawancara oleh mentor di luar platform.",
        href: "/team/course/level-3",
    },
];

export const LEVEL1_QUIZ_SETS: QuizQuestion[][] = [
    [
        {
            id: "q1-a",
            number: 1,
            question: "Rekan tidak paham penjelasan Anda. Langkah pertama?",
            options: [
                { id: "opt-1", label: "Mengulang dengan suara lebih keras" },
                {
                    id: "opt-2",
                    label: "Menanyakan bagian yang belum jelas lalu menjelaskan ulang",
                },
                { id: "opt-3", label: "Menyalahkan kesiapan bertanya" },
            ],
            correctOptionId: "opt-2",
        },
        {
            id: "q2-a",
            number: 2,
            question: "Pesan yang efektif diawali dengan...",
            options: [
                { id: "opt-1", label: "Detail teknis selengkapnya" },
                { id: "opt-2", label: "Tujuan dan poin utama" },
                { id: "opt-3", label: "Permintaan maaf" },
            ],
            correctOptionId: "opt-2",
        },
    ],
    [
        {
            id: "q1-b",
            number: 1,
            question: "Saat diskusi tim mulai melebar dari topik utama, tindakan terbaik adalah...",
            options: [
                { id: "opt-1", label: "Membiarkan diskusi berjalan sampai waktu habis" },
                {
                    id: "opt-2",
                    label: "Merangkum poin penting dan mengarahkan kembali ke tujuan rapat",
                },
                { id: "opt-3", label: "Langsung menutup rapat tanpa kesimpulan" },
            ],
            correctOptionId: "opt-2",
        },
        {
            id: "q2-b",
            number: 2,
            question: "Cara memastikan penerima memahami instruksi kerja adalah...",
            options: [
                { id: "opt-1", label: "Meminta konfirmasi ulang poin tindakan dan tenggatnya" },
                { id: "opt-2", label: "Mengirimkan dokumen panjang tanpa ringkasan" },
                { id: "opt-3", label: "Berasumsi tidak ada pertanyaan berarti sudah paham" },
            ],
            correctOptionId: "opt-1",
        },
    ],
];

export const LEVEL2_CASE_PROMPTS: string[] = [
    "Dua rekan berbeda pendapat soal prioritas dan deadline proyek tinggal tiga hari. Jelaskan langkah Anda terkait Komunikasi. Sertakan alasan, dampak, dan tindak lanjut.",
    "Klien meminta perubahan fitur besar dua hari sebelum presentasi akhir sementara tim sudah kelelahan. Jelaskan langkah komunikasi Anda kepada klien dan tim. Sertakan alasan, dampak, dan tindak lanjut.",
];

export const LEVEL2_FAILED_RUBRIC: CaseRubricRow[] = [
    {
        id: "pemahaman-konsep",
        kriteria: "Pemahaman konsep",
        skor: "3/4",
        tingkat: "Benchmark",
        deskripsi: "Menyajikan konsep secara akurat",
    },
    {
        id: "ketepatan-penerapan",
        kriteria: "Ketepatan penerapan",
        skor: "2/4",
        tingkat: "Benchmark",
        deskripsi: "Langkah tidak sesuai kasus",
    },
    {
        id: "kejelasan-alasan",
        kriteria: "Kejelasan alasan",
        skor: "2/4",
        tingkat: "Benchmark",
        deskripsi: "Tidak memberi alasan",
    },
    {
        id: "refleksi-tindak-lanjut",
        kriteria: "Refleksi dan tindak lanjut",
        skor: "1/4",
        tingkat: "Benchmark",
        deskripsi: "Tidak mengusulkan tindak lanjut",
    },
];

export const LEVEL2_PASSED_RUBRIC: CaseRubricRow[] = [
    {
        id: "pemahaman-konsep",
        kriteria: "Pemahaman konsep",
        skor: "4/4",
        tingkat: "Capstone",
        deskripsi: "Mengaitkan konsep lintas situasi",
    },
    {
        id: "ketepatan-penerapan",
        kriteria: "Ketepatan penerapan",
        skor: "4/4",
        tingkat: "Capstone",
        deskripsi: "Langkah disesuaikan dengan konteks",
    },
    {
        id: "kejelasan-alasan",
        kriteria: "Kejelasan alasan",
        skor: "4/4",
        tingkat: "Capstone",
        deskripsi: "Alasan dan pertimbangan alternatif",
    },
    {
        id: "refleksi-tindak-lanjut",
        kriteria: "Refleksi dan tindak lanjut",
        skor: "4/4",
        tingkat: "Capstone",
        deskripsi: "Tindak lanjut & pelajaran untuk kasus lain",
    },
];

export const LEVEL3_MENTORS: CourseMentor[] = [
    {
        id: "dimas-prakoso",
        name: "Dimas Prakoso",
        roleLabel: "Mentor Komunikasi",
        quotaLabel: "Kuota aktif 2/3",
    },
    {
        id: "rina-aditya",
        name: "Rina Aditya",
        roleLabel: "Mentor Komunikasi",
        quotaLabel: "Kuota aktif 0/3",
    },
];