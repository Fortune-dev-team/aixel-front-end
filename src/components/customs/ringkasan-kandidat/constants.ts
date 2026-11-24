import type {
    KandidatRingkasanDetail,
    RingkasanBagianItem,
} from "./interfaces"

export const MOCK_KANDIDAT_RINGKASAN: KandidatRingkasanDetail[] = [
    {
        id: "knd-01",
        nama: "Dimas Prakoso",
        tesAwal: "Kesiapan: 65/100 · fokus: tingkat lanjut",
        sesiLevel1: "100% · 1 percobaan",
        sesiLevel2: "Pengenalan masalah · 4/5 · 1 percobaan",
        jawabanStudiKasus:
            "Identifikasi dulu pihak, menyusun prioritas, lalu mengevaluasi hasilnya.",
        catatanWawancaraSebelumnya: null,
    },
    {
        id: "knd-02",
        nama: "Nadia Putri",
        tesAwal: "Kesiapan: 78/100 · fokus: pengambilan keputusan",
        sesiLevel1: "100% · 1 percobaan",
        sesiLevel2: "Analisis akar masalah · 5/5 · 1 percobaan",
        jawabanStudiKasus:
            "Memetakan dampak jangka pendek dan menyelaraskan solusi lintas divisi.",
        catatanWawancaraSebelumnya:
            "Komunikasi terstruktur, perlu pendalaman pada mitigasi risiko.",
    },
    {
        id: "knd-03",
        nama: "Raka Mahendra",
        tesAwal: "Kesiapan: 60/100 · fokus: komunikasi",
        sesiLevel1: "90% · 2 percobaan",
        sesiLevel2: "Pengenalan masalah · 3/5 · 1 percobaan",
        jawabanStudiKasus:
            "Mengumpulkan data lapangan terlebih dahulu sebelum menentukan langkah.",
        catatanWawancaraSebelumnya: null,
    },
]

export function mapDetailToRows(
    detail: KandidatRingkasanDetail
): RingkasanBagianItem[] {
    return [
        {
            bagian: "Tes Awal",
            isi: detail.tesAwal,
        },
        {
            bagian: "Sesi Level 1",
            isi: detail.sesiLevel1,
        },
        {
            bagian: "Sesi Level 2",
            isi: detail.sesiLevel2,
        },
        {
            bagian: "Jawaban studi kasus",
            isi: detail.jawabanStudiKasus,
        },
        {
            bagian: "Catatan wawancara sebelumnya",
            isi: detail.catatanWawancaraSebelumnya?.trim() || "Belum ada",
        },
    ]
}