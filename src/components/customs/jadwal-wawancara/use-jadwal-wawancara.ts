"use client"

import * as React from "react"
import { MOCK_JADWAL_WAWANCARA } from "./constants"
import type { JadwalViewState, JadwalWawancaraItem } from "./interfaces"

interface UseJadwalWawancaraOptions {
    initialItems?: JadwalWawancaraItem[]
}

export function useJadwalWawancara({
    initialItems = MOCK_JADWAL_WAWANCARA,
}: UseJadwalWawancaraOptions = {}) {
    const [items, setItems] =
        React.useState<JadwalWawancaraItem[]>(initialItems)
    const [viewState, setViewState] = React.useState<JadwalViewState>(
        initialItems.length > 0 ? "active" : "empty"
    )

    React.useEffect(() => {
        setItems(initialItems)
        setViewState(initialItems.length > 0 ? "active" : "empty")
    }, [initialItems])

    const handleViewStateChange = (nextState: JadwalViewState) => {
        setViewState(nextState)
        if (nextState === "empty") {
            setItems([])
        } else {
            setItems(
                initialItems.length > 0 ? initialItems : MOCK_JADWAL_WAWANCARA
            )
        }
    }

    return {
        items,
        viewState,
        setViewState: handleViewStateChange,
    }
}