"use client"

import * as React from "react"
import { MOCK_NOTIFIKASI_ITEMS } from "./constants"
import type { NotifikasiItem, NotifikasiViewState } from "./interfaces"

interface UseNotifikasiOptions {
    initialItems?: NotifikasiItem[]
    onDismissItem?: (id: string) => Promise<void> | void
    onMarkAllRead?: () => Promise<void> | void
}

export function useNotifikasi({
    initialItems = MOCK_NOTIFIKASI_ITEMS,
    onDismissItem,
    onMarkAllRead,
}: UseNotifikasiOptions = {}) {
    const [items, setItems] = React.useState<NotifikasiItem[]>(initialItems)
    const [viewState, setViewState] = React.useState<NotifikasiViewState>(
        initialItems.length > 0 ? "active" : "empty"
    )
    const [isProcessing, setIsProcessing] = React.useState(false)

    // Sinkronisasi otomatis ketika data dari backend diperbarui
    React.useEffect(() => {
        setItems(initialItems)
        setViewState(initialItems.length > 0 ? "active" : "empty")
    }, [initialItems])

    const handleViewStateChange = (nextState: NotifikasiViewState) => {
        setViewState(nextState)
        if (nextState === "empty") {
            setItems([])
        } else {
            setItems(initialItems.length > 0 ? initialItems : MOCK_NOTIFIKASI_ITEMS)
        }
    }

    const handleDismiss = async (id: string) => {
        try {
            setIsProcessing(true)
            await onDismissItem?.(id)

            setItems((prev) => {
                const remaining = prev.filter((item) => item.id !== id)
                if (remaining.length === 0) setViewState("empty")
                return remaining
            })
        } finally {
            setIsProcessing(false)
        }
    }

    const handleMarkAllRead = async () => {
        try {
            setIsProcessing(true)
            await onMarkAllRead?.()

            setItems([])
            setViewState("empty")
        } finally {
            setIsProcessing(false)
        }
    }

    return {
        items,
        viewState,
        setViewState: handleViewStateChange,
        isProcessing,
        handleDismiss,
        handleMarkAllRead,
    }
}