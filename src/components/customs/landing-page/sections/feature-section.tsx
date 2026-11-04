import { Card } from '@/components/ui/card';
import React from 'react'

const steps = [
    {
        step: "01",
        title: "Tes Awal dan Goal dari tim",
        description: "Penilaian diri dan kasus singkat membantu memilih goal. Semua tetap mulai dari Level 1."
    },
    {
        step: "02",
        title: "Belajar mandiri dibantu AI",
        description: "Level 1 dan 2 memakai bahan dari basis pengetahuan yang disiapkan admin, bukan dari internet."
    },
    {
        step: "03",
        title: "Sertifikat dan penyegaran",
        description: "Level 3 diuji mentor lewat wawancara offline dengan rubrik yang sama untuk semua."
    },
    {
        step: "04",
        title: "Sertifikat dan penyegaran",
        description: "Atribut berlaku 12 sampai 18 bulan. Perpanjang dengan bukti kontribusi proyek nyata."
    }
];

export default function FeatureSection() {
    return (
        <section className="py-16 px-16">
            <div className=" flex flex-col gap-6">
                <h1 className="text-2xl font-bold text-black">Yang bisa dilakukan Aixel</h1>
                <div className="grid grid-cols-4 gap-4">
                    {steps.map((item) => (
                        <Card
                            key={item.step}
                            step={item.step}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
