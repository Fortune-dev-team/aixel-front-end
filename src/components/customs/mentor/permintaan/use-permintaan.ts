"use client"

import * as React from "react"
import { toast } from "@heroui/react"
import { PERMINTAAN_STATES } from "./constants"
import type {
    PermintaanDemoState,
    PermintaanRow,
    PermintaanStatus,
} from "./interfaces"

export function usePermintaan() {
    const [demoState, setDemoState] =
        React.useState<PermintaanDemoState>("pending")
    const [rows, setRows] = React.useState<PermintaanRow[]>(
        PERMINTAAN_STATES.pending
    )
    const [rejectTarget, setRejectTarget] = React.useState<PermintaanRow | null>(
        null
    )
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const handleDemoStateChange = (nextState: PermintaanDemoState) => {
        setDemoState(nextState)
        setRows(PERMINTAAN_STATES[nextState])
    }

    const updateRowStatus = (id: string, status: PermintaanStatus) => {
        setRows((prev) =>
            prev.map((row) => (row.id === id ? { ...row, status } : row))
        )
    }

    const handleAccept = async (id: string) => {
        try {
            setIsSubmitting(true)
            // Replace with API call: await fetch(`/api/mentor/permintaan/${id}`, { method: "PATCH", ... })
            updateRowStatus(id, "Diterima")
            toast.success("Permintaan diterima.", { timeout: 4000 })
        } catch {
            toast.danger("Gagal memproses permintaan.", { timeout: 4000 })
        } finally {
            setIsSubmitting(false)
        }
    }

    const openRejectModal = (id: string) => {
        const found = rows.find((row) => row.id === id) ?? null
        setRejectTarget(found)
    }

    const closeRejectModal = () => {
        if (!isSubmitting) setRejectTarget(null)
    }

    const handleRejectSubmit = async (id: string, reason: string) => {
        try {
            setIsSubmitting(true)
            // Replace with API call: await fetch(`/api/mentor/permintaan/${id}`, { method: "PATCH", body: JSON.stringify({ status: "Ditolak", reason }) })
            void reason
            updateRowStatus(id, "Ditolak")
            setRejectTarget(null)
            toast.success("Permintaan ditolak.", { timeout: 4000 })
        } catch {
            toast.danger("Gagal memproses permintaan.", { timeout: 4000 })
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        demoState,
        setDemoState: handleDemoStateChange,
        rows,
        rejectTarget,
        isSubmitting,
        handleAccept,
        openRejectModal,
        closeRejectModal,
        handleRejectSubmit,
    }
}