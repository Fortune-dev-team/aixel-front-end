"use client"

import { ProgressBar } from "@heroui/react"

interface GoalProgressBarProps {
    value: number
    label?: string
}

export function GoalProgressBar({
    value,
    label = "Progres goal",
}: GoalProgressBarProps) {
    const clamped = Math.max(0, Math.min(100, value))

    return (
        <ProgressBar
            aria-label={label}
            value={clamped}
            minValue={0}
            maxValue={100}
            className="w-24"
        >
            <ProgressBar.Track className="h-2.5 overflow-hidden rounded-[3px] border border-[#0A0A0A] bg-[#FDFCFA]">
                <ProgressBar.Fill className="h-full bg-[#FF5722] transition-all duration-300" />
            </ProgressBar.Track>
        </ProgressBar>
    )
}