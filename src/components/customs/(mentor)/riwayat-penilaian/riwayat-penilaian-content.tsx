"use client"

import { EmptyRiwayatCard } from "./cards/empty-card"
import { RiwayatTableCard } from "./cards/table-card"
import type { RiwayatPenilaianContentProps } from "./interfaces"
import { useRiwayatPenilaian } from "./use-riwayat-penilaian"
import { RiwayatPenilaianHeader } from "./widgets/header"

export function RiwayatPenilaianContent({
    initialItems,
    isLoading = false,
}: RiwayatPenilaianContentProps) {
    const { items, viewState, setViewState } = useRiwayatPenilaian({
        initialItems,
    })

    return (
        <div className="w-full">
            <RiwayatPenilaianHeader
                viewState={viewState}
                onViewStateChange={setViewState}
            />

            {!isLoading && items.length === 0 ? (
                <EmptyRiwayatCard />
            ) : (
                <RiwayatTableCard items={items} isLoading={isLoading} />
            )}
        </div>
    )
}