"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DataTable, type DataTableColumn } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/Chip"
import { cn } from "@/lib/utils"

type LevelStatus = "Belum" | "Terkunci" | "Terbuka" | "Lulus"
type DashboardDemoState = "empty" | "started" | "completed"

interface GoalProgressRow {
    id: string
    atribut: string
    level1: LevelStatus
    level2: LevelStatus
    level3: LevelStatus
    progres: number
}

interface OwnedAttributeRow {
    id: string
    atribut: string
    keterangan: string
    tanggalLulus: string
    mentor: string
    berlakuHingga: string
    status: "Aktif"
}

interface DashboardSnapshot {
    stats: {
        goalAktif: string
        atributDimiliki: string
        level3Terbuka: string
        notifikasi: string
    }
    goals: GoalProgressRow[]
    ownedAttributes: OwnedAttributeRow[]
}

const DASHBOARD_STATES: Record<DashboardDemoState, DashboardSnapshot> = {
    // Frame 1: Belum ada goal
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
    // Frame 2 & 3: Goal aktif dipilih, progres baru mulai
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
    // Frame 4: Progres berjalan & 1 atribut lulus Level 3
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

function LevelBadge({ status }: { status: LevelStatus }) {
    const variant =
        status === "Lulus"
            ? "green"
            : status === "Terbuka"
                ? "blue"
                : "neutral"

    return <Chip variant={variant}>{status}</Chip>
}

function GoalProgressBar({ value }: { value: number }) {
    const clamped = Math.max(0, Math.min(100, value))

    return (
        <div
            role="progressbar"
            aria-valuenow={clamped}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-2.5 w-24 overflow-hidden rounded-[3px] border border-[#0A0A0A] bg-[#FDFCFA]"
        >
            <div
                className="h-full bg-[#FF5722] transition-all duration-300"
                style={{ width: `${clamped}%` }}
            />
        </div>
    )
}

export default function TeamDashboardPage() {
    const router = useRouter()
    const [demoState, setDemoState] =
        React.useState<DashboardDemoState>("completed")

    const currentData = DASHBOARD_STATES[demoState]

    const statCards = [
        { label: "Goal aktif", value: currentData.stats.goalAktif },
        { label: "Atribut dimiliki", value: currentData.stats.atributDimiliki },
        { label: "Level 3 terbuka", value: currentData.stats.level3Terbuka },
        { label: "Notifikasi", value: currentData.stats.notifikasi },
    ]

    const goalColumns: DataTableColumn<GoalProgressRow>[] = [
        {
            key: "atribut",
            label: "Atribut",
            width: "22%",
            render: (row) => (
                <span className="font-sans text-xs font-medium text-[#0A0A0A]">
                    {row.atribut}
                </span>
            ),
        },
        {
            key: "level1",
            label: "Level 1",
            width: "14%",
            render: (row) => <LevelBadge status={row.level1} />,
        },
        {
            key: "level2",
            label: "Level 2",
            width: "14%",
            render: (row) => <LevelBadge status={row.level2} />,
        },
        {
            key: "level3",
            label: "Level 3",
            width: "14%",
            render: (row) => <LevelBadge status={row.level3} />,
        },
        {
            key: "progres",
            label: "Progres",
            width: "18%",
            render: (row) => <GoalProgressBar value={row.progres} />,
        },
        {
            key: "aksi",
            label: "Aksi",
            width: "18%",
            render: () => (
                <Button
                    variant="white"
                    size="sm"
                    onPress={() => router.push("/team/course")}
                    className="cursor-pointer"
                >
                    Buka course
                </Button>
            ),
        },
    ]

    const ownedAttributeColumns: DataTableColumn<OwnedAttributeRow>[] = [
        {
            key: "atribut",
            label: "Atribut",
            width: "20%",
            render: (row) => (
                <span className="font-sans text-xs font-medium text-[#0A0A0A]">
                    {row.atribut}
                </span>
            ),
        },
        {
            key: "keterangan",
            label: "Keterangan",
            width: "18%",
            render: (row) => (
                <span className="font-sans text-xs text-[#262626]">
                    {row.keterangan}
                </span>
            ),
        },
        {
            key: "tanggalLulus",
            label: "Tanggal Lulus",
            width: "16%",
            render: (row) => (
                <span className="font-mono text-xs text-[#262626]">
                    {row.tanggalLulus}
                </span>
            ),
        },
        {
            key: "mentor",
            label: "Mentor",
            width: "18%",
            render: (row) => (
                <span className="font-sans text-xs text-[#262626]">{row.mentor}</span>
            ),
        },
        {
            key: "berlakuHingga",
            label: "Berlaku Hingga",
            width: "16%",
            render: (row) => (
                <span className="font-mono text-xs text-[#262626]">
                    {row.berlakuHingga}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            width: "12%",
            render: (row) => <Chip variant="green">{row.status}</Chip>,
        },
    ]

    return (
        <div className="w-full">
            {/* Header & Preview State Switcher */}
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="font-heading text-2xl font-extrabold tracking-tight text-[#0A0A0A]">
                        Halo, Alex
                    </h1>
                    <p className="mt-1 font-sans text-xs text-[#404040] sm:text-sm">
                        Ringkasan belajar Anda.
                    </p>
                </div>

                {/* Toggle State Preview (Hapus saat sudah integrasi API) */}
                <div className="inline-flex items-center gap-1 rounded-lg border border-[#0A0A0A]/30 bg-[#FDFCFA] p-1">
                    {(
                        [
                            { id: "empty", label: "1. Kosong" },
                            { id: "started", label: "2. Mulai" },
                            { id: "completed", label: "3. Lulus" },
                        ] as const
                    ).map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setDemoState(tab.id)}
                            className={cn(
                                "cursor-pointer rounded-md px-2.5 py-1 font-mono text-[11px] font-medium transition-colors",
                                demoState === tab.id
                                    ? "bg-[#0A0A0A] text-[#FDFCFA]"
                                    : "text-[#404040] hover:bg-[#EFEFEB]"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* 4 Summary Stat Cards - Membentang penuh */}
            <section
                aria-label="Ringkasan Statistik"
                className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4"
            >
                {statCards.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-4 shadow-[3px_3px_0px_#0A0A0A]"
                    >
                        <div className="font-mono text-2xl font-bold text-[#FF5722]">
                            {stat.value}
                        </div>
                        <div className="mt-1 font-sans text-xs text-[#404040]">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </section>

            {/* Section 1: Posisi level per goal */}
            <section className="mt-8 w-full">
                <h2 className="mb-3 font-sans text-sm font-bold text-[#0A0A0A]">
                    Posisi level per goal
                </h2>

                {currentData.goals.length === 0 ? (
                    <div className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#0A0A0A]/40 bg-[#FDFCFA]/60 px-4 py-8 text-center">
                        <p className="mb-3 font-sans text-xs text-[#525252]">
                            Belum ada goal.
                        </p>
                        <Button
                            variant="coral"
                            size="sm"
                            onPress={() => router.push("/team/goal")}
                            className="cursor-pointer !text-[#0A0A0A]"
                        >
                            Pilih goal
                        </Button>
                    </div>
                ) : (
                    <DataTable
                        ariaLabel="Posisi level per goal"
                        columns={goalColumns}
                        rows={currentData.goals}
                        className="w-full"
                    />
                )}
            </section>

            {/* Section 2: Atribut dimiliki */}
            <section className="mt-8 w-full">
                <h2 className="mb-3 font-sans text-sm font-bold text-[#0A0A0A]">
                    Atribut dimiliki
                </h2>

                {currentData.ownedAttributes.length === 0 ? (
                    <div className="flex w-full items-center justify-center rounded-xl border-2 border-dashed border-[#0A0A0A]/40 bg-[#FDFCFA]/60 px-4 py-7 text-center">
                        <p className="font-sans text-xs text-[#525252]">
                            Belum memiliki atribut. Lulus Level 3 untuk mendapatkannya.
                        </p>
                    </div>
                ) : (
                    <DataTable
                        ariaLabel="Daftar atribut yang dimiliki"
                        columns={ownedAttributeColumns}
                        rows={currentData.ownedAttributes}
                        className="w-full"
                    />
                )}
            </section>
        </div>
    )
}