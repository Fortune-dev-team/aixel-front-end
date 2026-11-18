"use client"

import { PermintaanTable } from "../tables/table"
import { usePermintaan } from "../use-permintaan"
import { PermintaanHeader } from "../widgets/header"

export function PermintaanContent() {
    const { demoState, setDemoState, rows, handleAccept, handleRejectSubmit } =
        usePermintaan()

    return (
        <div className="w-full">
            <PermintaanHeader
                demoState={demoState}
                onDemoStateChange={setDemoState}
            />

            <PermintaanTable
                rows={rows}
                onAccept={handleAccept}
                onReject={handleRejectSubmit}
            />
        </div>
    )
}