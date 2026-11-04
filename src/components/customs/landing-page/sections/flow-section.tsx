import { Card } from '@/components/ui/card';
import { StepBadge } from '@/components/ui/stepbadge';
import { StepIndicator } from '@/components/ui/StepIndicator';
import React from 'react'

const steps = [
    {
        step: "01",
        title: "Parse Script",
        description: "Extract PKGBUILD instructions and environment variable references."
    },
    {
        step: "02",
        title: "Local LLM Inspection",
        description: "Pass extracted code through local model evaluation for suspicious commands."
    },
    {
        step: "03",
        title: "Actionable Result",
        description: "Review detected indicators before approving build execution."
    },
    {
        step: "04",
        title: "Actionable Result",
        description: "Review detected indicators before approving build execution."
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
                            step={item.step}
                            useBadge
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
