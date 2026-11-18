"use client"

import { TolakPermintaanModal } from "./modals/reject-modal"
import { PermintaanTable } from "./tables/table"
import { usePermintaan } from "./use-permintaan"
import { PermintaanHeader } from "./widgets/header"
import { PermintaanToast } from "./widgets/toast"

export function PermintaanContent() {
    const {
        demoState,
        setDemoState,
        rows,
        rejectTarget,
        isSubmitting,
        handleAccept,
        openRejectModal,
        closeRejectModal,
        handleRejectSubmit,
    } = usePermintaan()

    return (
        <div className="w-full">
            <PermintaanHeader
                demoState={demoState}
                onDemoStateChange={setDemoState}
            />

            <PermintaanTable
                rows={rows}
                onAccept={handleAccept}
                onReject={openRejectModal}
            />

            <TolakPermintaanModal
                target={rejectTarget}
                isOpen={Boolean(rejectTarget)}
                isSubmitting={isSubmitting}
                onClose={closeRejectModal}
                onSubmit={handleRejectSubmit}
            />

            <PermintaanToast />
        </div>
    )
}