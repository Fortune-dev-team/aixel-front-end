import { Card } from '@/components/ui/card';
import { StepBadge } from '@/components/ui/stepbadge';
import { StepIndicator } from '@/components/ui/StepIndicator';
import React from 'react'

const steps = [
    {
        step: "01",
        title: "Belajar mandiri, dibantu AI",
    },
    {
        step: "02",
        title: "Diwawancara rekan yang mahir",
    },
    {
        step: "03",
        title: "Lulus dan dapat sertifikat",
    },
    {
        step: "04",
        title: "Ganti menguji anggota lain",
    }
];

export default function FlowSection() {
    return (
        <section className="py-16 px-16">
            <div className=" flex flex-col gap-6">
                <h1 className="text-2xl font-bold text-black">Siklus belajar</h1>
                <div className="grid grid-cols-4 gap-4">
                    {steps.map((item) => (
                        <Card
                            key={item.step}
                            step={item.step}
                            useBadge
                            title={item.title}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
