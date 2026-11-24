"use client"

import { DataTable, type DataTableColumn } from "@/components/ui/data-table"
import { Chip, type ChipVariant } from "@/components/ui/Chip"
import { ProgressBar } from "@/components/ui/progressbar"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/EmptyState"
import type { GoalProgressRow, LevelStatus } from "../interfaces"

interface GoalProgressTableProps {
    rows: GoalProgressRow[]
    onOpenCourse: () => void
    onSelectGoal: () => void
}

function getLevelChipVariant(status: LevelStatus): ChipVariant {
    if (status === "Lulus") return "green"
    if (status === "Terbuka") return "blue"
    return "neutral"
}

export function GoalProgressTable({
    rows,
    onOpenCourse,
    onSelectGoal,
}: GoalProgressTableProps) {
    const columns: DataTableColumn<GoalProgressRow>[] = [
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
            render: (row) => (
                <Chip variant={getLevelChipVariant(row.level1)}>{row.level1}</Chip>
            ),
        },
        {
            key: "level2",
            label: "Level 2",
            width: "14%",
            render: (row) => (
                <Chip variant={getLevelChipVariant(row.level2)}>{row.level2}</Chip>
            ),
        },
        {
            key: "level3",
            label: "Level 3",
            width: "14%",
            render: (row) => (
                <Chip variant={getLevelChipVariant(row.level3)}>{row.level3}</Chip>
            ),
        },
        {
            key: "progres",
            label: "Progres",
            width: "18%",
            render: (row) => (
                <div className="w-24">
                    <ProgressBar value={row.progres} size="sm" label={`Progres ${row.atribut}`} />
                </div>
            ),
        },
        {
            key: "aksi",
            label: "Aksi",
            width: "18%",
            render: () => (
                <Button
                    variant="white"
                    size="sm"
                    onPress={onOpenCourse}
                    className="cursor-pointer"
                >
                    Buka course
                </Button>
            ),
        },
    ]

    return (
        <section className="mt-8 w-full">
            <h2 className="mb-3 font-sans text-sm font-bold text-[#0A0A0A]">
                Posisi level per goal
            </h2>

            {rows.length === 0 ? (
                <EmptyState
                    message="Belum ada goal."
                    actionLabel="Pilih goal"
                    onAction={onSelectGoal}
                />
            ) : (
                <DataTable
                    ariaLabel="Posisi level per goal"
                    columns={columns}
                    rows={rows}
                    className="w-full"
                />
            )}
        </section>
    )
}
