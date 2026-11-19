"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { AVAILABLE_GOALS } from "./constants"

export function useGoal() {
    const router = useRouter()
    const [selectedGoalId, setSelectedGoalId] = React.useState<string | null>(
        AVAILABLE_GOALS[0].id
    )

    const toggleSelectGoal = (id: string) => {
        setSelectedGoalId((prev) => (prev === id ? null : id))
    }

    const handleConfirmGoal = () => {
        if (selectedGoalId) {
            router.push("/team/dashboard")
        }
    }

    return {
        goals: AVAILABLE_GOALS,
        selectedGoalId,
        toggleSelectGoal,
        handleConfirmGoal,
    }
}
