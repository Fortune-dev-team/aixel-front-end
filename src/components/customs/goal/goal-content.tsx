"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GOAL_ATTRIBUTES } from "./constants";
import { useGoal } from "./use-goal";
import { GoalHeader } from "./widgets/goal-header";
import { GoalCard } from "./cards/goal-card";

export function GoalContent() {
    const {
        activeGoalIds,
        goalToDelete,
        setGoalToDelete,
        toast,
        dismissToast,
        handleActivateGoal,
        handleConfirmDelete,
    } = useGoal();

    return (
        <div className="w-full">
            <GoalHeader />

            {/* Grid 3 Kartu Atribut Goal */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {GOAL_ATTRIBUTES.map((attr) => (
                    <GoalCard
                        key={attr.id}
                        attribute={attr}
                        isActive={activeGoalIds.includes(attr.id)}
                        onActivate={handleActivateGoal}
                        onRequestDelete={setGoalToDelete}
                    />
                ))}
            </div>

            {/* Modal Konfirmasi Hapus Goal */}
            {goalToDelete && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-konfirmasi-title"
                >
                    <div className="w-full max-w-md rounded-lg border-2 border-[#0A0A0A] bg-[#FDFCFA] p-5 shadow-[4px_4px_0_0_#0A0A0A]">
                        <div className="flex items-start justify-between gap-3">
                            <h3
                                id="modal-konfirmasi-title"
                                className="font-mono text-base font-bold text-[#0A0A0A]"
                            >
                                Konfirmasi
                            </h3>
                            <button
                                type="button"
                                onClick={() => setGoalToDelete(null)}
                                aria-label="Tutup modal"
                                className="cursor-pointer rounded p-0.5 text-[#0A0A0A] transition-colors hover:bg-black/5"
                            >
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <p className="mt-2 font-sans text-xs text-[#404040] sm:text-sm">
                            Hapus goal {goalToDelete.title}? Progres goal ini ikut hilang.
                        </p>

                        <div className="mt-5 flex items-center gap-2.5">
                            <Button
                                size="sm"
                                onPress={() => setGoalToDelete(null)}
                                className="cursor-pointer rounded-md border-2 border-[#0A0A0A] bg-white px-3.5 py-1.5 font-mono text-xs font-bold text-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A] hover:bg-[#F5F5F4]"
                            >
                                Batal
                            </Button>
                            <Button
                                size="sm"
                                onPress={handleConfirmDelete}
                                className="cursor-pointer rounded-md border-2 border-[#0A0A0A] bg-[#EF4444] px-3.5 py-1.5 font-mono text-xs font-bold text-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A] hover:bg-[#DC2626]"
                            >
                                Hapus
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Right-Bottom Toast */}
            {toast && (
                <div
                    role="status"
                    aria-live="polite"
                    className={cn(
                        "fixed bottom-5 right-5 z-50 flex min-w-[260px] items-center justify-between gap-4 rounded-md border border-[#0A0A0A] border-b-[3px] bg-[#141414] px-3.5 py-2.5 font-mono text-xs text-white shadow-[3px_3px_0_0_#0A0A0A]",
                        toast.type === "success" ? "border-b-[#22C55E]" : "border-b-[#EF4444]"
                    )}
                >
                    <div className="flex items-center gap-2.5">
                        {toast.type === "success" ? (
                            <svg
                                className="h-4 w-4 shrink-0 text-[#22C55E]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg
                                className="h-4 w-4 shrink-0 text-[#EF4444]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                                />
                            </svg>
                        )}
                        <span>{toast.message}</span>
                    </div>

                    <button
                        type="button"
                        onClick={dismissToast}
                        aria-label="Tutup notifikasi"
                        className="cursor-pointer text-white/70 transition-colors hover:text-white"
                    >
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}