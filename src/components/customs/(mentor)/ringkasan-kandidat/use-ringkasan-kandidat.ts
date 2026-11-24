"use client"

import * as React from "react"
import { MOCK_KANDIDAT_RINGKASAN } from "./constants"
import type {
    KandidatRingkasanDetail,
    RingkasanViewState,
} from "./interfaces"

interface UseRingkasanKandidatOptions {
    initialCandidates?: KandidatRingkasanDetail[]
    defaultSelectedId?: string
    onSelectCandidate?: (
        kandidatId: string
    ) => Promise<KandidatRingkasanDetail | null> | KandidatRingkasanDetail | null
}

export function useRingkasanKandidat({
    initialCandidates = MOCK_KANDIDAT_RINGKASAN,
    defaultSelectedId = "",
    onSelectCandidate,
}: UseRingkasanKandidatOptions = {}) {
    const [candidates, setCandidates] =
        React.useState<KandidatRingkasanDetail[]>(initialCandidates)
    const [viewState, setViewState] = React.useState<RingkasanViewState>(
        initialCandidates.length > 0 ? "active" : "empty"
    )
    const [selectedId, setSelectedId] = React.useState<string>(defaultSelectedId)
    const [activeDetail, setActiveDetail] =
        React.useState<KandidatRingkasanDetail | null>(() =>
            defaultSelectedId
                ? initialCandidates.find((c) => c.id === defaultSelectedId) ?? null
                : null
        )
    const [isLoadingDetail, setIsLoadingDetail] = React.useState(false)

    // Sync when backend data arrives asynchronously
    React.useEffect(() => {
        setCandidates(initialCandidates)
        setViewState(initialCandidates.length > 0 ? "active" : "empty")
    }, [initialCandidates])

    const handleViewStateChange = (nextState: RingkasanViewState) => {
        setViewState(nextState)
        if (nextState === "empty") {
            setCandidates([])
            setSelectedId("")
            setActiveDetail(null)
        } else {
            const source =
                initialCandidates.length > 0
                    ? initialCandidates
                    : MOCK_KANDIDAT_RINGKASAN
            setCandidates(source)
        }
    }

    const handleSelectCandidate = async (kandidatId: string) => {
        setSelectedId(kandidatId)

        if (!kandidatId) {
            setActiveDetail(null)
            return
        }

        const cached = candidates.find((c) => c.id === kandidatId) ?? null

        if (!onSelectCandidate) {
            setActiveDetail(cached)
            return
        }

        try {
            setIsLoadingDetail(true)
            const fetched = await onSelectCandidate(kandidatId)
            setActiveDetail(fetched ?? cached)
        } finally {
            setIsLoadingDetail(false)
        }
    }

    return {
        viewState,
        setViewState: handleViewStateChange,
        candidates,
        selectedId,
        activeDetail,
        isLoadingDetail,
        handleSelectCandidate,
    }
}