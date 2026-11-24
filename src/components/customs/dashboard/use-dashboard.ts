"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DASHBOARD_STATES } from "./constants"
import type { DashboardDemoState } from "./interfaces"

export function useDashboard() {
    const router = useRouter()
    const [demoState, setDemoState] =
        React.useState<DashboardDemoState>("completed")

    const currentData = DASHBOARD_STATES[demoState]

    const statItems = [
        { label: "Goal aktif", value: currentData.stats.goalAktif },
        { label: "Atribut dimiliki", value: currentData.stats.atributDimiliki },
        { label: "Level 3 terbuka", value: currentData.stats.level3Terbuka },
        { label: "Notifikasi", value: currentData.stats.notifikasi },
    ]

    const goToGoalSelection = () => router.push("/team/goal")
    const goToCourse = () => router.push("/team/course")

    return {
        demoState,
        setDemoState,
        statItems,
        goals: currentData.goals,
        ownedAttributes: currentData.ownedAttributes,
        goToGoalSelection,
        goToCourse,
    }
}