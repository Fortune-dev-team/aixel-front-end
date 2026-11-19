"use client"

import React from "react"
import {
    getLocalTimeZone,
    parseDate,
    parseTime,
    Time,
    today,
    type DateValue,
} from "@internationalized/date"
import type { TimeValue } from "@heroui/react"
import { CheckCircle2 } from "lucide-react"
import { KonfirmasiJadwalButton } from "../buttons/button"
import type {
    JadwalStatus,
    JadwalWawancaraItem,
    KonfirmasiJadwalPayload,
} from "../interfaces"
import { DatePicker } from "../picker/date-picker"
import { TimePicker } from "../picker/time-picker"
import { JadwalStatusBadge } from "./state-card"

interface JadwalCardProps {
    data: JadwalWawancaraItem
    isSubmitting?: boolean
    minHour?: number
    maxHour?: number
    onConfirm?: (payload: KonfirmasiJadwalPayload) => Promise<void> | void
}

function formatTanggalIndonesia(date: DateValue): string {
    return date.toDate(getLocalTimeZone()).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    })
}

function buildConfirmedMessage(date: DateValue, time: TimeValue): string {
    const formattedDate = formatTanggalIndonesia(date)
    const formattedTime = time.toString().slice(0, 5)
    return `Waktu wawancara dikonfirmasi pada ${formattedDate}, pukul ${formattedTime} WIB.`
}

export default function JadwalCard({
    data,
    isSubmitting = false,
    minHour = 8,
    maxHour = 17,
    onConfirm,
}: JadwalCardProps) {
    const parsedInitialDate = React.useMemo(
        () => (data.tanggal ? parseDate(data.tanggal) : null),
        [data.tanggal]
    )

    const parsedInitialTime = React.useMemo(
        () => (data.waktu ? parseTime(data.waktu) : new Time(9, 0)),
        [data.waktu]
    )

    const [status, setStatus] = React.useState<JadwalStatus>(data.status)
    const [date, setDate] = React.useState<DateValue | null>(parsedInitialDate)
    const [minDate, setMinDate] = React.useState<DateValue | undefined>(undefined)
    const [time, setTime] = React.useState<TimeValue | null>(parsedInitialTime)
    const [isSaving, setIsSaving] = React.useState(false)
    const [confirmedLabel, setConfirmedLabel] = React.useState<string | null>(
        () =>
            data.status === "Diterima" && parsedInitialDate && parsedInitialTime
                ? buildConfirmedMessage(parsedInitialDate, parsedInitialTime)
                : null
    )

    // Sync if parent refreshes data from API
    React.useEffect(() => {
        setStatus(data.status)
        if (parsedInitialDate) setDate(parsedInitialDate)
        if (parsedInitialTime) setTime(parsedInitialTime)
    }, [data.status, parsedInitialDate, parsedInitialTime])

    // Defer today() to client mount to prevent Next.js Date.now() prerender errors
    React.useEffect(() => {
        const current = today(getLocalTimeZone())
        setMinDate(current)
        if (!parsedInitialDate) {
            setDate(current)
        }
    }, [parsedInitialDate])

    const handleKonfirmasiWaktu = async () => {
        if (!date || !time) return

        const payload: KonfirmasiJadwalPayload = {
            id: data.id,
            tanggal: date.toString(),            // "2026-11-19"
            waktu: time.toString().slice(0, 5),  // "09:00"
        }

        try {
            setIsSaving(true)
            await onConfirm?.(payload)

            setStatus("Diterima")
            setConfirmedLabel(buildConfirmedMessage(date, time))
        } finally {
            setIsSaving(false)
        }
    }

    const busy = isSubmitting || isSaving

    return (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-[#0A0A0A]/40 bg-[#FDFCFA]/60 px-4 py-3 shadow-none">
            <div className="flex w-full flex-row items-center justify-between">
                <h1 className="font-sans text-sm font-bold text-[#0A0A0A]">
                    {data.nama}
                </h1>
                <JadwalStatusBadge status={status} />
            </div>

            <div className="flex w-full flex-wrap items-center justify-between gap-3">
                <div className="flex flex-row items-center gap-3">
                    <DatePicker
                        value={date}
                        onChange={setDate}
                        minValue={minDate}
                        className="w-48"
                    />
                    <TimePicker
                        value={time}
                        onChange={setTime}
                        minValue={new Time(minHour, 0)}
                        maxValue={new Time(maxHour, 0)}
                    />
                </div>

                <div>
                    <KonfirmasiJadwalButton
                        isDisabled={!date || !time || busy}
                        onPress={handleKonfirmasiWaktu}
                    />
                </div>
            </div>

            {confirmedLabel && (
                <div className="flex items-center gap-2 rounded-lg border border-[#16A34A]/40 bg-[#DCFCE7]/70 px-3 py-2 text-[#166534]">
                    <CheckCircle2 className="size-4 shrink-0" />
                    <p className="font-sans text-xs font-medium">{confirmedLabel}</p>
                </div>
            )}
        </div>
    )
}