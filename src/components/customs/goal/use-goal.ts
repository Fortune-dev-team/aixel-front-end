"use client";

import * as React from "react";
import type { GoalAttribute, GoalToastState } from "./interfaces";

export function useGoal() {
    const [activeGoalIds, setActiveGoalIds] = React.useState<string[]>([]);
    const [goalToDelete, setGoalToDelete] = React.useState<GoalAttribute | null>(null);
    const [toast, setToast] = React.useState<GoalToastState | null>(null);

    const showToast = React.useCallback((type: "success" | "error", message: string) => {
        setToast({ id: Date.now(), type, message });
    }, []);

    const dismissToast = React.useCallback(() => {
        setToast(null);
    }, []);

    React.useEffect(() => {
        if (!toast) return;
        const timer = window.setTimeout(() => setToast(null), 3500);
        return () => window.clearTimeout(timer);
    }, [toast]);

    const handleActivateGoal = (attr: GoalAttribute) => {
        if (activeGoalIds.includes(attr.id)) {
            showToast("error", "Goal gagal ditambahkan.");
            return;
        }

        setActiveGoalIds((prev) => [...prev, attr.id]);
        showToast("success", "Goal ditambahkan.");
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
        toast,
        dismissToast,
        handleActivateGoal,
        handleConfirmDelete,
    };
}