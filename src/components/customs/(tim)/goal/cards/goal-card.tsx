"use client";

import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/Chip";
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
                        <Chip variant="blue" className="shrink-0">
                            Goal aktif
                        </Chip>
                    )}
                </div>

                <p className="mt-1 font-sans text-xs text-[#6B6B6B]">
                    {attribute.category}
                </p>
            </div>

            <div className="mt-4">
                {isActive ? (
                    <Button
                        variant="white"
                        size="sm"
                        onPress={() => onRequestDelete(attribute)}
                        className="cursor-pointer"
                    >
                        Hapus goal
                    </Button>
                ) : (
                    <Button
                        variant="coral"
                        size="sm"
                        onPress={() => onActivate(attribute)}
                        className="cursor-pointer text-[#0A0A0A]"
                    >
                        Jadikan goal
                    </Button>
                )}
            </div>
        </div>
    );
}
