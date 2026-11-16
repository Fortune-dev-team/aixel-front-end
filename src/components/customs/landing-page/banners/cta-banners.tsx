import { Button } from '@/components/ui/button';
import React from 'react'

export default function CtaBanner() {
    return (
        <div className="bg-black/95 rounded-xl shadow-[4px_4px_0px_0px_#ff3b00] text-white p-8 flex flex-row justify-between items-center">
            <div className="">
                <h1 className="text-2xl font-bold">Mulai dari Tes Awal Anda</h1>
                <p className="mt-2 text-sm">Satu akun untuk anggota dan mentor.</p>
            </div>
            <Button className="">
                Daftar sekarang
            </Button>
        </div>
    )
}
