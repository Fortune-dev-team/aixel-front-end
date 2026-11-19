"use client"

import * as React from "react"
import { MOCK_RIWAYAT_PENILAIAN } from "./constants"
import type {
    RiwayatPenilaianItem,
    RiwayatViewState,
} from "./interfaces"

interface UseRiwayatPenilaianOptions {
    initialItems?: RiwayatPenilaianItem[]
}

export function useRiwayatPenilaian({
    initialItems = MOCK_RIWAYAT_PENILAIAN,
}: UseRiwayatPenilaianOptions = {}) {
    const [items, setItems] =
        React.useState<RiwayatPenilaianItem[]>(initialItems)
    const [viewState, setViewState] = React.useState<RiwayatViewState>(
        initialItems.length > 0 ? "active" : "empty"
    )

    // Sync when backend data arrives asynchronously
    React.useEffect(() => {
        setItems(initialItems)
        setViewState(initialItems.length > 0 ? "active" : "empty")
    }, [initialItems])

    const handleViewStateChange = (nextState: RiwayatViewState) => {
        setViewState(nextState)
        if (nextState === "empty") {
            setItems([])
        } else {
            setItems(
                initialItems.length > 0 ? initialItems : MOCK_RIWAYAT_PENILAIAN
            )
        }
    }

    return {
        items,
        viewState,
        setViewState: handleViewStateChange,
    }
}