export interface SoalItem {
    id: string;
    soal: string;
    jawaban: string;
    atribut: string;
    level: 1 | 2;
    aktif: boolean;
    modul?: string;
    pilihan?: string[];
    fotoPendukung?: string;
}
