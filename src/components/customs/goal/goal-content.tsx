"use client"

import { Button } from "@/components/ui/button"
import { GoalHeader } from "./widgets/goal-header"
import { GoalCard } from "./cards/goal-card"
import { useGoal } from "./use-goal"

export function GoalContent() {
    const { goals, selectedGoalId, toggleSelectGoal, handleConfirmGoal } = useGoal()

    return (
        <div className="w-full">
            <GoalHeader />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {goals.map((goal) => (
                    <GoalCard
                        key={goal.id}
                        goal={goal}
                        isSelected={selectedGoalId === goal.id}
                        onToggleSelect={toggleSelectGoal}
                    />
                ))}
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#0A0A0A]/20 pt-4">
                <Button
                    variant="coral"
                    size="sm"
                    onPress={handleConfirmGoal}
                    className="cursor-pointer font-mono font-bold text-[#0A0A0A]"
                >
                    Simpan Goal & Lanjutkan
                </Button>
            </div>
        </div>
    )
}
