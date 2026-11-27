"use client";

import * as React from "react";
import { toast } from "@heroui/react";
import type { GoalAttribute } from "./interfaces";

export function useGoal() {
    const [activeGoalIds, setActiveGoalIds] = React.useState<string[]>([]);
    const [goalToDelete, setGoalToDelete] = React.useState<GoalAttribute | null>(null);

    const handleActivateGoal = (attr: GoalAttribute) => {
        if (activeGoalIds.includes(attr.id)) {
            toast.danger("Goal gagal ditambahkan.", { timeout: 3500 });
            return;
        }

        setActiveGoalIds((prev) => [...prev, attr.id]);
        toast.success("Goal ditambahkan.", { timeout: 3500 });
    };

    const handleConfirmDelete = () => {
        if (!goalToDelete) return;
        setActiveGoalIds((prev) => prev.filter((id) => id !== goalToDelete.id));
        setGoalToDelete(null);
    };

    return {
        activeGoalIds,
        goalToDelete,
        setGoalToDelete,
        handleActivateGoal,
        handleConfirmDelete,
    };
}
