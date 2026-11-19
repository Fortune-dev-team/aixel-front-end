"use client"

import { DataTable, type DataTableColumn } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { EmptyStateCard } from "../cards/empty-state-card"
import { GoalProgressBar } from "../widgets/goal-progress-bar"
import { LevelStatusBadge } from "../widgets/level-status-badge"
import type { GoalProgressRow } from "../interfaces"

interface GoalProgressTableProps {
    rows: GoalProgressRow[]
    onOpenCourse: () => void
    onSelectGoal: () => void
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
            render: (row) => <LevelStatusBadge status={row.level1} />,
        },
        {
            key: "level2",
            label: "Level 2",
            width: "14%",
            render: (row) => <LevelStatusBadge status={row.level2} />,
        },
        {
            key: "level3",
            label: "Level 3",
            width: "14%",
            render: (row) => <LevelStatusBadge status={row.level3} />,
        },
        {
            key: "progres",
            label: "Progres",
            width: "18%",
            render: (row) => (
                <GoalProgressBar
                    value={row.progres}
                    label={`Progres ${row.atribut}`}
                />
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
                <EmptyStateCard
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