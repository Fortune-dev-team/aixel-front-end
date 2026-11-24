"use client";

import { useSyncExternalStore } from "react";
import { COURSE_GOALS, INITIAL_GOAL_PROGRESS } from "./constants";
import type { GoalLevelProgress, LevelNumber, LevelStatus } from "./interfaces";

interface CourseStoreSnapshot {
    hasGoal: boolean;
    selectedGoalId: string;
    progressByGoal: Record<string, GoalLevelProgress>;
}

const DEFAULT_SNAPSHOT: CourseStoreSnapshot = {
    hasGoal: true,
    selectedGoalId: COURSE_GOALS[0].id,
    progressByGoal: INITIAL_GOAL_PROGRESS,
};

let currentSnapshot: CourseStoreSnapshot = DEFAULT_SNAPSHOT;
const listeners = new Set<() => void>();

function emitChange() {
    listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

function getSnapshot(): CourseStoreSnapshot {
    return currentSnapshot;
}

function getServerSnapshot(): CourseStoreSnapshot {
    return DEFAULT_SNAPSHOT;
}

export function setCourseGoalMode(hasGoal: boolean) {
    currentSnapshot = {
        ...currentSnapshot,
        hasGoal,
    };
    emitChange();
}

export function selectCourseGoal(goalId: string) {
    currentSnapshot = {
        ...currentSnapshot,
        hasGoal: true,
        selectedGoalId: goalId,
    };
    emitChange();
}

export function updateLevelStatus(
    goalId: string,
    level: LevelNumber,
    status: LevelStatus
) {
    const existing = currentSnapshot.progressByGoal[goalId] ?? {
        level1: "active",
        level2: "locked",
        level3: "locked",
    };

    const updated: GoalLevelProgress = { ...existing };

    if (level === 1) {
        updated.level1 = status;
        if (status === "passed" && updated.level2 === "locked") {
            updated.level2 = "active";
        }
    } else if (level === 2) {
        updated.level2 = status;
        if (status === "passed" && updated.level3 === "locked") {
            updated.level3 = "active";
        }
    } else if (level === 3) {
        updated.level3 = status;
    }

    currentSnapshot = {
        ...currentSnapshot,
        progressByGoal: {
            ...currentSnapshot.progressByGoal,
            [goalId]: updated,
        },
    };
    emitChange();
}

export function useCourseProgress() {
    const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const selectedGoal =
        COURSE_GOALS.find((g) => g.id === snapshot.selectedGoalId) ?? COURSE_GOALS[0];

    const progress = snapshot.progressByGoal[selectedGoal.id] ?? {
        level1: "active",
        level2: "locked",
        level3: "locked",
    };

    return {
        hasGoal: snapshot.hasGoal,
        selectedGoal,
        progress,
        setCourseGoalMode,
        selectCourseGoal,
        updateLevelStatus,
    };
}