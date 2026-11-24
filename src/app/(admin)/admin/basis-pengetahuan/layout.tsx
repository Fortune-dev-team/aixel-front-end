"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";

const TABS = [
    { label: "Sumber Materi", href: "/admin/basis-pengetahuan/materi" },
    { label: "Bank Soal", href: "/admin/basis-pengetahuan/soal" },
];

// TODO: replace with real data (fetch / SWR / React Query)
const SUMMARY = {
    totalSumber: 6,
    modul: 2,
    totalSoal: 16,
    soalAktif: 16,
    atributTanpaModul: ["Kepemimpinan"],
};

export default function BasisPengetahuanLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="font-mono text-2xl md:text-3xl font-black text-black tracking-tight">
                    Basis Pengetahuan
                </h1>
                <p className="mt-1 text-sm text-zinc-600">
                    Modul adalah sumber utama untuk materi dan soal. Video dan artikel untuk pelengkap materi.
                </p>
            </div>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                <Card step={String(SUMMARY.totalSumber)} title="Total sumber materi" className="w-full" />
                <Card step={String(SUMMARY.modul)} title="Modul" className="w-full" />
                <Card step={String(SUMMARY.totalSoal)} title="Total soal" className="w-full" />
                <Card step={String(SUMMARY.soalAktif)} title="Soal aktif" className="w-full" />
            </div>

            {/* Warning */}
            {SUMMARY.atributTanpaModul.length > 0 && (
                <div
                    role="alert"
                    className="rounded-2xl border-2 border-black bg-[#fff1c2] px-5 py-4 shadow-[4px_4px_0_0_#111111]"
                >
                    <p className="font-mono text-base font-bold text-black">
                        Modul belum ada untuk: {SUMMARY.atributTanpaModul.join(", ")}.
                    </p>
                    <p className="mt-1 text-xs text-zinc-700">
                        Setiap atribut wajib punya modul aktif. Modul yang sama dipakai untuk soal Level 1 dan Level 2.
                        Tanpa modul, anggota tidak punya materi utama dan soal tidak bisa dibuat.
                    </p>
                </div>
            )}

            {/* Route-based tabs */}
            <nav aria-label="Tab" className="flex items-end gap-3 border-b border-black">
                {TABS.map((tab) => {
                    const active = pathname.startsWith(tab.href);
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            aria-current={active ? "page" : undefined}
                            className={`rounded-t-lg border-2 border-b-0 border-black px-3 py-3 font-mono text-sm font-bold transition-colors ${
                                active ? "bg-[#0d0d0d] text-white" : "bg-white text-black hover:bg-[#f0ede6]"
                            }`}
                        >
                            {tab.label}
                        </Link>
                    );
                })}
            </nav>

            {children}
        </div>
    );
}