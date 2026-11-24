"use client"

import { EmptyStateCard } from "./cards/empty-card"
import { JadwalCard } from "./cards/jadwal-card"
import type { JadwalWawancaraContentProps } from "./interfaces"
import { useJadwalWawancara } from "./use-jadwal-wawancara"
import { JadwalWawancaraHeader } from "./widgets/header"

export function JadwalWawancaraContent({
    initialItems,
    isLoading = false,
}: JadwalWawancaraContentProps) {
    const { items, viewState, setViewState } = useJadwalWawancara({
        initialItems,
    })

    return (
        <div className="w-full">
            <JadwalWawancaraHeader
                viewState={viewState}
                onViewStateChange={setViewState}
            />

            {!isLoading && items.length === 0 ? (
                <EmptyStateCard />
            ) : (
                <div className="flex w-full flex-col gap-3.5">
                    {items.map((item) => (
                        <JadwalCard key={item.id} data={item} />
                    ))}
                </div>
            )}
        </div>
    )
}