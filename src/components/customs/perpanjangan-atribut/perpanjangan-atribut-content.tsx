"use client";

import { cn } from "@/lib/utils";
import { UploadRenewalModal } from "./modals/upload-renewal-modal";
import { PerpanjanganTable } from "./tables/perpanjangan-table";
import { usePerpanjanganAtribut } from "./use-perpanjangan-atribut";
import { PerpanjanganHeader } from "./widgets/perpanjangan-header";
import { PerpanjanganToast } from "./widgets/perpanjangan-toast";

export function PerpanjanganAtributContent() {
    const {
        items,
        selectedItem,
        toast,
        dismissToast,
        handleOpenUploadModal,
        handleCloseUploadModal,
        handleSubmitProof,
        simulateKomunikasiStatus,
    } = usePerpanjanganAtribut();

    const komunikasiStatus = items.find((i) => i.id === "komunikasi")?.status;

    return (
        <div className="w-full">
            <PerpanjanganHeader />

            <PerpanjanganTable
                items={items}
                onUploadClick={handleOpenUploadModal}
            />

            {/* Kontrol Simulasi Status Wireframe untuk Preview */}
            <div className="mt-6 flex flex-wrap items-center gap-2 rounded-lg border border-dashed border-[#0A0A0A]/40 bg-[#FDFCFA] px-3.5 py-2.5">
                <span className="font-mono text-[11px] font-semibold text-[#525252]">
                    Simulasi status Komunikasi:
                </span>
                {(
                    [
                        { key: "expiring_soon", label: "Hampir habis" },
                        { key: "pending_review", label: "Menunggu tinjauan" },
                        { key: "active", label: "Aktif" },
                        { key: "rejected", label: "Ditolak" },
                    ] as const
                ).map((opt) => (
                    <button
                        key={opt.key}
                        type="button"
                        onClick={() => simulateKomunikasiStatus(opt.key)}
                        className={cn(
                            "cursor-pointer rounded border px-2 py-0.5 font-mono text-[11px] transition-colors",
                            komunikasiStatus === opt.key
                                ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                                : "border-[#0A0A0A]/30 bg-white text-[#0A0A0A] hover:bg-[#EFEFEB]"
                        )}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>

            {/* Modal Unggah Bukti Perpanjangan */}
            <UploadRenewalModal
                item={selectedItem}
                onClose={handleCloseUploadModal}
                onSubmit={handleSubmitProof}
            />

            {/* Right-Bottom Toast */}
            <PerpanjanganToast toast={toast} onDismiss={dismissToast} />
        </div>
    );
}