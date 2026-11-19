"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { GoalCardProps } from "../interfaces"

export function GoalCard({ goal, isSelected, onToggleSelect }: GoalCardProps) {
    return (
        <div
            className={cn(
                "flex flex-col justify-between rounded-lg border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 transition-all duration-150",
                isSelected
                    ? "shadow-[4px_4px_0_0_#FF5722]"
                    : "shadow-[3px_3px_0_0_#0A0A0A] hover:-translate-x-0.5 hover:-translate-y-0.5"
            )}
        >
            <div>
                <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md border border-[#0A0A0A] bg-[#F5F5F2] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0A0A0A]">
                        {goal.category}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#FF5722]">
                        {goal.level}
                    </span>
                </div>

                <h3 className="mt-3 font-heading text-base font-extrabold text-[#0A0A0A]">
                    {goal.title}
                </h3>

                <p className="mt-2 font-sans text-xs text-[#404040] leading-relaxed">
                    {goal.description}
                </p>

                {goal.recommendedFor && (
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-[#15803D] bg-[#DCFCE7] px-2 py-0.5 font-mono text-[10px] font-medium text-[#166534]">
                        <span>★</span>
                        <span>{goal.recommendedFor}</span>
                    </div>
                )}

                <div className="mt-4 flex flex-wrap gap-1.5">
                    {goal.targetAttributes.map((attr) => (
                        <span
                            key={attr}
                            className="rounded border border-[#0A0A0A]/40 bg-[#F5F5F2] px-2 py-0.5 font-mono text-[10px] text-[#262626]"
                        >
                            {attr}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-5 border-t border-[#0A0A0A]/10 pt-4">
                <Button
                    variant={isSelected ? "black" : "white"}
                    size="sm"
                    onPress={() => onToggleSelect(goal.id)}
                    className="w-full cursor-pointer justify-center font-mono text-xs font-bold"
                >
                    {isSelected ? "Terpilih ✓" : "Pilih Goal"}
                </Button>
            </div>
        </div>
    )
}
