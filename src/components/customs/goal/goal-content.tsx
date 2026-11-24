"use client";

import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/Toast";
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
                                variant="white"
                                size="sm"
                                onPress={() => setGoalToDelete(null)}
                                className="cursor-pointer"
                            >
                                Batal
                            </Button>
                            <Button
                                variant="red"
                                size="sm"
                                onPress={handleConfirmDelete}
                                className="cursor-pointer"
                            >
                                Hapus
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notifikasi */}
            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={dismissToast}
                    className="fixed right-5 bottom-5 z-50 min-w-[260px] font-mono"
                />
            )}
        </div>
    );
}
