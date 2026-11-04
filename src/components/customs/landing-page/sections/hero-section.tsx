import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';

export default function HeroSection() {
    return (
        <section className="py-16 px-16">
            <div className="flex flex-col items-center gap-2 md:flex-row ">
                <div className="max-w-xl mx-auto px-4 flex flex-col items-center gap-4 md:items-start md:gap-6">
                    <h1 className="text-5xl font-bold text-black">Belajar soft skill, diuji, lalu diakui</h1>
                    <p className="text-gray-600 mt-4">
                        Aixel membantu anggota tim belajar mandiri, diwawancara rekan yang sudah mahir, lalu menjadi penguji bagi anggota lain.
                    </p>
                    <div className="flex flex-row gap-4">
                        <Button variant="coral" className="">
                            Mulai tes awal
                        </Button>
                        <Button variant="white" className="">
                            Pelajari lebih lanjut
                        </Button>
                    </div>
                </div>
                <div className="">
                    <Image
                        src="/assets/images/landing-page/hero-image.png"
                        alt="Hero Image"
                        width={1000}
                        height={800}
                    />
                </div>
            </div>
        </section>
    )
}
