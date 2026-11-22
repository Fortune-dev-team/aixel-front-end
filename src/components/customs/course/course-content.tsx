"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { COURSE_GOALS, LEVEL_METADATA } from "./constants";
import type { LevelStatus } from "./interfaces";
import { useCourseProgress } from "./use-course-progress";
import { CourseHeader } from "./widgets/course-header";

function getBadgeConfig(status: LevelStatus) {
    switch (status) {
        case "passed":
            return {
                label: "Lulus",
                className: "border-[#16A34A] bg-[#DCFCE7] text-[#15803D]",
            };
        case "active":
        case "in_progress":
            return {
                label: "Aktif",
                className: "border-[#3B82F6] bg-[#DBEAFE] text-[#1D4ED8]",
            };
        default:
            return {
                label: "Terkunci",
                className: "border-[#A3A3A3] bg-[#F5F5F4] text-[#525252]",
            };
    }
}

export function CourseContent() {
    const router = useRouter();
    const {
        hasGoal,
        selectedGoal,
        progress,
        selectCourseGoal,
        setCourseGoalMode,
    } = useCourseProgress();

    return (
        <div className="w-full">
            <CourseHeader
                title="Course"
                subtitle="Level harus berurutan. Tidak ada batas waktu belajar, progres tersimpan."
            />

            {!hasGoal ? (
                <div className="flex min-h-[160px] flex-col items-center justify-center rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-6 text-center shadow-[3px_3px_0_0_#0A0A0A]">
                    <p className="font-sans text-xs text-[#6B6B6B] sm:text-sm">
                        Belum ada goal aktif. Pilih goal dulu.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                        <Button
                            variant="coral"
                            size="sm"
                            onPress={() => router.push("/team/goal")}
                        >
                            Pilih goal
                        </Button>
                        <Button
                            variant="white"
                            size="sm"
                            onPress={() => setCourseGoalMode(true)}
                        >
                            Tampilkan daftar course
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    {/* Dropdown Pemilih Goal */}
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div className="relative w-full max-w-[220px]">
                            <select
                                aria-label="Pilih goal aktif"
                                value={selectedGoal.id}
                                onChange={(e) => {
                                    if (e.target.value === "__empty__") {
                                        setCourseGoalMode(false);
                                        return;
                                    }
                                    selectCourseGoal(e.target.value);
                                }}
                                className="w-full cursor-pointer appearance-none rounded-lg border-2 border-[#0A0A0A] bg-[#FDFCFA] px-3 py-2 pr-8 font-mono text-xs font-semibold text-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A] focus:outline-none"
                            >
                                {COURSE_GOALS.map((goal) => (
                                    <option key={goal.id} value={goal.id}>
                                        {goal.title}
                                    </option>
                                ))}
                                <option value="__empty__">— Simulasi tanpa goal —</option>
                            </select>
                            <svg
                                className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-[#0A0A0A]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 9l6 6 6-6"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Grid 3 Kartu Level */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {LEVEL_METADATA.map((item) => {
                            const status = progress[item.key];
                            const badge = getBadgeConfig(status);
                            const isLocked = status === "locked";

                            return (
                                <div
                                    key={item.level}
                                    className={cn(
                                        "flex flex-col justify-between rounded-xl border-2 border-[#0A0A0A] bg-[#FDFCFA] p-4 shadow-[3px_3px_0_0_#0A0A0A]",
                                        isLocked && "opacity-75"
                                    )}
                                >
                                    <div>
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <h2 className="font-mono text-sm font-bold text-[#0A0A0A]">
                                                    {item.title}
                                                </h2>
                                                <p className="font-sans text-xs font-medium text-[#525252]">
                                                    {item.subtitle}
                                                </p>
                                            </div>

                                            <span
                                                className={cn(
                                                    "shrink-0 rounded-md border px-2 py-0.5 font-mono text-[11px] font-semibold",
                                                    badge.className
                                                )}
                                            >
                                                {badge.label}
                                            </span>
                                        </div>

                                        <p className="mt-3 font-sans text-xs leading-relaxed text-[#6B6B6B]">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="mt-5">
                                        {isLocked ? (
                                            <Button
                                                variant="white"
                                                size="sm"
                                                className="pointer-events-none opacity-60 select-none"
                                            >
                                                Terkunci
                                            </Button>
                                        ) : status === "passed" ? (
                                            <Button
                                                variant="white"
                                                size="sm"
                                                onPress={() => router.push(item.href)}
                                            >
                                                Lihat detail
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="coral"
                                                size="sm"
                                                onPress={() => router.push(item.href)}
                                            >
                                                {item.level === 3
                                                    ? "Pilih jadwal"
                                                    : status === "in_progress"
                                                        ? "Lanjutkan"
                                                        : "Mulai"}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}