"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DataTable, type DataTableColumn } from "@/components/ui/tableheader"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type KasusStatus = "Sesuai" | "Kurang sesuai"

interface TesAwalResultRow {
    id: string
    atribut: string
    penilaianDiri: string
    statusKasus: KasusStatus
}

const INITIAL_TES_AWAL_DATA: TesAwalResultRow[] = [
    {
        id: "komunikasi",
        atribut: "Komunikasi",
        penilaianDiri: "4/5",
        statusKasus: "Sesuai",
    },
    {
        id: "problem-solving",
        atribut: "Problem Solving",
        penilaianDiri: "5/5",
        statusKasus: "Kurang sesuai",
    },
    {
        id: "kepemimpinan",
        atribut: "Kepemimpinan",
        penilaianDiri: "3/5",
        statusKasus: "Sesuai",
    },
]

function StatusChip({ status }: { status: KasusStatus }) {
    const isSesuai = status === "Sesuai"

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-md border px-2.5 py-0.5 font-mono text-[11px] font-medium",
                isSesuai
                    ? "border-[#15803D] bg-[#DCFCE7] text-[#166534]"
                    : "border-[#B45309] bg-[#FEF3C7] text-[#92400E]"
            )}
        >
            {status}
        </span>
    )
}

export default function TeamTesAwalPage() {
    const router = useRouter()

    const columns: DataTableColumn<TesAwalResultRow>[] = [
        {
            key: "atribut",
            label: "Atribut",
            width: "35%",
            render: (row) => (
                <span className="font-sans text-xs font-medium text-[#0A0A0A]">
                    {row.atribut}
                </span>
            ),
        },
        {
            key: "penilaianDiri",
            label: "Penilaian diri",
            width: "35%",
            render: (row) => (
                <span className="font-mono text-xs text-[#0A0A0A]">
                    {row.penilaianDiri}
                </span>
            ),
        },
        {
            key: "statusKasus",
            label: "Kasus singkat",
            width: "30%",
            render: (row) => <StatusChip status={row.statusKasus} />,
        },
    ]

    const handleUlangiTes = () => {
        router.push("/onboarding")
    }

    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="mb-6">
                <h1 className="font-heading text-2xl font-extrabold tracking-tight text-[#0A0A0A]">
                    Tes Awal
                </h1>
                <p className="mt-1 font-sans text-xs text-[#404040] sm:text-sm">
                    Penilaian diri dan kasus singkat. Hasil hanya membantu memilih goal,
                    level awal tetap Level 1.
                </p>
            </div>

            {/* Tabel Hasil Tes Awal */}
            <DataTable
                ariaLabel="Hasil Tes Awal Atribut Tim"
                columns={columns}
                rows={INITIAL_TES_AWAL_DATA}
                className="w-full"
            />

            {/* Tombol Aksi: Ulangi tes -> lanjut ke onboarding */}
            <div className="mt-6">
                <Button
                    variant="coral"
                    size="sm"
                    onPress={handleUlangiTes}
                    className="cursor-pointer text-[#0A0A0A]"
                >
                    Ulangi tes
                </Button>
            </div>
        </div>
    )
}