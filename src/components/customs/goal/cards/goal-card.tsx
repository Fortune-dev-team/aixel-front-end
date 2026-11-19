"use client";

import { Button } from "@/components/ui/button";
import type { GoalAttribute } from "../interfaces";

interface GoalCardProps {
    attribute: GoalAttribute;
    isActive: boolean;
    onActivate: (attr: GoalAttribute) => void;
    onRequestDelete: (attr: GoalAttribute) => void;
}

export function GoalCard({
    attribute,
    isActive,
    onActivate,
    onRequestDelete,
}: GoalCardProps) {
    return (
        <div className="flex flex-col justify-between rounded-lg border-2 border-[#0A0A0A] bg-[#FDFCFA] p-4 shadow-[3px_3px_0_0_#0A0A0A]">
            <div>
                <div className="flex items-start justify-between gap-2">
                    <h2 className="font-mono text-sm font-bold text-[#0A0A0A]">
                        {attribute.title}
                    </h2>

                    {isActive && (
                        <span className="shrink-0 rounded-md border border-[#3B82F6] bg-[#DBEAFE] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#1D4ED8]">
                            Goal aktif
                        </span>
                    )}
                </div>

                <p className="mt-1 font-sans text-xs text-[#6B6B6B]">
                    {attribute.category}
                </p>
            </div>

            <div className="mt-4">
                {isActive ? (
                    <Button
                        size="sm"
                        onPress={() => onRequestDelete(attribute)}
                        className="cursor-pointer rounded-md border-2 border-[#0A0A0A] bg-white px-3 py-1.5 font-mono text-xs font-bold text-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A] transition-transform hover:bg-[#F5F5F4] active:translate-x-[1px] active:translate-y-[1px]"
                    >
                        Hapus goal
                    </Button>
                ) : (
                    <Button
                        variant="coral"
                        size="sm"
                        onPress={() => onActivate(attribute)}
                        className="cursor-pointer font-mono text-xs font-bold text-[#0A0A0A]"
                    >
                        Jadikan goal
                    </Button>
                )}
            </div>
        </div>
    );
}