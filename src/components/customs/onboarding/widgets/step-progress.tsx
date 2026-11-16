interface StepProgressProps {
    currentStep: number;
    totalSteps: number;
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
    return (
        <div className="mb-7 w-full max-w-[460px]">
            <div className="mb-2 flex justify-end">
                <span className="font-mono text-xs font-semibold text-neutral-600">
                    {currentStep} dari {totalSteps}
                </span>
            </div>
            <div className="grid grid-cols-4 gap-2.5">
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                    <div
                        key={step}
                        className={`h-1.5 rounded-full transition-colors ${step <= currentStep ? "bg-black" : "bg-neutral-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}