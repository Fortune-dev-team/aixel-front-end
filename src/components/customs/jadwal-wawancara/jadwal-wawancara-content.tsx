"use client"

import React from 'react'
import JadwalCard from './cards/jadwal-card';
import { JadwalWawancaraItem, KonfirmasiJadwalPayload } from './interfaces';
import { JadwalToast } from './toast/toast';
import { toast } from "@heroui/react"

const MOCK_JADWAL: JadwalWawancaraItem[] = [
    {
        id: "jw-01",
        nama: "Dimas Prakoso",
        status: "Dijadwalkan",
    },
    {
        id: "jw-02",
        nama: "Nadia Putri",
        status: "Diterima",
    },
]

export default function JadwalWawancaraContent() {
    const handleConfirm = async (payload: KonfirmasiJadwalPayload) => {
        // Ready for your API call:
        // await fetch(`/api/jadwal-wawancara/${payload.id}`, {
        //   method: "PATCH",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ tanggal: payload.tanggal, waktu: payload.waktu }),
        // })
        toast.success("Jadwal berhasil dikonfirmasi.", { timeout: 4000 })
        console.log("Payload siap dikirim ke backend:", payload)
    }
    return (
        <div className="flex w-full flex-col gap-4 rounded-xl">
            <div>
                <h1 className="font-sans text-lg font-bold text-[#0A0A0A]">
                    Jadwal Wawancara
                </h1>
                <p className="font-sans text-xs text-[#525252]">
                    Pilih salah satu waktu dari anggota, atau usulkan waktu lain.
                </p>
            </div>
            <div className="flex flex-col gap-3">
                {MOCK_JADWAL.map((item) => (
                    <JadwalCard
                        key={item.id}
                        data={item}
                        onConfirm={handleConfirm}
                    />
                ))}
            </div>
            <JadwalToast/>
        </div>
    )
}
