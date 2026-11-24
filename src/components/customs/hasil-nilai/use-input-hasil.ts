"use client"

import * as React from "react"
import { toast } from "@heroui/react"
import { DEFAULT_FORM_VALUES, MOCK_KANDIDAT_SESI } from "./constants"
import type {
    InputHasilFormErrors,
    InputHasilFormValues,
    InputHasilViewState,
    KandidatSesi,
    SubmitPenilaianPayload,
} from "./interfaces"

interface UseInputHasilProps {
    initialCandidates?: KandidatSesi[]
    onSubmitPenilaian?: (payload: SubmitPenilaianPayload) => Promise<void> | void
}

export function useInputHasil({
    initialCandidates = MOCK_KANDIDAT_SESI,
    onSubmitPenilaian,
}: UseInputHasilProps = {}) {
    const [candidates, setCandidates] =
        React.useState<KandidatSesi[]>(initialCandidates)
    const [viewState, setViewState] = React.useState<InputHasilViewState>(
        initialCandidates.length > 0 ? "active" : "empty"
    )
    const [values, setValues] =
        React.useState<InputHasilFormValues>(DEFAULT_FORM_VALUES)
    const [errors, setErrors] = React.useState<InputHasilFormErrors>({})
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    React.useEffect(() => {
        setCandidates(initialCandidates)
        setViewState(initialCandidates.length > 0 ? "active" : "empty")
    }, [initialCandidates])

    const handleViewStateChange = (nextState: InputHasilViewState) => {
        setViewState(nextState)
        setErrors({})
        if (nextState === "empty") {
            setCandidates([])
        } else {
            setCandidates(
                initialCandidates.length > 0 ? initialCandidates : MOCK_KANDIDAT_SESI
            )
        }
    }

    const handleFieldChange = <K extends keyof InputHasilFormValues>(
        field: K,
        value: InputHasilFormValues[K]
    ) => {
        setValues((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => {
                const next = { ...prev }
                delete next[field]
                return next
            })
        }
    }

    const validate = (): boolean => {
        const nextErrors: InputHasilFormErrors = {}

        if (!values.kandidatId) nextErrors.kandidatId = "Pilih kandidat."
        if (!values.pemahamanKonsep) nextErrors.pemahamanKonsep = "Wajib dipilih."
        if (!values.ketepatanPenerapan)
            nextErrors.ketepatanPenerapan = "Wajib dipilih."
        if (!values.komunikasiAlasan) nextErrors.komunikasiAlasan = "Wajib dipilih."
        if (!values.refleksiTindakLanjut)
            nextErrors.refleksiTindakLanjut = "Wajib dipilih."
        if (!values.catatan.trim())
            nextErrors.catatan = "Catatan hasil wawancara wajib diisi."
        if (!values.keputusan) nextErrors.keputusan = "Pilih keputusan."

        setErrors(nextErrors)
        return Object.keys(nextErrors).length === 0
    }

    const handleSubmit = async () => {
        if (!validate() || !values.keputusan) return

        const payload: SubmitPenilaianPayload = {
            kandidatId: values.kandidatId,
            pemahamanKonsep: Number(values.pemahamanKonsep),
            ketepatanPenerapan: Number(values.ketepatanPenerapan),
            komunikasiAlasan: Number(values.komunikasiAlasan),
            refleksiTindakLanjut: Number(values.refleksiTindakLanjut),
            catatan: values.catatan.trim(),
            keputusan: values.keputusan,
        }

        try {
            setIsSubmitting(true)
            await onSubmitPenilaian?.(payload)

            setCandidates((prev) => {
                const remaining = prev.filter((item) => item.id !== payload.kandidatId)
                if (remaining.length === 0) setViewState("empty")
                return remaining
            })
            setValues(DEFAULT_FORM_VALUES)
            toast.success("Hasil telah berhasil dikirim.", { timeout: 4000 })
        } catch {
            toast.danger("Penilaian gagal dikirim.", { timeout: 4000 })
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        viewState,
        setViewState: handleViewStateChange,
        candidates,
        values,
        errors,
        isSubmitting,
        handleFieldChange,
        handleSubmit,
    }
}