"use client"

import { EmptyKandidatCard } from "./cards/empty-card"
import { RingkasanTableCard } from "./cards/table-card"
import { KandidatSelect } from "./inputs/select"
import type { RingkasanKandidatContentProps } from "./interfaces"
import { useRingkasanKandidat } from "./use-ringkasan-kandidat"
import { RingkasanKandidatHeader } from "./widgets/header"

export function RingkasanKandidatContent({
    initialCandidates,
    defaultSelectedId,
    onSelectCandidate,
}: RingkasanKandidatContentProps) {
    const {
        viewState,
        setViewState,
        candidates,
        selectedId,
        activeDetail,
        isLoadingDetail,
        handleSelectCandidate,
    } = useRingkasanKandidat({
        initialCandidates,
        defaultSelectedId,
        onSelectCandidate,
    })

    return (
        <div className="w-full">
            <RingkasanKandidatHeader
                viewState={viewState}
                onViewStateChange={setViewState}
            />

            {candidates.length === 0 ? (
                <EmptyKandidatCard />
            ) : (
                <div className="flex w-full flex-col gap-4">
                    <KandidatSelect
                        candidates={candidates}
                        selectedId={selectedId}
                        onChange={handleSelectCandidate}
                        isDisabled={isLoadingDetail}
                    />

                    <RingkasanTableCard
                        detail={activeDetail}
                        isLoading={isLoadingDetail}
                    />
                </div>
            )}
        </div>
    )
}