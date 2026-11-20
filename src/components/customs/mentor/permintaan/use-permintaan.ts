"use client"

import * as React from "react"
import { toast } from "@heroui/react"
import { DEFAULT_JADWAL_SLOTS, MOCK_PERMINTAAN_ITEMS } from "./constants"
import type {
    JadwalSlotOption,
    PermintaanItem,
    PermintaanViewState,
} from "./interfaces"

interface UsePermintaanOptions {
    initialItems?: PermintaanItem[]
    availableSlots?: JadwalSlotOption[]
    onApprove?: (id: string) => Promise<void> | void
    onReject?: (id: string, alasan: string) => Promise<void> | void
    onProposeSchedule?: (id: string, slotId: string) => Promise<void> | void
}

export function usePermintaan({
    initialItems = MOCK_PERMINTAAN_ITEMS,
    availableSlots = DEFAULT_JADWAL_SLOTS,
    onApprove,
    onReject,
    onProposeSchedule,
}: UsePermintaanOptions = {}) {
    const [items, setItems] = React.useState<PermintaanItem[]>(initialItems)
    const [viewState, setViewState] = React.useState<PermintaanViewState>(
        initialItems.length > 0 ? "active" : "empty"
    )
    const [isProcessing, setIsProcessing] = React.useState(false)

    const [rejectTarget, setRejectTarget] =
        React.useState<PermintaanItem | null>(null)
    const [proposeTarget, setProposeTarget] =
        React.useState<PermintaanItem | null>(null)

    React.useEffect(() => {
        setItems(initialItems)
        setViewState(initialItems.length > 0 ? "active" : "empty")
    }, [initialItems])

    const handleViewStateChange = (nextState: PermintaanViewState) => {
        setViewState(nextState)
        if (nextState === "empty") {
            setItems([])
        } else {
            setItems(initialItems.length > 0 ? initialItems : MOCK_PERMINTAAN_ITEMS)
        }
    }

    const handleApprove = async (id: string) => {
        try {
            setIsProcessing(true)
            await onApprove?.(id)

            setItems((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, status: "Dijadwalkan" } : item
                )
            )
            toast("Permintaan jadwal disetujui.", { variant: "success" })
        } catch {
            toast("Gagal menyetujui permintaan.", { variant: "danger" })
        } finally {
            setIsProcessing(false)
        }
    }

    const handleReject = async (id: string, alasan: string): Promise<boolean> => {
        try {
            setIsProcessing(true)
            await onReject?.(id, alasan)

            setItems((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, status: "Ditolak" } : item
                )
            )
            toast("Permintaan jadwal ditolak.", { variant: "success" })
            return true
        } catch {
            toast("Gagal menolak permintaan.", { variant: "danger" })
            return false
        } finally {
            setIsProcessing(false)
        }
    }

    const handleProposeSchedule = async (
        id: string,
        slotId: string
    ): Promise<boolean> => {
        try {
            setIsProcessing(true)
            await onProposeSchedule?.(id, slotId)

            const chosenSlot = availableSlots.find((s) => s.id === slotId)
            setItems((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            jadwalDiajukan: chosenSlot?.label ?? item.jadwalDiajukan,
                            status: "Menunggu respon",
                        }
                        : item
                )
            )
            toast("Usulan jadwal lain berhasil dikirim.", { variant: "success" })
            return true
        } catch {
            toast("Gagal mengusulkan jadwal lain.", { variant: "danger" })
            return false
        } finally {
            setIsProcessing(false)
        }
    }

    return {
        items,
        availableSlots,
        viewState,
        setViewState: handleViewStateChange,
        isProcessing,
        rejectTarget,
        setRejectTarget,
        proposeTarget,
        setProposeTarget,
        handleApprove,
        handleReject,
        handleProposeSchedule,
    }
}