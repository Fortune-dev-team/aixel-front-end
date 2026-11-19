"use client"

import { StatCard } from "./cards/stat-card"
import { GoalProgressTable } from "./tables/goal-progress-table"
import { OwnedAttributesTable } from "./tables/owned-attributes-table"
import { useDashboard } from "./use-dashboard"
import { DashboardHeader } from "./widgets/dashboard-header"

export function DashboardContent() {
    const {
        demoState,
        setDemoState,
        statItems,
        goals,
        ownedAttributes,
        goToGoalSelection,
        goToCourse,
    } = useDashboard()

    return (
        <div className="w-full">
            <DashboardHeader
                userName="Alex"
                demoState={demoState}
                onDemoStateChange={setDemoState}
            />

            <section
                aria-label="Ringkasan Statistik"
                className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4"
            >
                {statItems.map((stat) => (
                    <StatCard key={stat.label} label={stat.label} value={stat.value} />
                ))}
            </section>

            <GoalProgressTable
                rows={goals}
                onOpenCourse={goToCourse}
                onSelectGoal={goToGoalSelection}
            />

            <OwnedAttributesTable rows={ownedAttributes} />
        </div>
    )
}