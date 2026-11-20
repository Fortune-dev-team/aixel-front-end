"use client"

import { EmptyPermintaanCard } from "./cards/empty-card"
import { PermintaanCard } from "./cards/permintaan-card"
import type { PermintaanContentProps } from "./interfaces"
import { TolakPermintaanModal } from "./modals/tolak-modal"
import { UsulkanJadwalModal } from "./modals/usulkan-modal"
import { usePermintaan } from "./use-permintaan"
import { PermintaanHeader } from "./widgets/header"

export function PermintaanContent({
    initialItems,
    availableSlots,
    isLoading = false,
    onApprove,
    onReject,
    onProposeSchedule,
}: PermintaanContentProps) {
    const {
        items,
        availableSlots: slots,
        viewState,
        setViewState,
        isProcessing,
        rejectTarget,
        setRejectTarget,
        proposeTarget,
        setProposeTarget,
        handleApprove,
        handleReject,
        handleProposeSchedule,
    } = usePermintaan({
        initialItems,
        availableSlots,
        onApprove,
        onReject,
        onProposeSchedule,
    })

    return (
        <div className="w-full">
            <PermintaanHeader
                viewState={viewState}
                onViewStateChange={setViewState}
            />

            {!isLoading && items.length === 0 ? (
                <EmptyPermintaanCard />
            ) : (
                <div className="flex w-full flex-col gap-3.5">
                    {items.map((item) => (
                        <PermintaanCard
                            key={item.id}
                            data={item}
                            isProcessing={isProcessing}
                            onApprove={handleApprove}
                            onOpenReject={setRejectTarget}
                            onOpenPropose={setProposeTarget}
                        />
                    ))}
                </div>
            )}

            <TolakPermintaanModal
                item={rejectTarget}
                isOpen={Boolean(rejectTarget)}
                onOpenChange={(open) => {
                    if (!open) setRejectTarget(null)
                }}
                onSubmit={handleReject}
                isSubmitting={isProcessing}
            />

            <UsulkanJadwalModal
                item={proposeTarget}
                slots={slots}
                isOpen={Boolean(proposeTarget)}
                onOpenChange={(open) => {
                    if (!open) setProposeTarget(null)
                }}
                onSubmit={handleProposeSchedule}
                isSubmitting={isProcessing}
            />
        </div>
    )
}